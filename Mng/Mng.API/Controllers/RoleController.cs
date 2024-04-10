using Microsoft.AspNetCore.Mvc;
using Mng.Core.Models;
using Mng.Core.Services;
using Mng.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mng.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }
        // GET: api/<RoleController>
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_roleService.GetAll());
        }
        [HttpGet("{id}")]
        public async Task<string> GetById(int id)
        {
            string r = await _roleService.GetById(id);

           

            return r; // החזר Ok עם אובייקט העובד אם נמצא
        }




    }
}
