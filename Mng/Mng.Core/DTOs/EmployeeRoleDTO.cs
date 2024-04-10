using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit.Abstractions;

namespace Mng.Core.DTOs
{
    public class EmployeeRoleDTO
    {
        public int RoleId { get; set; }
        public bool Managerial { get; set; }

    //    [Compare("EmployeeDTO.StartOfWorkingDate", ErrorMessage = "Role start date must be later than start of working date")]

        public DateTime RoleStartDate { get; set; }
    }
}
