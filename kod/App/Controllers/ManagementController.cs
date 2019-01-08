using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdvAgency.Services;
using AdvAgency.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AdvAgency.Persistence;

namespace AdvAgency.Controllers
{

    [Route("api/[controller]")]
    public class ManagementController : Controller
    {
        const string Admin = "1";
        const string Manager = "2";
        const string Client = "3";

        private readonly IUserService _userService;
        private readonly IUnitOfWork _uof;

        public ManagementController(IUserService userService, IUnitOfWork unitOfWork)
        {
            this._userService = userService;
            this._uof = unitOfWork;
        }

        [Authorize(Roles = Admin)]
        [HttpPost("createmanager")]
        public IActionResult NewManager([FromBody] RegisterUserViewModel model)
        {
            try
            {
                model.RoleId = 2;
                _userService.Create((User)model, model.Password);
                return Ok();
            } catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = Admin)]
        [HttpGet("getusers")]
        public IActionResult GetUsers()
        {
            try
            {
                var users = _userService.Fetch(u => true);
                users = users.Select(u =>
                {
                    u.PasswordHash = null;
                    u.PasswordSalt = null;
                    return u;
                });
                return Ok( new
                {
                    users
                });
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = Admin)]
        [HttpDelete("removeuser/{id}")]
        public IActionResult RemoveUser([FromRoute]int id)
        {
            try
            {
                if (_userService.Get(id).RoleId == 1) throw new Exception("Can't remove administrator");
                _userService.Delete(id);
                _uof.Complete();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest( new {
                    message = ex.Message
                });
            }
        }

    }
}