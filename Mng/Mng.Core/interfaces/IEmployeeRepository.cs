using Mng.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.interfaces
{
    public interface IEmployeeRepository
    {
        List<Employee> GetAll();
        Task<Employee> GetById(int id);

        Task<bool> Add(Employee user);

        Task<bool> Update(int id, Employee user);

        Task<bool> Delete(int id);
        Task<bool> IsExist(int id);
    }


}

