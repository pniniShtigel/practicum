using Mng.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Services
{
    public interface IRoleService
    {
         List<Role>GetAll();
      
        Task<string> GetById(int id);

     
    }
}
