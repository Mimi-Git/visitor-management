using System.Collections.Generic;

namespace visitor_management_api.Models
{
    public class Visitor : Person
    {
        public IEnumerable<Visit> Visits { get; set; }
    }
}