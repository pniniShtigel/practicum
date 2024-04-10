using Microsoft.EntityFrameworkCore;
using Mng.Core.DTOs;
using Mng.Core.Models;


namespace Mng.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<EmployeeRole> EmployeeRoles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=shtigel;Initial Catalog=practicum;Integrated Security=true; User ID=pnini;Password=1234; TrustServerCertificate=True; Encrypt=False;");
        }

    }
}
