using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mng.Core.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(20)]
        public string? FirstName { get; set; }
        [Required]
        [MaxLength(20)]
        public string? LastName { get; set; }
        public string? Email { get; set; }
        [Required]
        [MinLength(9)]
        [MaxLength(9)]
        public string? TZ { get; set; }
        
        public DateTime StartDate { get; set; }
       
        public DateTime BirthDate { get; set; }
      
        public bool Gender { get; set; }
        public List<EmployeeRole> Roles { get; set; }
        public bool Active { get; set; }
    }

 


}
