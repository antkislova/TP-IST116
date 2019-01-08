using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvAgency.Models
{
    public class RegisterUserViewModel
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }

        public static explicit operator User(RegisterUserViewModel m)
        {
            return new User()
            {
                FullName = m.Name,
                Phone = m.Phone,
                Email = m.Email,
                RoleId = m.RoleId
               
            };
        }
    }
}
