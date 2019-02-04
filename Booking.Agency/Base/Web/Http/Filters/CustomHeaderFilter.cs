using Booking.Agency.Models;
using Booking.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Security;
using System.Web.SessionState;

namespace Booking.Agency.Base.Web.Http.Filters
{
    public class CustomHeaderFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            var re = actionContext.Request;
            var headers = re.Headers;

            if (headers.Contains("UserId"))
            {
                HttpContext.Current.Session["UserId"] = headers.GetValues("UserId").First();
            }
            if (headers.Contains("DateFormat"))
            {
                HttpContext.Current.Session["DateFormat"] = headers.GetValues("DateFormat").First();
            }
            if (headers.Contains("TimeFormat"))
            {
                HttpContext.Current.Session["TimeFormat"] = headers.GetValues("TimeFormat").First();
            }
            if (headers.Contains("TimeZoneId"))
            {
                if (headers.GetValues("TimeZoneId").First() == "null")
                {
                    HttpContext.Current.Session["TimeZone"] = TimeZoneInfo.FindSystemTimeZoneById("UTC");
                }
                else
                {
                    HttpContext.Current.Session["TimeZone"] = TimeZoneInfo.FindSystemTimeZoneById(headers.GetValues("TimeZoneId").First());
                }
            }
            base.OnActionExecuting(actionContext);

        }
    }
}