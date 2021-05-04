using System.Collections.Generic;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public interface IVisitorRepo
    {
        bool SaveChanges();

        IEnumerable<Visitor> GetAllVisitors();

        Visitor GetVisitorById(int id);

        void CreateVisitor(Visitor visitor);

        void UpdateVisitor(Visitor visitor);

        void DeleteVisitor(Visitor visitor);

        void RestoreVisitors();
    }
}