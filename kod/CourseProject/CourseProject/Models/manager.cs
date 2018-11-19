using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CourseProject.Models
{
    public class manager : Users
    {
        public int managerid { get; set; }
        public int iduser { get; set; }
        private string passport { get; set; }
    }
}