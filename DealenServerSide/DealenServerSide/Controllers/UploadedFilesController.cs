using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace DealenServerSide.Controllers
{
    public class UploadedFilesController : ApiController
    {
        [HttpPost]
        [Route("api/UploadedFiles/uploadedFiles")]
        public HttpResponseMessage Post()
        {
            string imageLink;
            var httpContext = HttpContext.Current;
            string imgpath = "";
            try
            {
                if (httpContext.Request.Files.Count > 0)
                {
                    HttpPostedFile httpPostedFile = httpContext.Request.Files[0];
                    string name = httpContext.Request.Form["name"];

                    DirectoryInfo hdDirectoryInWhichToSearch = new DirectoryInfo(HostingEnvironment.MapPath("~/uploadedFiles"));
                    FileInfo[] filesInDir = hdDirectoryInWhichToSearch.GetFiles("" + name + ".*");
                    foreach (FileInfo foundFile in filesInDir)
                    {
                        foundFile.Delete();
                    }

                    if (httpPostedFile != null)
                    {
                        string fname = httpPostedFile.FileName.Split('\\').Last();
                        string sfname = fname.Split('.').Last();
                        var fileSavePath = Path.Combine(HostingEnvironment.MapPath("~/uploadedFiles"), name + "." + sfname);
                        httpPostedFile.SaveAs(fileSavePath);
                        imgpath = fileSavePath;
                        imageLink = $"uploadedFiles/{name}.{sfname}";
                    }
                }
                return Request.CreateResponse(HttpStatusCode.Created, imgpath);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
            }
        }


        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}