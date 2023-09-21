using Agent.DataAccess;
using AutoMapper;
using Booking.Agency.Base.Web.Http.Filters;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.SessionState;


namespace Agent.Agency
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            //GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;
            //GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);

            AreaRegistration.RegisterAllAreas();
            
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            GlobalConfiguration.Configuration.Filters.Add(new CustomHeaderFilter());

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<MasterBService.BookingAgencyUser, BookingAgencyUser>();
                cfg.CreateMap<Accomodation, MasterBService.Accomodation>();
                cfg.CreateMap<MasterBService.Comment, Comment>();
                cfg.CreateMap<MasterBService.Rating, Rating>();
                cfg.CreateMap<MasterBService.Reservation, Reservation>();
                cfg.CreateMap<MasterBService.SentMessage, SentMessage>();
                cfg.CreateMap<Reservation, MasterBService.Reservation>();
                cfg.CreateMap<SentMessage, MasterBService.SentMessage>();
                cfg.CreateMap<AccomodationImage, MasterBService.AccomodationImage>();
            });

        }
        // added for enabling sessions
        public override void Init()
        {
            this.PostAuthenticateRequest += MvcApplication_PostAuthenticateRequest;
            base.Init();
        }
        // added for enabling sessions
        void MvcApplication_PostAuthenticateRequest(object sender, EventArgs e)
        {
            System.Web.HttpContext.Current.SetSessionStateBehavior(
                SessionStateBehavior.Required);
        }

    }
}