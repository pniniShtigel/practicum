using Microsoft.AspNetCore.Mvc;
using Mng.Core.DTOs;
using Mng.Core.interfaces;
using Mng.Core.Models;
using Mng.Core.Services;

namespace Mng.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public ActionResult<EmployeeDTO> GetAll()
        {
            return Ok(_employeeService.GetAll());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var x = await _employeeService.GetById(id);
            return x == null ? NotFound("Employee is not found") : Ok(x);
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeeDTO employee)
        {
            bool res = await _employeeService.Add(employee);
            return res ? Ok(new { message = "The employee was successfully added" }) : BadRequest(new { message = "Failed to add employee" });
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeeDTO employee)
        {
            bool res = await _employeeService.Update(id, employee);
            return res ? Ok(new { message = "The employee has been updated successfully" }) : BadRequest(new { message = "Failed to update employee" });
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var x = await _employeeService.Delete(id);
            if (x == true)
                return Ok(x);
            return NotFound("Employee is not found");
        }
       
    }
}
