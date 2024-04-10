using AutoMapper;
using Mng.Core.DTOs;
using Mng.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Data
{
    public class Profiler : Profile
    {
        public Profiler()
        {
            //CreateMap<EmployeeDTO, Employee>().ForMember(x => x.Active, y => y.Ignore()).ReverseMap();

            CreateMap<EmployeeDTO, Employee>()
         .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.Roles.Select(role => new EmployeeRole
         {
             RoleId = role.RoleId,
             Managerial = role.Managerial,
             RoleStartDate = role.RoleStartDate
         })))
    //     .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
    //.ReverseMap()
                     .ForMember(dest => dest.BirthDate, opt => opt.MapFrom(src => src.BirthDate))
    .ReverseMap();

        }

    }
}
