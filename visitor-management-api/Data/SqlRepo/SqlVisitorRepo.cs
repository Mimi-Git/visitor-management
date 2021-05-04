using System;
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

        public void CreateVisitor(Visitor visitor)
        {
            if (visitor == null)
            {
                throw new ArgumentNullException(nameof(visitor));
            }

            _context.Visitors.Add(visitor);
        }

        public void RestoreVisitors()
        {
            _context.Visitors.RemoveRange(_context.Visitors);
        }

        public void DeleteVisitor(Visitor visitor)
        {
            if (visitor == null)
            {
                throw new ArgumentNullException(nameof(visitor));
            }

            _context.Visitors.Remove(visitor);
        }

        public IEnumerable<Visitor> GetAllVisitors()
        {
            //var visitors = _context.Visitors.Include(v => v.Visits)
            var visitors = _context.Visitors.ToList();

            return visitors;
        }

        public Visitor GetVisitorById(int id)
        {
            //return _context.Visitors.Include(v => v.Visits)
            return _context.Visitors.FirstOrDefault(v => v.Id == id);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void UpdateVisitor(Visitor visitor)
        {
        }
    }
}