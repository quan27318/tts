using BackEnd.Models;
using BackEnd.Repositories;

namespace BackEnd.Services{
    public class WorkFlowService : IWorkFlowService
    {
      
        private readonly IWorkFlowRepository _workflowRepository;
        public WorkFlowService( IWorkFlowRepository workflowRepository)
        {
            _workflowRepository = workflowRepository;
        }

        public void AddWorkflow(WorkFlow workflow)
        {
            _workflowRepository.AddWorkflow(workflow);
        }

        public int  CountId()
        {
           return _workflowRepository.CountId();
        }

        public List<WorkFlow> GetAllWorkflow()
        {
            return _workflowRepository.GetAllWorkflow();
        }

        public List<WorkFlow> GetAllWorkflowStoredProcedures()
        {
            return _workflowRepository.GetAllWorkflowStoredProcedures();
        }

        public WorkFlow GetWorkflow(int id)
        {
            return _workflowRepository.GetWorkflow(id);
        }

        public List<WorkFlow> PaginationWorkflow(int pageNumber, int pageSize)
        {
            return _workflowRepository.PaginationWorkflow(pageNumber,pageSize);
        }

        public void RemoveWorkflow(int id)
        {
            _workflowRepository.RemoveWorkflow(id);
        }

        public void UpdateWorkflow(WorkFlow workflow)
        {
            _workflowRepository.UpdateWorkflow(workflow);
        }
    }
}