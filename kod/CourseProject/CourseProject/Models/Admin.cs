using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CourseProject.Models
{
    public class Admin:Users
    {
        public int adminid { get; set; }
        public int userid { get; set; }

    }
}