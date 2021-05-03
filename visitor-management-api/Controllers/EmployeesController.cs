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
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepo _repository;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<EmployeeReadDto>> GetAllEmployees()
        {
            var employeeItems = _repository.GetAllEmployees();

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
        public ActionResult<EmployeeReadDto> GetEmployeeById(int id)
        {
            var employeeItem = _repository.GetEmployeeById(id);

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
        public ActionResult<EmployeeReadDto> CreateEmployee(EmployeeCreateDto employeeCreateDto)
        {
            var employeeModel = _mapper.Map<Employee>(employeeCreateDto);
            _repository.CreateEmployee(employeeModel);
            _repository.SaveChanges();

            var employeeReadDto = _mapper.Map<EmployeeReadDto>(employeeModel);

            return CreatedAtRoute(nameof(GetEmployeeById), new { Id = employeeReadDto.Id }, employeeReadDto);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateEmployee(int id, EmployeeUpdateDto employeeUpdateDto)
        {
            var employeeModelFromRepo = _repository.GetEmployeeById(id);
            if (employeeModelFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(employeeUpdateDto, employeeModelFromRepo);

            _repository.UpdateEmployee(employeeModelFromRepo);

            _repository.SaveChanges();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public ActionResult PartialEmployeeUpdate(int id, JsonPatchDocument<EmployeeUpdateDto> patchDocument)
        {
            var employeeModelFromRepo = _repository.GetEmployeeById(id);
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

            _repository.UpdateEmployee(employeeModelFromRepo);

            _repository.SaveChanges();

            return NoContent();
        }
    }
}