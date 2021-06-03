using System.Collections.Generic;

namespace visitor_management_api.Dtos
{
    public class VisitorReadDtoWithVisits
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public IEnumerable<VisitReadDto> Visits { get; set; }
    }
}