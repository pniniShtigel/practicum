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
    public class RoleRepository : IRoleRepository
    {

        private readonly DataContext _context;

        public RoleRepository(DataContext context)
        {
            _context = context;
        }

        //public async Task<List<Role>> GetAll()
        //{
        //    return await _context.Roles.ToListAsync();
        //}

        public async Task<bool> IsExistId(int id)
        {
            return await _context.Roles.AnyAsync(role => role.Id == id);
        }
        public async Task<string> GetById(int id)
        {
            var role = await _context.Roles.FirstAsync(role => role.Id == id);
            return role.Name;
        }

        List<Role> IRoleRepository.GetAll()
        {
            return _context.Roles.ToList();
        }
    }
}
