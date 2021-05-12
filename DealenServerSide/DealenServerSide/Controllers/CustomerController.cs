using DealenServerSide.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DealenServerSide.Controllers
{
    public class CustomerController : ApiController
    {
        // GET api/<controller>


        // GET api/<controller>/5
        public IHttpActionResult Get(string cust_mail, string password)
        {
            try
            {
                Customer Customer = new Customer();
                List<Customer> Customer_Islogged = Customer.CheckIfLog(cust_mail, password);
                return Ok(Customer_Islogged);
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);


            }
        }
        [HttpGet]
        [Route("api/Customer/GetCustomer/{id}")]
        public IHttpActionResult GetCustomer(int id)
        {
            try
            {
                Customer Customer = new Customer();
                List<Customer> Customers = Customer.Read(id);
                return Ok(Customers);
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);


            }
        }


        // POST api/<controller>
        public IHttpActionResult Post([FromBody]Customer customer)
        {
            try
            {
                int count = customer.Insert();
                return Created(new Uri(Request.RequestUri.AbsoluteUri + customer.Cust_id), count);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        // PUT api/<controller>/5
        public IHttpActionResult Put(int id, Customer customer)
        {
            try
            {
                int count = customer.UpdateIntialPreferences(id, customer);
                return Created(new Uri(Request.RequestUri.AbsoluteUri + id), count);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("api/Customer/Updateinitial/{id}")]
        public IHttpActionResult Updateinitial(int id, Customer customer)
        {
            try
            {
                int count = customer.UpdateIntialPreferencesfromPrivate(id, customer);
                return Created(new Uri(Request.RequestUri.AbsoluteUri + id), count);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}