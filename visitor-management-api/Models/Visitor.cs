using System.Collections.Generic;

namespace visitor_management_api.Models
{
    public class Visitor : Person
    {
        public List<Visit> Visits { get; set; }
    }
}