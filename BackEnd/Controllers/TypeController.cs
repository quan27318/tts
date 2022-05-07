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
    public class TypeController : ControllerBase
    {
        private readonly ITypeService _typeService;
        public TypeController(ITypeService typeService)
        {
            _typeService = typeService;
        }
        [EnableCors("Policy")]
        [HttpGet]
        public List<TypeOfWork> GetAllTypes(){
            return  _typeService.GetAllTypes();
        }
        [EnableCors("Policy")]
        [HttpPost]
        public HttpStatusCode CreateType(TypeOfWork type){
            _typeService.CreateType(type);
            return HttpStatusCode.OK;
        }
        [EnableCors("Policy")]
        [HttpPut]
        public HttpStatusCode UpdateType(TypeOfWork type){
            _typeService.UpdateType(type);
            return HttpStatusCode.OK;
        }
        [EnableCors("Policy")]
        [HttpDelete("{id}")]
        public HttpStatusCode RemoveType(int id){
            _typeService.RemoveType(id);
            return HttpStatusCode.OK;
        }
    }
}