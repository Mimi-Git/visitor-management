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

        public IEnumerable<Employee> GetAllEmployees()
        {
            return _context.Employees.ToList();
        }

        public Employee GetEmployeeById(int id)
        {
            return _context.Employees.FirstOrDefault(e => e.Id == id);
        }
    }
}