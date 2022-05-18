using BackEnd.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories{
    public class WorkFlowRepository : IWorkFlowRepository
    {
        private readonly SystemDbContext _dbContext;
        public WorkFlowRepository(SystemDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddWorkflow(WorkFlow workflow)
        {
            
            if(!CheckDate(workflow.DayStart)) throw new ApplicationException("Day start cannot be started in the past ");
            if(!CheckDate(workflow.DayEnd)) throw new ApplicationException("Day end cannot be started in the past ");
            _dbContext.WorkFlows.Add(workflow);
            _dbContext.SaveChanges();
        }

        public List<WorkFlow> GetAllWorkflow()
        {
            return _dbContext.WorkFlows.ToList();       
        }

        public WorkFlow GetWorkflow(int id)
        {
            var work = _dbContext.WorkFlows.Find(id);
            if (work == null) throw new KeyNotFoundException("Work not found");
            return work;
        }

        public void RemoveWorkflow(int id)
        {
            var works = _dbContext.WorkFlows.Where(x=>x.Id == id).FirstOrDefault();
            if(works == null) throw new KeyNotFoundException("Workflow not found");
            if (works.IsActive == false) throw new KeyNotFoundException ("not active");
            _dbContext.WorkFlows.Remove(works);
            _dbContext.SaveChanges();
        }

        public void UpdateWorkflow(WorkFlow workflow)
        {
            
            var works = _dbContext.WorkFlows.Where(x =>x.Id == workflow.Id).FirstOrDefault();
            if(works == null) throw new KeyNotFoundException ("id not found"); 

            works.Description = workflow.Description;
            works.DayStart = workflow.DayStart;
            works.DayEnd = workflow.DayEnd;
            works.Explain = workflow.Explain;
            works.Status = workflow.Status;
            works.TypeId = workflow.TypeId;
            works.IsActive = workflow.IsActive;
            _dbContext.SaveChanges();

        }
        public bool CheckDate ( DateTime date){
            if(DateTime.Compare(DateTime.Now, date)>1){
                return false;
            }
            return true;
        }
         public List<WorkFlow> GetAllWorkflowStoredProcedures()
        {
         
            string sql = "EXEC WORKFLOW";
            return   _dbContext.WorkFlows.FromSqlRaw(sql).ToList();
               
        }

        public List<WorkFlow> PaginationWorkflow(int pageNumber, int pageSize)
        {
           string sql  = "EXEC getRowPerPage" + " " + pageNumber + "," + pageSize;
            return _dbContext.WorkFlows.FromSqlRaw(sql).ToList();
        }

        public int CountId()
        {
            string sql = "execute getCountId @references output ";
            // int m  = int.Parse( _dbContext.WorkFlows.FromSqlRaw(sql).ToList());
            var param = new SqlParameter[] {
                     
                        new SqlParameter() {
                            ParameterName = "@references",
                             SqlDbType =  System.Data.SqlDbType.Int,
                            Direction = System.Data.ParameterDirection.Output,
                        }};
            // var listCount = _dbContext.WorkFlows.FromSqlRaw(sql,param[0].Value);
            var result = _dbContext.Database.ExecuteSqlRaw(sql,param);
             return  Convert.ToInt32(param[0].Value) ;
            // return  _dbContext.WorkFlows.FromSqlRaw(sql).ToList()[0];
        }
    }
}