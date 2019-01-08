using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvAgency.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int ServiceId { get; set; }
        public Service Service { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Comment { get; set; }
        public string Duration { get; set; }
        public OrderState Status { get; set; }
        public DateTime Created { get; set; }
    }
}
