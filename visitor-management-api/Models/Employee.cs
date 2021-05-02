﻿using System.ComponentModel.DataAnnotations;

namespace visitor_management_api.Models
{
    public class Employee : Person
    {
        [StringLength(100)]
        public string Department { get; set; }
    }
}