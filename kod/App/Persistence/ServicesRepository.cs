using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AdvAgency.Models;

namespace AdvAgency.Persistence
{
    public class ServicesRepository : IRepository<Service>
    {
        private AppContext _context;
        public ServicesRepository(AppContext context)
        {
            _context = context;
        }

        public void Create(Service entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(Service entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Service> Fetch(Expression<Func<Service, bool>> predicate)
        {
            return _context.Services.Where(predicate);
        }

        public Service Get(int id)
        {
            throw new NotImplementedException();
        }

        public Service Get(Expression<Func<Service, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public void Update(Service entity)
        {
            throw new NotImplementedException();
        }
    }
}
