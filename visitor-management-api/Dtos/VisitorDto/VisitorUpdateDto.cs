using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using visitor_management_api.Models;

namespace visitor_management_api.Dtos
{
    public class VisitorUpdateDto
    {
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [StringLength(100)]
        public string CompanyName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }

        public IEnumerable<Visit> Visits { get; set; }
    }
}