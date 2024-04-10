using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Mng.Core.Models
{
    public class EmployeeRole
    {
        [Key]
        public int Id { get; set; }
        public int RoleId { get; set; }
        [ForeignKey(nameof(EmployeeId))]
        public int EmployeeId { get; set; }
        public bool Managerial { get; set; }
        public DateTime RoleStartDate { get; set; }

        [JsonIgnore]
        public Employee? Employee { get; set; }
    }
  
}
