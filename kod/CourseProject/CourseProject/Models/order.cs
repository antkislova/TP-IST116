using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CourseProject.Models
{
    public class order
    {
        public int orderid { get; set; }
        public int idc { get; set; }
        public int idm { get; set; }
        public int idd { get; set; }
        public int idty { get; set; }
        public int ids { get; set; }
        public DateTime daten { get; set; }
        public DateTime dateend { get; set; }
    }
}