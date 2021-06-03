using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
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

        [HttpGet("getbyemail/{email}", Name = "GetVisitorByEmail")]
        public ActionResult<VisitorReadDtoWithVisits> GetVisitorByEmail(string email)
        {
            var visitorItem = _repository.GetVisitorByEmail(email);

            if (visitorItem != null)
            {
                return Ok(_mapper.Map<VisitorReadDtoWithVisits>(visitorItem));
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

        [HttpPut("{id}")]
        public ActionResult UpdateVisitor(int id, VisitorUpdateDto visitorUpdateDto)
        {
            var visitorModelFromRepo = _repository.GetVisitorById(id);
            if (visitorModelFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(visitorUpdateDto, visitorModelFromRepo);

            _repository.UpdateVisitor(visitorModelFromRepo);

            _repository.SaveChanges();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public ActionResult PartialVisitorUpdate(int id, JsonPatchDocument<VisitorUpdateDto> patchDocument)
        {
            var visitorModelFromRepo = _repository.GetVisitorById(id);
            if (visitorModelFromRepo == null)
            {
                return NotFound();
            }

            var visitorToPatch = _mapper.Map<VisitorUpdateDto>(visitorModelFromRepo);

            patchDocument.ApplyTo(visitorToPatch, ModelState);

            if (!TryValidateModel(visitorToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(visitorToPatch, visitorModelFromRepo);

            _repository.UpdateVisitor(visitorModelFromRepo);

            _repository.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteVisitor(int id)
        {
            var visitorModelFromRepo = _repository.GetVisitorById(id);
            if (visitorModelFromRepo == null)
            {
                return NotFound();
            }

            _repository.DeleteVisitor(visitorModelFromRepo);
            _repository.SaveChanges();

            return NoContent();
        }
    }
}