using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using visitor_management_api.Data;
using visitor_management_api.Dtos;
using visitor_management_api.Models;

namespace visitor_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitorsController : ControllerBase
    {
        private readonly IVisitorRepositoryAsync _repository;
        private readonly IMapper _mapper;

        public VisitorsController(IVisitorRepositoryAsync repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VisitorReadDto>>> GetAllVisitors()
        {
            var visitorItems = await _repository.GetAllAsync();

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
        public async Task<ActionResult<VisitorReadDto>> GetVisitorById(int id)
        {
            var visitorItem = await _repository.GetByIdAsync(id);

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
        public async Task<ActionResult<VisitorReadDtoWithVisits>> GetVisitorByEmail(string email)
        {
            var visitorItem = await _repository.GetVisitorByEmailAsync(email);

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
        public async Task<ActionResult<VisitorReadDto>> CreateVisitor(VisitorCreateDto visitorCreateDto)
        {
            var visitorModel = _mapper.Map<Visitor>(visitorCreateDto);
            await _repository.CreateAsync(visitorModel);

            var visitorReadDto = _mapper.Map<VisitorReadDto>(visitorModel);

            return CreatedAtRoute(nameof(GetVisitorById), new { Id = visitorReadDto.Id }, visitorReadDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateVisitor(int id, VisitorUpdateDto visitorUpdateDto)
        {
            var visitorModelFromRepo = await _repository.GetByIdAsync(id);
            if (visitorModelFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(visitorUpdateDto, visitorModelFromRepo);

            await _repository.UpdateAsync(visitorModelFromRepo);

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> PartialVisitorUpdate(int id, JsonPatchDocument<VisitorUpdateDto> patchDocument)
        {
            var visitorModelFromRepo = await _repository.GetByIdAsync(id);
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

            await _repository.UpdateAsync(visitorModelFromRepo);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVisitor(int id)
        {
            var visitorModelFromRepo = await _repository.GetByIdAsync(id);
            if (visitorModelFromRepo == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync(visitorModelFromRepo);

            return NoContent();
        }
    }
}