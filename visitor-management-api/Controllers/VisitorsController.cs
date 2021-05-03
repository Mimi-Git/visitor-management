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

        [HttpGet("{id}", Name = "GetVisitorById")]
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

        [HttpPost]
        public ActionResult<VisitorReadDto> CreateVisitor(VisitorCreateDto visitorCreateDto)
        {
            var visitorModel = _mapper.Map<Visitor>(visitorCreateDto);
            _repository.CreateVisitor(visitorModel);
            _repository.SaveChanges();

            var visitorReadDto = _mapper.Map<VisitorReadDto>(visitorModel);

            return CreatedAtRoute(nameof(GetVisitorById), new { Id = visitorReadDto.Id }, visitorReadDto);
        }
    }
}