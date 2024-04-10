
using AutoMapper;
using Mng.Core.DTOs;
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
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IRoleRepository _roleRepository;
        readonly IMapper _mapper;
        public EmployeeService(IEmployeeRepository employeeRepository, IRoleRepository roleRepository, IMapper mapper)
        {

            _employeeRepository = employeeRepository;
            _roleRepository = roleRepository;
            _mapper = mapper;

        }
      
        public async Task<bool> Add(EmployeeDTO employee)
        {
            var em = _mapper.Map<Employee>(employee);
            em.Active = true;

            if (!IsRoleStartDatesValid(em))
            {
                return false;
            }

            foreach (var e in em.Roles)
            {
                e.EmployeeId = employee.Id;
                if (!_roleRepository.IsExistId(e.RoleId).Result)
                {
                    return false;
                }
            }

            return await _employeeRepository.Add(em);
        }

        public async Task<bool> Delete(int id)
        {
            return await _employeeRepository.Delete(id);
        }

        public List<EmployeeDTO> GetAll()
        {

            var r = _employeeRepository.GetAll().FindAll(x => x.Active);
            var eDTO = _mapper.Map<EmployeeDTO[]>(r).ToList();
            return eDTO;
        }

        public async Task<EmployeeDTO> GetById(int id)
        {
            if (_employeeRepository.IsExist(id).Result)
            {
                var em = await _employeeRepository.GetById(id);
                EmployeeDTO emDTO = _mapper.Map<EmployeeDTO>(em);
                return emDTO;
            }
            else 
                return null;
        }

        //public async Task<bool> Update(int id, EmployeeDTO employee)
        //{
        //    var em = _mapper.Map<Employee>(employee);
        //    em.Active = true;
        //    if (!IsRoleStartDatesValid(em))
        //    {
        //        return false;
        //    }
        //    foreach (var e in em.Roles)
        //    {
        //        e.EmployeeId = employee.Id;
        //        if (!_roleRepository.IsExistId(e.RoleId).Result)
        //            return false;
        //    }

        //    return _employeeRepository.Update(id, em).Result;
        //}
        public async Task<bool> Update(int id, EmployeeDTO employee)
        {
            var em = _mapper.Map<Employee>(employee);
            em.Active = true;

            if (!IsRoleStartDatesValid(em))
            {
                return false;
            }

            // מאפיין HashSet לשמירת זהות התפקידים הקיימים
            var existingRoleIds = new HashSet<int>();

            foreach (var e in em.Roles)
            {
                // אם התפקיד כבר קיים ברשימת התפקידים של העובד, נחזיר שגיאה
                if (existingRoleIds.Contains(e.RoleId))
                {
                    return false;
                }

                // הוספת התפקיד למאפיין HashSet
                existingRoleIds.Add(e.RoleId);

                // אם התפקיד לא קיים במאגר התפקידים, נחזיר שגיאה
                if (!_roleRepository.IsExistId(e.RoleId).Result)
                {
                    return false;
                }
            }

            return _employeeRepository.Update(id, em).Result;
        }

        private bool IsRoleStartDatesValid(Employee em)
        {
            foreach (var role in em.Roles)
            {
                if (role.RoleStartDate < em.StartDate)
                {
                    return false;
                }
            }
            return true;
        }

    }

}


