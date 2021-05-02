using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using visitor_management_api.Data;
using visitor_management_api.Models;

namespace visitor_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepo _repository;

        public EmployeesController(IEmployeeRepo repository)
        {
            _repository = repository;
        }

        // Get api/employees
        [HttpGet]
        public ActionResult<IEnumerable<Employee>> GetAllEmployees()
        {
            var employeeItems = _repository.GetAllEmployees();

            return Ok(employeeItems);
        }

        // Get api/employees/{id}
        [HttpGet("{id}")]
        public ActionResult<Employee> GetEmployeeById(int id)
        {
            var employeeItem = _repository.GetEmployeeById(id);

            return Ok(employeeItem);
        }
    }
}