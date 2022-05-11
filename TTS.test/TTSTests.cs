using System.Net;
using BackEnd.Controllers;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using BackEnd.Models;
using System.Collections.Generic;
using System;

namespace TTS.test;

public class TTSTests
{
    private Mock<ILogger<WorkFLowController>> _loggerMock;
    private Mock<IWorkFlowService> _workflowServiceMock;

    static List<WorkFlow> _works = new List<WorkFlow>{
        new WorkFlow {
            Id = 1,
            Description = "None",
            DayStart = new DateTime(2022, 5, 6),
            DayEnd = new DateTime(2022, 5, 6), 
            Explain = "Explain",
            Status = "Running",
            IsActive = false,
            TypeId = 1
        },
        new WorkFlow {
            Id = 2,
            Description = "None",
            DayStart = new DateTime(2022, 5, 6),
            DayEnd = new DateTime(2022, 5, 6), 
            Explain = "Explain",
            Status = "Running",
            IsActive = false,
            TypeId = 2
        }
    };
     [SetUp]
    public void Setup()
    {
        _loggerMock = new Mock<ILogger<WorkFLowController>>();  
        _workflowServiceMock = new Mock<IWorkFlowService>();
        
        //setup 
        _workflowServiceMock.Setup(x=>x.GetAllWorkflow()).Returns(_works);
       



    }

    [Test]
    public void List_ReturnViewResult_WithALlWorkFLow()
    {
        

        //Arrange
        var controller = new WorkFLowController(_loggerMock.Object, _workflowServiceMock.Object);
       
        

        // Act 
        var result = controller.GetAllWorkflow();

        //Assert
        Assert.IsInstanceOf< List<WorkFlow>>(result, "Check HTTP status code");
        Assert.NotNull(result, "Check null status");
        
    
    }
}