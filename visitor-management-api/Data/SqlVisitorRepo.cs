using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public class SqlVisitorRepo : IVisitorRepo
    {
        private readonly VisitorAppContext _context;

        public SqlVisitorRepo(VisitorAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Visitor> GetAllVisitors()
        {
            var visitors = _context.Visitors.Include(v => v.Visits)
                                            .ToList();

            return visitors;
        }

        public Visitor GetVisitorById(int id)
        {
            return _context.Visitors.Include(v => v.Visits)
                                    .FirstOrDefault(v => v.Id == id);
        }
    }
}