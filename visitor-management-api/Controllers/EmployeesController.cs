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
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepo _repository;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // Get api/employees
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

        // Get api/employees/{id}
        [HttpGet("{id}")]
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
    }
}