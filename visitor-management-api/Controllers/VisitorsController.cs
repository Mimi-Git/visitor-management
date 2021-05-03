using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using visitor_management_api.Data;
using visitor_management_api.Dtos;
using visitor_management_api.Models;

namespace visitor_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitorsController : ControllerBase
    {
        private readonly IVisitorRepo _repository;
        private readonly IMapper _mapper;

        public VisitorsController(IVisitorRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // Get api/visitors
        [HttpGet]
        public ActionResult<IEnumerable<VisitorReadDto>> GetAllVisitors()
        {
            var visitorItems = _repository.GetAllVisitors();

            if (visitorItems != null)
            {
                return Ok(_mapper.Map<IEnumerable<VisitorReadDto>>(visitorItems));
            }
            else
            {
                return NotFound();
            }
        }

        // Get api/visitors/{id}
        [HttpGet("{id}")]
        public ActionResult<VisitorReadDto> GetVisitorById(int id)
        {
            var visitorItem = _repository.GetVisitorById(id);

            if (visitorItem != null)
            {
                return Ok(_mapper.Map<VisitorReadDto>(visitorItem));
            }
            else
            {
                return NotFound();
            }
        }
    }
}