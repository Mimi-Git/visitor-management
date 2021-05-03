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
    public class VisitsController : ControllerBase
    {
        private readonly IVisitRepo _repository;
        private readonly IMapper _mapper;

        public VisitsController(IVisitRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<VisitReadDto>> Get()
        {
            var visitItems = _repository.GetAllVisits();

            if (visitItems != null)
            {
                return Ok(_mapper.Map<IEnumerable<VisitReadDto>>(visitItems));
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<VisitReadDto> Get(int id)
        {
            var visitItem = _repository.GetVisitById(id);

            if (visitItem != null)
            {
                return Ok(_mapper.Map<VisitReadDto>(visitItem));
            }
            else
            {
                return NotFound();
            }
        }
    }
}