using DealenServerSide.Models;
using System;
using System.Collections.Generic;
using System.Net;
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
        // GET api/<controller>
        [HttpGet]
        [Route("api/Deal/Active")]
        public IHttpActionResult GetActive()
        {
            try
            {
                Deal deal = new Deal();
                List<Deal> deals = deal.ReadActive();
                return Ok(deals);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }

        // GET api/<controller>/5

        [HttpGet]
        [Route("api/Deal/deal/{id}")]
        public IHttpActionResult GetByDeal(int id)
        {
            try
            {
                Deal deal = new Deal();
                List<Deal> deals = deal.Readbydeal(id);
                return Ok(deals);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }

        [HttpGet]
        [Route("api/Deal/CheckIsLike/{id}/{cust_id}")]
        public IHttpActionResult CheckIsLike(int id, int cust_id)
        {
            try
            {
                Deal deal = new Deal();
                List<Deal> deals = deal.CheckIsLike(id, cust_id);
                return Ok(deals);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }

        [HttpGet]
        [Route("api/Deal/dealbyRest/{rest_id}")]
        public IHttpActionResult GetByRest(int rest_id)
        {
            try
            {
                Deal deal = new Deal();
                List<Deal> deals = deal.ReadbyRest(rest_id);
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

        [HttpGet]
        [Route("api/Deal/lastDeal/{cust_id}")]
        public IHttpActionResult GetLastDeals(int cust_id)
        {
            try
            {
                Deal deal = new Deal();
                List<Deal> deals = deal.Readlastdeals(cust_id);
                return Ok(deals);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }
        [HttpGet]
        [Route("api/Deal/RecommendDeal/{cust_id}/{latitude}/{longitude}/")]
        public IHttpActionResult GetRecommendDeal(int cust_id, float latitude, float longitude)
        {
            try
            {
                //float lat, longi;
                //lat = float.Parse(latitude);
                //longi = float.Parse(longitude);
                Deal deal = new Deal();
                List<Deal> deals = deal.ReadRecommendDeal(cust_id, latitude, longitude);
                return Ok(deals);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }


        [HttpGet]
        [Route("api/Deal/Search/{Letters}")]
        public IHttpActionResult GetSearch(string Letters)
        {
            try
            {
                Deal deal = new Deal();
                List<Deal> deals = deal.ReadSearch(Letters );
                return Ok(deals);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }


        [HttpGet]
        [Route("api/Deal/SearchDeals/{userQuery}")]
        public IHttpActionResult SearchDeals(string userQuery)
        {
            try
            {
                Deal deal = new Deal();
                List<Deal> deals = deal.SearchDeals(userQuery);
                return Ok(deals);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }

        [HttpGet]
        [Route("api/Deal/GetTags")]
        public IHttpActionResult GetTags()
        {
            try
            {
                Deal deal = new Deal();
                List<Deal> deals = deal.getTags();
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

        [HttpGet]
        [Route("api/Deal/DataCard/{Bus_Id}")]
        public IHttpActionResult GetDataCard(int Bus_Id)
        {
            try
            {
                RedeemCard dcard = new RedeemCard();
                List<RedeemCard> dcards = dcard.ReadDataCard(Bus_Id);
                return Ok(dcards);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }

        [HttpGet]
        [Route("api/Deal/DealByDate/{Bus_Id}")]
        public IHttpActionResult GetDealByDate(int Bus_Id)
        {
            try
            {
                RedeemCard dcard = new RedeemCard();
                List<List<RedeemCard>> dcards = dcard.ReadDealByDate(Bus_Id);
                return Ok(dcards);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }

        [HttpGet]
        [Route("api/Deal/Alldeal/{Bus_Id}")]
        public IHttpActionResult GetAllDeal(int Bus_Id)
        {
            try
            {
                Deal deal = new Deal();
                List<Deal> deals = deal.ReadAlldeal(Bus_Id);
                return Ok(deals);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }

        [HttpGet]
        [Route("api/Deal/Product/{Bus_Id}/{Period}")]
        public IHttpActionResult GetProduct(int Bus_Id, string Period)
        {
            try
            {
                Deal deal = new Deal();
                List<Deal> deals = deal.ReadProduct(Bus_Id, Period);
                return Ok(deals);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }

        [HttpGet]
        [Route("api/Deal/DealCompeting/{Bus_Id}/{Period}")]
        public IHttpActionResult GetDealCompeting(int Bus_Id, string Period)
        {
            try
            {
                RivalCoupon data = new RivalCoupon();
                List<RivalCoupon> data_list = data.ReadDealCompeting(Bus_Id, Period);
                return Ok(data_list);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }
    }
}