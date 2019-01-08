using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AdvAgency.Services;
using AdvAgency.Models;
using AdvAgency.Helpers;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace AdvAgency.Controllers
{   
    [Authorize]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        const string Admin = "1";
        const string Manager = "2";
        const string Client = "3";

        private readonly IUserService _userService;
        private readonly IConfiguration _config;

        public AuthController(IUserService userService, IConfiguration config)
        {
            this._userService = userService;
            this._config = config;
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Create([FromBody] RegisterUserViewModel model)
        {
            model.RoleId = 3;
            try
            {
                this._userService.Create((User)model, model.Password);
                return Ok();

            }
            catch (AppException e)
            {
                return BadRequest(new
                {
                    message = e.Message
                });
            }
            catch
            {
                return BadRequest(new
                {
                    message = "Произошла ошибка, попробуйте позже"
                });
            }
        }
        
        [AllowAnonymous]
        [HttpPost("auth")]
        public IActionResult Authenticate([FromBody] AuthUserViewModel model) {
            if(model == null || model.Email == null || model.Password == null)
                return BadRequest(new { message = "Электронная почта или пароль не валидны" });

            var user = _userService.Authenticate(model.Email,model.Password);

            if (user == null)
                return BadRequest(new { message = "Электронная почта или пароль не валидны" });
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config.GetSection("Config:SecretKey").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.RoleId.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new {
                token = tokenString,
                email = user.Email,
                fullName = user.FullName,
                phone = user.Phone
            });
        }
    }
}