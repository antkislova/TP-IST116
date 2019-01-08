using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvAgency.Models
{
    public class OrderViewModel
    {
        public int UserId { get; set; }
        public int ServiceId { get; set; }
        public string Duration { get; set; }
        public string Comment { get; set; }

        public static explicit operator Order(OrderViewModel m)
        {
            return new Order()
            {
                UserId = m.UserId,
                ServiceId = m.ServiceId,
                Duration = m.Duration,
                Comment = m.Comment

            };
        }
    }
}
