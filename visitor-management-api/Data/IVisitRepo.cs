using System.Collections.Generic;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public interface IVisitRepo
    {
        IEnumerable<Visit> GetAllVisits();

        Visit GetVisitById(int id);
    }
}