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
    public class VisitsController : ControllerBase
    {
        private readonly IVisitRepositoryAsync _repository;
        private readonly IMapper _mapper;

        public VisitsController(IVisitRepositoryAsync repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VisitReadDto>>> GetAllVisits()
        {
            var visitItems = await _repository.GetAllAsync();

            if (visitItems != null)
            {
                return Ok(_mapper.Map<IEnumerable<VisitReadDto>>(visitItems));
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("{id}", Name = "GetVisitById")]
        public async Task<ActionResult<VisitReadDto>> GetVisitById(int id)
        {
            var visitItem = await _repository.GetByIdAsync(id);

            if (visitItem != null)
            {
                return Ok(_mapper.Map<VisitReadDto>(visitItem));
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<VisitReadDto>> CreateVisit(VisitCreateDto visitCreateDto)
        {
            var visitModel = _mapper.Map<Visit>(visitCreateDto);
            await _repository.CreateAsync(visitModel);

            var visitReadDto = _mapper.Map<VisitReadDto>(visitModel);

            return CreatedAtRoute(nameof(GetVisitById), new { Id = visitReadDto.Id }, visitReadDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateVisit(int id, VisitUpdateDto visitUpdateDto)
        {
            var visitModelFromRepo = await _repository.GetByIdAsync(id);
            if (visitModelFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(visitUpdateDto, visitModelFromRepo);

            await _repository.UpdateAsync(visitModelFromRepo);

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> PartialVisitUpdate(int id, JsonPatchDocument<VisitUpdateDto> patchDocument)
        {
            var visitModelFromRepo = await _repository.GetByIdAsync(id);
            if (visitModelFromRepo == null)
            {
                return NotFound();
            }

            var visitToPatch = _mapper.Map<VisitUpdateDto>(visitModelFromRepo);

            patchDocument.ApplyTo(visitToPatch, ModelState);

            if (!TryValidateModel(visitToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(visitToPatch, visitModelFromRepo);

            await _repository.UpdateAsync(visitModelFromRepo);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVisit(int id)
        {
            var visitModelFromRepo = await _repository.GetByIdAsync(id);
            if (visitModelFromRepo == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync(visitModelFromRepo);

            return NoContent();
        }
    }
}