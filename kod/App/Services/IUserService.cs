using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using AdvAgency.Models;

namespace AdvAgency.Services
{
    public interface IUserService
    {
        User Authenticate(string email, string password);
        IEnumerable<User> Fetch(Expression<Func<User,bool>> predicate);
        User Get(int id);
        User Get(Func<User,bool> predicate);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }
}