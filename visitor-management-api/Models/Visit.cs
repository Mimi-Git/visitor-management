using System;
using System.ComponentModel.DataAnnotations;

namespace visitor_management_api.Models
{
    public class Visit
    {
        public int Id { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime ArrivalTime { get; set; }

        [DataType(DataType.Date)]
        public DateTime DepartureTime { get; set; }

        [Required]
        public int VisitorId { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        //[Required]
        //public Visitor Visitor { get; set; }

        //[Required]
        //public Employee Employee { get; set; }
    }
}