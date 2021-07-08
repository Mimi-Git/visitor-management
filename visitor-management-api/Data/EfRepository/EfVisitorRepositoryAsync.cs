using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public class EfVisitorRepositoryAsync : EfBaseRepositoryAsync<Visitor>, IVisitorRepositoryAsync
    {
        public EfVisitorRepositoryAsync(VisitorAppContext context) : base(context)
        {
        }

        public async Task<Visitor> GetVisitorByEmailAsync(string email)
            => await _context.Visitors.Include(v => v.Visits).FirstOrDefaultAsync(v => v.Email == email);
    }
}