using System.Collections.Generic;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public interface IVisitRepo
    {
        bool SaveChanges();

        IEnumerable<Visit> GetAllVisits();

        Visit GetVisitById(int id);

        void CreateVisit(Visit visit);

        void UpdateVisit(Visit visit);

        void DeleteVisit(Visit visit);

        void RestoreVisits();
    }
}