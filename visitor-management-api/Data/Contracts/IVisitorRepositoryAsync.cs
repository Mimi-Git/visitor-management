using System.Collections.Generic;
using System.Threading.Tasks;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public interface IVisitorRepositoryAsync : IRepositoryAsync<Visitor>
    {
        Task<Visitor> GetVisitorByEmailAsync(string email);
    }
}