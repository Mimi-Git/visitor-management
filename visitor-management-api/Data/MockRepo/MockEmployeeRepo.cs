using System.Collections.Generic;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public class MockEmployeeRepo : IEmployeeRepo
    {
        public void CreateEmployee(Employee employee)
        {
            throw new System.NotImplementedException();
        }

        public void RestoreEmployees()
        {
            throw new System.NotImplementedException();
        }

        public void DeleteEmployee(Employee employee)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            var employees = new List<Employee>()
            {
                new Employee()
                {
                    Id = 3,
                    FirstName = "Michelle",
                    LastName = "Vaillant",
                    CompanyName = "Opera",
                    Email = "michelle.vaillant@gmail.com",
                    PhoneNumber = "0664537726",
                    Department = "RH"
                },
                new Employee()
                {
                    Id = 1,
                    FirstName = "Jean",
                    LastName = "Claude",
                    CompanyName = "Microsoft",
                    Email = "JC@icloud.com",
                    PhoneNumber = "0609877726",
                    Department = "Finance"
                }
            };
            return employees;
        }

        public Employee GetEmployeeById(int id)
        {
            var employee = new Employee()
            {
                Id = 1,
                FirstName = "Jean",
                LastName = "Claude",
                CompanyName = "Microsoft",
                Email = "JC@icloud.com",
                PhoneNumber = "0609877726",
                Department = "Finance"
            };

            return employee;
        }

        public bool SaveChanges()
        {
            throw new System.NotImplementedException();
        }

        public void UpdateEmployee(Employee employee)
        {
            throw new System.NotImplementedException();
        }
    }
}