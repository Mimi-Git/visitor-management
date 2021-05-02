using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using visitor_management_api.Data;
using visitor_management_api.Models;

namespace visitor_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitorsController : ControllerBase
    {
        private readonly IVisitorRepo _repository;

        public VisitorsController(IVisitorRepo repository)
        {
            _repository = repository;
        }

        // Get api/visitors
        [HttpGet]
        public ActionResult<IEnumerable<Visitor>> GetAllVisitors()
        {
            var visitorItems = _repository.GetAllVisitors();

            return Ok(visitorItems);
        }

        // Get api/visitors/{id}
        [HttpGet("{id}")]
        public ActionResult<Visitor> GetVisitorById(int id)
        {
            var visitorItem = _repository.GetVisitorById(id);

            return Ok(visitorItem);
        }
    }
}