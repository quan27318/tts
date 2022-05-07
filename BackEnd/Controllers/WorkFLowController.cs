using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BackEnd.Models;
using BackEnd.Services;
using System.Net;
using Microsoft.AspNetCore.Cors;

namespace BackEnd.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class WorkFLowController : ControllerBase
    {
        private readonly IWorkFlowService _workflowService;
        public WorkFLowController(IWorkFlowService workflowService)
        {
            _workflowService = workflowService;
        }
   [EnableCors("Policy")]
    [HttpGet("/api/workflow")]
    public List<WorkFlow> GetAllWorkflow(){
        return _workflowService.GetAllWorkflow();
      }
      [EnableCors("Policy")]
    [HttpGet("/api/workflow/{id}")]
    public WorkFlow GetWorkflow(int id){
        return _workflowService.GetWorkflow(id);
      }
    [EnableCors("Policy")]
    [HttpPost("/api/workflow")]
    public HttpStatusCode AddWorkflow(WorkFlow workflow){
        _workflowService.AddWorkflow(workflow);
        return HttpStatusCode.OK;
    }
    [EnableCors("Policy")]
    [HttpDelete("/api/workflow/{id}")]
    public HttpStatusCode RemoveWorkflow(int id){
        _workflowService.RemoveWorkflow(id);
        return HttpStatusCode.OK;
    }
    [EnableCors("Policy")]
    [HttpPost("/api/workflow/{id}")]
    public HttpStatusCode UpdateWorkflow(WorkFlow workflow){
        _workflowService.UpdateWorkflow(workflow);
        return HttpStatusCode.OK;
    }
    }
}