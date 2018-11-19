using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CourseProject.Models
{
    public class customer:Users
    {
        public int customerid { get; set; }
        public int idus { get; set; }
        private string phone2 { get; set; }
        private string orgnization { get; set; }
    }
}