﻿
using Mng.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.interfaces
{
    public interface IEmployeeService
    {
        List<EmployeeDTO> GetAll();
        Task<EmployeeDTO> GetById(int id);
        Task<bool> Add(EmployeeDTO user);
        Task<bool> Update(int id, EmployeeDTO user);
        Task<bool> Delete(int id);
    }
}
