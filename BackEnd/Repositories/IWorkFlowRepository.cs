using BackEnd.Models;

namespace BackEnd.Repositories{
    public interface IWorkFlowRepository{
        public List<WorkFlow> GetAllWorkflow();
       public WorkFlow GetWorkflow(int id);
        public void AddWorkflow(WorkFlow workflow);
        public void RemoveWorkflow(int id);
        public void UpdateWorkflow(WorkFlow workflow);

        public List<WorkFlow> GetAllWorkflowStoredProcedures();
        public List<WorkFlow> PaginationWorkflow(int pageNumber, int pageSize);
        public int CountId();
    }
}