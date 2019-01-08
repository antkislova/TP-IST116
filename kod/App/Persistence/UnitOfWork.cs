using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace AdvAgency.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private AppContext _context;
        public UnitOfWork(AppContext context)
        {
            _context = context;
        }
        public void Complete()
        {
            _context.SaveChanges();
        }
    }
}
