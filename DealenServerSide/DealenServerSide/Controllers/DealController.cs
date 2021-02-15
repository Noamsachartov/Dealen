using DealenServerSide.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DealenServerSide.Controllers
{
    public class DealController : ApiController
    {
        // GET api/<controller>
        public IHttpActionResult Get()
        {
            try
            {
                Deal deal = new Deal();
                List<Deal> deals = deal.Read();
                return Ok(deals);
            
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }

        // GET api/<controller>/5

        [HttpGet]
        [Route("api/Deal/{cat_id}")]
        public IHttpActionResult Getbycat(int cat_id)
        {
            try
            {
                Deal deal = new Deal();
                List<Deal> deals = deal.Readbycat(cat_id);
                return Ok(deals);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }

        // POST api/<controller>
        public IHttpActionResult Post([FromBody]Deal deal)
        {
            try
            {
                int count = deal.Insert();
                return Created(new Uri(Request.RequestUri.AbsoluteUri + deal.Id), count);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}