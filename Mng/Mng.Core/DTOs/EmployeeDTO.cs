using Mng.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "TZ is required")]
        [RegularExpression(@"^\d{9}$", ErrorMessage = "Invalid TZ format. TZ must contain 9 digits")]
        public string TZ { get; set; }

        [Required(ErrorMessage = "Date of Birth is required")]
        public DateTime BirthDate { get; set; }

        [Required(ErrorMessage = "Start of Work Date is required")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Gender is required")]
        public bool Gender { get; set; }

        public List<EmployeeRole> Roles { get; set; }

    }
}
