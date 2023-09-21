using Booking.Agency.Models;
using Booking.Agency.Base.Web.Http;
using Booking.DataAccess;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Profile;
using System.Web.Security;
using System.Web.SessionState;
using Booking.Agency.Base.Data;
using System.Web.Providers.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;


namespace Booking.Agency.Controllers
{
    public class LocationsController : BaseApiController, IBaseActions
    {        
        #region IBaseActions - Default CRUD Actions
         

        [System.Web.Http.HttpGet]
        public HttpResponseMessage GetAll()
        {
            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();
                List<TravelLocation> locationsList = bs.GetAllLocations();
                string[] messages = new string[] { "Successfully locations loaded", "Successfully locations loaded and listed" };
                return Ok(locationsList, HttpStatusCode.OK, "Successfully GetAll", messages);
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        [System.Web.Http.HttpGet]
        public HttpResponseMessage Get(Guid objId)
        {
            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();

                
                return Ok(null, HttpStatusCode.OK, "Successfully Get");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        [System.Web.Http.HttpPost]
        public HttpResponseMessage Create(dynamic model)
        {
            if (ModelState.IsValid)
            {
                return Ok(null, HttpStatusCode.OK, "Successfully created");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }
     
        [System.Web.Http.HttpPut]
        public HttpResponseMessage Update(dynamic model)
        {
            Accomodation accomodation = MapJsonToModelObject<Accomodation>(model, false);

            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();

                bs.UpdateAccomodation(accomodation);
                return Ok(null, HttpStatusCode.OK, "Successfully updated");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        [System.Web.Http.HttpDelete]
        public HttpResponseMessage Delete(Guid objId)
        {
            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();
                bs.DeleteAccomodation(objId);
                return Ok(null, HttpStatusCode.OK, "Successfully deleted");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        #endregion

        #region Custom Actions

      

        #endregion
    }
}
