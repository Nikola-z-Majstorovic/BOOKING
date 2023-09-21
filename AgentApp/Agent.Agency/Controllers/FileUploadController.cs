using Agent.Agency.Base.Data;
using Agent.Agency.Base.Web.Http;
using Agent.DataAccess;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Agent.Agency.Controllers
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

                var pathAgent = Path.Combine("C:\\januar\\AgentBookingApp-12-25-2018\\AgentBookingApp\\Agent.Agency\\app\\resources\\css\\images\\AccomodationImages",

                 // Guid.NewGuid().ToString() + 
                    Session["X-File-Name-Acc"].ToString() + fileName
                );

                file.SaveAs(pathAgent);
     
                  var pathBooking = Path.Combine("C:\\januar\\BookingAgency-12-25-2018\\BookingAgency\\Booking.Agency\\app\\resources\\css\\images\\AccomodationImages",

                    Session["X-File-Name-Acc"].ToString() + fileName
                );

                file.SaveAs(pathBooking);

                BaseRepository bs = new BaseRepository();
                AccomodationImage localAI = bs.SaveImageForAccomodation(Session["X-File-Name-Acc"].ToString(), Session["X-File-Name-Acc"].ToString() + fileName);
            
                MasterBService.AccomodationImage backendImage = AutoMapper.Mapper.Map<MasterBService.AccomodationImage>(localAI);
                MasterBService.MasterBackendServiceSoapClient client = new MasterBService.MasterBackendServiceSoapClient();
                client.SaveImageForAccomodation(backendImage);
            }




            return "sadasda";
        }
    }
}