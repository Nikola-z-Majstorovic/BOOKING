using Booking.Agency;
using Booking.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using Newtonsoft.Json;
using Booking.Agency.Models;
using System.Text;
using System.Web;
using System.Web.Http.Filters;
using Booking.Agency.Base.Web.Http;
using Booking.Agency.Base.Data;


namespace Booking.Agency.Controllers
{
    public class VersionsController : BaseApiController
    {
        [System.Web.Http.HttpGet]
        public HttpResponseMessage GetVersion()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    BaseRepository bs = new BaseRepository();
                   
                
                    return Ok(null, HttpStatusCode.OK, "Successfully GetAll");
                }
                else
                {
                    return Error(HttpStatusCode.NotAcceptable, ModelState);
                }
            }
            catch (Exception ex)
            {
                return Error(HttpStatusCode.NotAcceptable, ex.Message);
            }
        }
    }
}
