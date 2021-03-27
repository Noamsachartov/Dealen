using DealenServerSide.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DealenServerSide.Controllers
{
    public class DealInCustController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public IHttpActionResult Post([FromBody]DealInCust dealInCust)
        {
            try
            {
                int count = dealInCust.Insert();
                return Created(new Uri(Request.RequestUri.AbsoluteUri + dealInCust.Coupon), count);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        // PUT api/<controller>/5
        [HttpPut]
        [Route("api/DealInCust/used/{coupon}")]
        public IHttpActionResult Putused(int coupon)
        {
            DealInCust dealInCust = new DealInCust();

            try
            {
                int count = dealInCust.UseCoupon(coupon);
                return Created(new Uri(Request.RequestUri.AbsoluteUri + dealInCust.Coupon), count);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("api/DealInCust/CancelDeal/{coupon}")]
        public IHttpActionResult putCancelDeal(int coupon)
        {
            DealInCust dealInCust = new DealInCust();

            try
            {
                int count = dealInCust.CancelDeal(coupon);
                return Created(new Uri(Request.RequestUri.AbsoluteUri + dealInCust.Coupon), count);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        // PUT api/<controller>/5
        [HttpPut]
        [Route("api/DealInCust/like/{coupon}/{isbefore}/{cust_id}/{deal_id}")]
        public IHttpActionResult Putlike(int coupon, bool isbefore, int cust_id, int deal_id)
        {
            DealInCust dealInCust = new DealInCust();

            try
            {
                int count = dealInCust.LikeDeal(coupon, isbefore, cust_id, deal_id);
                return Created(new Uri(Request.RequestUri.AbsoluteUri + dealInCust.Coupon), count);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("api/DealInCust/Unlike/{coupon}/{isbefore}/{cust_id}/{deal_id}")]
        public IHttpActionResult PutUnlike(int coupon, bool isbefore, int cust_id, int deal_id)
        {
            DealInCust dealInCust = new DealInCust();

            try
            {
                int count = dealInCust.UNLikeDeal(coupon, isbefore, cust_id, deal_id);
                return Created(new Uri(Request.RequestUri.AbsoluteUri + dealInCust.Coupon), count);

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