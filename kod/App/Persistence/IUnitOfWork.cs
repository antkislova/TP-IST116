using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvAgency.Persistence
{
    public interface IUnitOfWork
    {
        void Complete();
    }
}
