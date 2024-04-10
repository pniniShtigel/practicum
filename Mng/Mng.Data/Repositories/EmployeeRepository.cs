using Microsoft.EntityFrameworkCore;
using Mng.Core.interfaces;
using Mng.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {


        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> Add(Employee employee)
        {

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var employeeToDelete = _context.Employees.FirstOrDefault(e => e.Id == id);
            if (employeeToDelete != null)
            {
                employeeToDelete.Active = false;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<Employee> GetById(int id)
        {
            return await _context.Employees.Include(r => r.Roles).FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<bool> IsExist(int id)
        {
            return await _context.Employees.AnyAsync(e => e.Id == id && e.Active);
        }

        public async Task<bool> Update(int id, Employee employee)
        {
            //Employee e = await _context.Employees.FirstOrDefaultAsync(e => e.Id == id);
            //e.StartDate = employee.StartDate;
            //e.TZ = e.TZ;
            //e.FirstName = employee.FirstName;
            //e.LastName = employee.LastName;
            //Employee ec=await _context.Employees.FirstOrDefaultAsync(e => e.Id==id);
            //ec.BirthDate = employee.BirthDate;
            //ec.Male=employee.Male;


            //לשנות את התפקידים
            //var roles = employee.EmployeeCharacteristics.Roles;

            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
            return true;
        }

        List<Employee> IEmployeeRepository.GetAll()
        {
            return _context.Employees.Include(r => r.Roles).ToList();
        }
    }
}


