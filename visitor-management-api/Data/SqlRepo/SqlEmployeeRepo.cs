using System;
using System.Collections.Generic;
using System.Linq;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public class SqlEmployeeRepo : IEmployeeRepo
    {
        private readonly VisitorAppContext _context;

        public SqlEmployeeRepo(VisitorAppContext context)
        {
            _context = context;
        }

        public void CreateEmployee(Employee employee)
        {
            if (employee == null)
            {
                throw new ArgumentNullException(nameof(employee));
            }

            _context.Employees.Add(employee);
        }

        public void RestoreEmployees()
        {
            _context.Employees.RemoveRange(_context.Employees);

            _context.Employees.AddRange(GetRandomEmployees(20));
        }

        private IEnumerable<Employee> GetRandomEmployees(int quantity)
        {
            string[] randomFirtNames = { "Pierre", "David", "Julien", "Gaspard", "Michel", "Marion", "Emilie", "Juliette", "Chloé", "Claire" };
            string[] randomLastNames = { "Barteaux", "Green", "Wilson", "Watson", "Robinson", "Martin", "Duval", "Luna", "Maaka", "Devereux" };
            string[] departments = { "Finance", "Réception", "Informatique", "Direction", "QHSE", "Paie", "Services généraux", "Achats", "Comptabilité", "Maintenance" };

            Random rnd = new Random();
            var employees = new List<Employee>();
            var companyName = "Mon Entreprise";

            for (int i = 0; i < quantity; i++)
            {
                int fNIndex = rnd.Next(randomFirtNames.Length);
                int lNIndex = rnd.Next(randomLastNames.Length);
                int dIndex = rnd.Next(departments.Length);

                var firstName = randomFirtNames[fNIndex];
                var lastName = randomLastNames[lNIndex];
                var email = $"{firstName}.{lastName}@{companyName.Replace(" ", String.Empty).ToLower()}.com";
                var department = departments[dIndex];

                var randomEmployee = new Employee()
                {
                    FirstName = firstName,
                    LastName = lastName,
                    CompanyName = companyName,
                    Email = email,
                    Department = department
                };

                employees.Add(randomEmployee);
            }

            return employees;
        }

        public void DeleteEmployee(Employee employee)
        {
            if (employee == null)
            {
                throw new ArgumentNullException(nameof(employee));
            }

            _context.Employees.Remove(employee);
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            return _context.Employees.ToList();
        }

        public Employee GetEmployeeById(int id)
        {
            return _context.Employees.FirstOrDefault(e => e.Id == id);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void UpdateEmployee(Employee employee)
        {
        }
    }
}