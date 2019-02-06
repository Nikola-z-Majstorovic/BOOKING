using Booking.Agency.Base.Web.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Booking.Agency.Controllers
{
    public class FileUploadController : BaseApiController 
    {


        [System.Web.Http.HttpPost]
        public string UploadFiles()
        {

            var file = HttpContext.Current.Request.Files.Count > 0 ?
       HttpContext.Current.Request.Files[0] : null;


            if (file != null && file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
           
                              var path = Path.Combine("C:\\januar\\BookingAgency-12-25-2018\\BookingAgency\\Booking.Agency\\app\\resources\\css\\images\\AccomodationImages",

                    GetUserId().ToString() + fileName
                );

                file.SaveAs(path);
            }

            return "sadasda";
        }
	}
}