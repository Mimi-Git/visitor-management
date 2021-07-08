using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace visitor_management_api.Data
{
    public class EfBaseRepositoryAsync<T> : IRepositoryAsync<T> where T : class
    {
        protected VisitorAppContext _context;

        public EfBaseRepositoryAsync(VisitorAppContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public Task DeleteAsync(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            _context.Set<T>().Remove(entity);
            return _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
            => await _context.Set<T>().ToListAsync();

        public async Task<T> GetByIdAsync(int id)
            => await _context.Set<T>().FindAsync(id);

        public Task RestoreAsync()
        {
            _context.Set<T>().RemoveRange(_context.Set<T>());
            return _context.SaveChangesAsync();
        }

        public Task UpdateAsync(T entity)
            => _context.SaveChangesAsync();
    }
}