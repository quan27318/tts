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

        public List<WorkFlow> GetAllWorkflow()
        {
            return _workflowRepository.GetAllWorkflow();
        }

        public WorkFlow GetWorkflow(int id)
        {
            return _workflowRepository.GetWorkflow(id);
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