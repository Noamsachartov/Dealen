using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DealenServerSide.Models;

namespace DealenServerSide.Controllers
{
    public class BusinessesController : ApiController
    {


        // GET api/<controller>/5
        public IHttpActionResult Get(string bmail, string password)
        {
            try
            {
                Businesses business = new Businesses();
                List<Businesses> bus_Islogged = business.CheckIfLog(bmail, password);
                return Ok(bus_Islogged);
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);


            }
        }
        [HttpGet]
        [Route("api/Businesses/ActiveRest")]
        public IHttpActionResult GetActiveRest()
        {
            try
            {
                Businesses business = new Businesses();
                List<Businesses> bus = business.ReadActiveRest();
                return Ok(bus);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }


        [HttpGet]
        [Route("api/Businesses/resbyres/{id}")]
        public IHttpActionResult GetActiveRest(int id)
        {
            try
            {
                Businesses business = new Businesses();
                List<Businesses> bus = business.ReadRest(id);
                return Ok(bus);

            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }




        //[HttpGet]
        //[Route("api/Businesses/{category}")]
        //public IHttpActionResult Get(string category)
        //{
        //    try
        //    {
        //        Businesses businesses = new Businesses();
        //        List<Businesses> bList = businesses.Read(category);
        //        return Ok(bList);

        //    }
        //    catch (Exception e)
        //    {
        //        return Content(HttpStatusCode.BadRequest, e);
        //    }
        //}

        public IHttpActionResult Post([FromBody]Businesses businesses)
        {
            try
            {
                int count = businesses.Insert();
                return Created(new Uri(Request.RequestUri.AbsoluteUri + businesses.Bid), businesses.Bid);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }




      



        //[HttpGet]
        //[Route("api/Businesses/GetActive/{category}")]
        //public IHttpActionResult GetActive(string category)
        //{


        //    try
        //    {
        //        Businesses businesses = new Businesses();
        //        List<Businesses> bList = businesses.ReadActive(category);
        //        return Ok(bList);
        //    }
        //    catch (Exception e)
        //    {
        //        return Content(HttpStatusCode.BadRequest, e);
        //    }
        //}



        //[HttpGet]
        //[Route("api/Businesses/Byuser")]
        //public IHttpActionResult GetByuser([FromUri] int[] att_id)
        //{

        //    try
        //    {
        //        Businesses businesses = new Businesses();
        //        List<Businesses> bList = businesses.ReadByUser(att_id);
        //        return Ok(bList);
        //    }
        //    catch (Exception e)
        //    {
        //        return Content(HttpStatusCode.BadRequest, e);
        //    }
        //}


        //[HttpGet]
        //[Route("api/Businesses/Byuser/{category}")]
        //public IHttpActionResult Get([FromUri] int[] att_id, string category)
        //{
        //    try
        //    {
        //        Businesses businesses = new Businesses();
        //        List<Businesses> bList = businesses.ReadByUser(att_id, category);
        //        return Ok(bList);
        //    }
        //    catch (Exception e)
        //    {
        //        return Content(HttpStatusCode.BadRequest, e);
        //    }
           
        //}


        //[HttpGet]
        //[Route("api/Businesses/GetPromotByUser/{category}")]
        //public IHttpActionResult GetPromotByUser([FromUri] int[] att_id, string category)
        //{
        //    try
        //    {
        //        Businesses businesses = new Businesses();
        //        List<Businesses> bList = businesses.ReadPromotByUser(att_id, category);
        //        return Ok(bList);
        //    }
        //    catch (Exception e)
        //    {
        //        return Content(HttpStatusCode.BadRequest, e);
        //    }
        //}






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
