using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AdvAgency.Models;
using AdvAgency.Persistence;

namespace AdvAgency.Controllers
{
    [Route("api/[controller]")]
    public class ServiceController : Controller
    {
        private readonly IRepository<Service> _servicesRepo;

        public ServiceController(IRepository<Service> servRep)
        {
            _servicesRepo = servRep;
        }

        [HttpGet("[action]")]
        public IActionResult GetServices()
        {
            try
            {
                return Ok(new
                {
                    services = _servicesRepo.Fetch(s => true)
                });
            }
            catch
            {
                return BadRequest(new
                {
                    message = "Can't fetch data"
                });
            }
        }

    }
}