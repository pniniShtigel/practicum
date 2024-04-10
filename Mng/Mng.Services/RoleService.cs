using Mng.Core.interfaces;
using Mng.Core.Models;
using Mng.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;


        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public List<Role> GetAll()
        {
            return _roleRepository.GetAll();
        }

        public Task<string> GetById(int id)
        {
            return _roleRepository.GetById(id);
        }


    }
}