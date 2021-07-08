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
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepositoryAsync _repository;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeRepositoryAsync repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeReadDto>>> GetAllEmployees()
        {
            var employeeItems = await _repository.GetAllAsync();

            if (employeeItems != null)
            {
                return Ok(_mapper.Map<IEnumerable<EmployeeReadDto>>(employeeItems));
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("{id}", Name = "GetEmployeeById")]
        public async Task<ActionResult<EmployeeReadDto>> GetEmployeeById(int id)
        {
            var employeeItem = await _repository.GetByIdAsync(id);

            if (employeeItem != null)
            {
                return Ok(_mapper.Map<EmployeeReadDto>(employeeItem));
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeReadDto>> CreateEmployee(EmployeeCreateDto employeeCreateDto)
        {
            var employeeModel = _mapper.Map<Employee>(employeeCreateDto);
            await _repository.CreateAsync(employeeModel);

            var employeeReadDto = _mapper.Map<EmployeeReadDto>(employeeModel);

            return CreatedAtRoute(nameof(GetEmployeeById), new { Id = employeeReadDto.Id }, employeeReadDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEmployee(int id, EmployeeUpdateDto employeeUpdateDto)
        {
            var employeeModelFromRepo = await _repository.GetByIdAsync(id);
            if (employeeModelFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(employeeUpdateDto, employeeModelFromRepo);

            await _repository.UpdateAsync(employeeModelFromRepo);

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> PartialEmployeeUpdate(int id, JsonPatchDocument<EmployeeUpdateDto> patchDocument)
        {
            var employeeModelFromRepo = await _repository.GetByIdAsync(id);
            if (employeeModelFromRepo == null)
            {
                return NotFound();
            }

            var employeeToPatch = _mapper.Map<EmployeeUpdateDto>(employeeModelFromRepo);

            patchDocument.ApplyTo(employeeToPatch, ModelState);

            if (!TryValidateModel(employeeToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(employeeToPatch, employeeModelFromRepo);

            await _repository.UpdateAsync(employeeModelFromRepo);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            var employeeModelFromRepo = await _repository.GetByIdAsync(id);
            if (employeeModelFromRepo == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync(employeeModelFromRepo);

            return NoContent();
        }
    }
}