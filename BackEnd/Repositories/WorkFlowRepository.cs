using BackEnd.Models;

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
             if (works.IsActive == false) throw new KeyNotFoundException ("User is already disabled");
            _dbContext.WorkFlows.Remove(works);
            _dbContext.SaveChanges();
        }

        public void UpdateWorkflow(WorkFlow workflow)
        {
            var works = _dbContext.WorkFlows.Where(x =>x.Id == workflow.Id).FirstOrDefault();
            works.Description = workflow.Description;
            works.DayStart = workflow.DayStart;
            works.DayEnd = workflow.DayEnd;
            works.Explain = workflow.Explain;
            works.Status = workflow.Status;
            works.TypeId = workflow.TypeId;
            works.IsActive = workflow.IsActive;
            _dbContext.SaveChanges();

        }
    }
}