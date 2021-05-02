using System.Collections.Generic;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public interface IVisitorRepo
    {
        IEnumerable<Visitor> GetAllVisitors();

        Visitor GetVisitorById(int id);
    }
}