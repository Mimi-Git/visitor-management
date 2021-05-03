using System.Collections.Generic;
using visitor_management_api.Models;

namespace visitor_management_api.Dtos
{
    public class VisitorReadDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public IEnumerable<Visit> Visits { get; set; }
    }
}