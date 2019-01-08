using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdvAgency.Models;
using AdvAgency.Helpers;
using AdvAgency.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdvAgency.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        const string Admin = "1";
        const string Manager = "2";
        const string Client = "3";
        private readonly IRepository<Order> _orderRepo;
        private readonly IUnitOfWork _uof;

        public OrderController(IRepository<Order> orderRepo, IUnitOfWork uof)
        {
            _orderRepo = orderRepo;
            _uof = uof;
        }

        [Authorize(Roles = Client)]
        [HttpPost("makeorder")]
        public IActionResult MakeOrder([FromBody] OrderViewModel model)
        {
            try
            {
                var order = (Order)model;
                order.UserId = int.Parse(User.Identity.Name);
                order.Created = DateTime.Now;

                _orderRepo.Create(order);
                _uof.Complete();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(new
                {
                    message = "На сервере произошла ошибка, попробуйте позже"
                });
            }
        }

        [Authorize(Roles = (Manager + "," + Client))]
        [HttpGet("getorders")]
        public IActionResult GetOrders()
        {
            try
            {
                IEnumerable<Order> orders;
                if (User.GetRoleId() == Client)
                {
                    var userId = int.Parse(User.Identity.Name);
                    orders = _orderRepo.Fetch(order => order.UserId == userId);
                } else
                {
                    orders = _orderRepo.Fetch(o => true);
                }

                return Ok(new
                {
                    orders
                });
            }
            catch (Exception e)
            {
                return BadRequest(new
                {
                    message = "На сервере произошла ошибка, попробуйте позже"
                });
            }
        }

        [Authorize(Roles = Manager)]
        [HttpPut("setstatus/{id}")]
        public IActionResult SetStatus([FromRoute] int id, [FromQuery] int status )
        {
            try
            {
                var order = _orderRepo.Get(id);
                if (order != null)
                {
                    order.Status = (OrderState) status;
                    _uof.Complete();
                    return Ok();
                } else
                {
                    return BadRequest("Заказ не найден");
                }
            } catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}