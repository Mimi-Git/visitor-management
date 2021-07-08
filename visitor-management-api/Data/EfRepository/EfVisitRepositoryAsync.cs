using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public class EfVisitRepositoryAsync : EfBaseRepositoryAsync<Visit>, IVisitRepositoryAsync
    {
        public EfVisitRepositoryAsync(VisitorAppContext context) : base(context)
        {
        }
    }
}