using System;
using System.Collections.Generic;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public class MockVisitorRepo : IVisitorRepo
    {
        public void CreateVisitor(Visitor visitor)
        {
            throw new NotImplementedException();
        }

        public void RestoreVisitors()
        {
            throw new NotImplementedException();
        }

        public void DeleteVisitor(Visitor visitor)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Visitor> GetAllVisitors()
        {
            var visitors = new List<Visitor>()
            {
                new Visitor()
                {
                    Id = 0,
                    FirstName = "Lary",
                    LastName = "Page",
                    CompanyName = "Google",
                    Email = "lary.page@gmail.com",
                    PhoneNumber = "0641293426",
                    Visits = new List<Visit>(){
                        new Visit(){
                            Id = 0,
                            ArrivalTime = DateTime.Now
                        }
                    }
                },
                new Visitor()
                {
                    Id = 1,
                    FirstName = "Bill",
                    LastName = "Gates",
                    CompanyName = "Microsoft",
                    Email = "bill@hotmail.com",
                    PhoneNumber = "0648238463",
                    Visits = new List<Visit>(){
                        new Visit(){
                            Id = 1,
                            ArrivalTime = DateTime.Now
                        }
                    }
                }
            };
            return visitors;
        }

        public Visitor GetVisitorById(int id)
        {
            return new Visitor()
            {
                Id = 0,
                FirstName = "Lary",
                LastName = "Page",
                CompanyName = "Google",
                Email = "lary.page@gmail.com",
                PhoneNumber = "0641293426",
                Visits = new List<Visit>(){
                        new Visit(){
                            Id = 0,
                            ArrivalTime = DateTime.Now
                        }
                    }
            };
        }

        public bool SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void UpdateVisitor(Visitor visitor)
        {
            throw new NotImplementedException();
        }
    }
}