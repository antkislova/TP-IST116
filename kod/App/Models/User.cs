using System;

namespace AdvAgency.Models
{
    public class User
    {
        public User() { }
        public int Id { get; set; }
        public String FullName { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}