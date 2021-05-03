using System.Collections.Generic;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public interface IEmployeeRepo
    {
        bool SaveChanges();

        IEnumerable<Employee> GetAllEmployees();

        Employee GetEmployeeById(int id);

        void CreateEmployee(Employee employee);

        void UpdateEmployee(Employee employee);
    }
}