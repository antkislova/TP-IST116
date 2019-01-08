using System;
using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;
using AdvAgency.Models;
using Microsoft.EntityFrameworkCore;

namespace AdvAgency.Persistence
{
    public class UserRepository : IRepository<User>
    {
        private readonly AppContext _context;
        public UserRepository(AppContext ctx){
            this._context = ctx;
        }
        public void Create(User user)
        {
            _context.Add(user);
        }

        public void Delete(User user)
        {
            _context.Remove(_context.Users.Where(u => u.Id == user.Id).Single());
        }

        public IEnumerable<User> Fetch(Expression<Func<User, bool>> predicate)
        {
            return _context.Users.Where(predicate).Include(u => u.Role);
        }

        //метод возвращает null, если пользователь не существует
        public User Get(int id)
        {
            try {
                return _context.Users.Where(u => u.Id == id).Single();
            } catch {
                return null;
            }
        }

        //метод возвращает null, если пользователь не существует
        public User Get(Expression<Func<User, bool>> predicate)
        {
            try {
                return _context.Users.Where(predicate).Single();
            } catch {
                return null;
            }
        }

        public void Update(User user)
        {
            _context.Update(user);
        }
    }
}