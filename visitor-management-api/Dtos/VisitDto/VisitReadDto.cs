using System;

namespace visitor_management_api.Dtos
{
    public class VisitReadDto
    {
        public int Id { get; set; }
        public DateTime ArrivalTime { get; set; }
        public DateTime DepartureTime { get; set; }
        public int VisitorId { get; set; }
        public int EmployeeId { get; set; }
    }
}