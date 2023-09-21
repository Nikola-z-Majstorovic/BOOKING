using Agent.Agency.Models;
using Agent.DataAccess;
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
            if (headers.Contains("X-File-Name-Acc"))
            {
                HttpContext.Current.Session["X-File-Name-Acc"] = headers.GetValues("X-File-Name-Acc").First();
            }
            base.OnActionExecuting(actionContext);

        }
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
        }
    }
}