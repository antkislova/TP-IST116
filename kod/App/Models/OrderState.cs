using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvAgency.Models
{
    public enum OrderState
    {
        Reicived,//принят
        Confirmed,//подтвержден
        Proceed,//выполняется
        Canceled,//отменен
        Done
    }
}
