using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using visitor_management_api.Data;
using visitor_management_api.Models;

namespace visitor_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitsController : ControllerBase
    {
        private readonly IVisitRepo _repository;

        public VisitsController(IVisitRepo repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Visit>> Get()
        {
            return Ok(_repository.GetAllVisits());
        }

        [HttpGet("{id}")]
        public ActionResult<Visit> Get(int id)
        {
            return Ok(_repository.GetVisitById(id));
        }
    }
}