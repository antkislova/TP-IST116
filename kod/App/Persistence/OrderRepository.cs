using AdvAgency.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AdvAgency.Persistence
{
    public class OrderRepository : IRepository<Order>
    {
        private AppContext _context;
        public OrderRepository(AppContext context)
        {
            _context = context;
        }

        public void Create(Order entity)
        {
            _context.Orders.Add(entity);
        }

        public void Delete(Order entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Order> Fetch(Expression<Func<Order, bool>> predicate)
        {
            return (_context.Orders
                .Where(predicate)
                .Include(o => o.Service)
                .Include(o => o.User) as IEnumerable<Order>).Select(o =>
                {
                    o.User.PasswordHash = null;
                    o.User.PasswordSalt = null;
                    return o;
                });
        }

        public Order Get(int id)
        {
            try
            {
                var order = _context.Orders.FirstOrDefault(o => o.Id == id);
                return order;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Order Get(Expression<Func<Order, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public void Update(Order entity)
        {
            throw new NotImplementedException();
        }
    }
}
