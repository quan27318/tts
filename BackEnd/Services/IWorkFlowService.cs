using BackEnd.Models;

namespace BackEnd.Services{
    public interface IWorkFlowService{
        public List<WorkFlow> GetAllWorkflow();
        public WorkFlow GetWorkflow(int id);
        public void AddWorkflow(WorkFlow workflow);
        public void RemoveWorkflow(int id);
        public void UpdateWorkflow(WorkFlow workflow);

         public List<WorkFlow> GetAllWorkflowStoredProcedures();

         public List<WorkFlow> PaginationWorkflow(int pageNumber, int pageSize);
          public  int CountId();
    }
    
}