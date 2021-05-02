using System.Collections.Generic;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public interface IEmployeeRepo
    {
        IEnumerable<Employee> GetAllEmployees();

        Employee GetEmployeeById(int id);
    }
}