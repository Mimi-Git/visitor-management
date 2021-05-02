using System.Collections.Generic;
using System.Linq;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public class SqlVisitRepo : IVisitRepo
    {
        private readonly VisitorAppContext _context;

        public SqlVisitRepo(VisitorAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Visit> GetAllVisits()
        {
            return _context.Visits.ToList();
        }

        public Visit GetVisitById(int id)
        {
            return _context.Visits.FirstOrDefault(v => v.Id == id);
        }
    }
}