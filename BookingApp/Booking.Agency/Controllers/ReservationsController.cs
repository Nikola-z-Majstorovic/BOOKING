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
    public class ReservationsController : BaseApiController, IBaseActions
    {

        [System.Web.Http.HttpGet]
        public HttpResponseMessage GetAll()
        {
            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();
                //List<Reservation> reservationsList = bs.GetAllReservations();
                List<Reservation> reservationsList = bs.GetAllReservationsForUserId(GetUserId());


                //reservationsList.ForEach(u => u.Roles = Roles.GetRolesForUser(u.Username));
                return Ok(reservationsList, HttpStatusCode.OK, "Successfully GetAll");
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

                List<Reservation> reservationsList = bs.GetAllReservationsForAccomodationId(objId);
                return Ok(reservationsList, HttpStatusCode.OK, "Successfully GetAll");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        [System.Web.Http.HttpPost]
        public HttpResponseMessage Create(dynamic model)
        {
            Reservation reservation = MapJsonToModelObject<Reservation>(model, false);

            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();
                reservation.Id = Guid.NewGuid();
                bs.CreateReservation(reservation);

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
            if (ModelState.IsValid)
            {
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
             
                return Ok(null, HttpStatusCode.OK, "Successfully deleted");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        #region custom actions
   
        [System.Web.Http.HttpPut]
        public HttpResponseMessage ConsumeReservationComment(dynamic model)
        {
            Reservation reservation = MapJsonToModelObject<Reservation>(model, false);

            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();
                reservation.CommentConsumed = true;
                bs.UpdateReservation(reservation);
                List<Reservation> reservationsList = bs.GetAllReservationsForUserId(GetUserId());
                string[] messages = new string[] { "Comment Successfully Posted", "Please wait for Administrator to approve your comment" };
                return Ok(reservationsList, HttpStatusCode.OK, "Successfully updated", messages);
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        [System.Web.Http.HttpPut]
        public HttpResponseMessage ConsumeReservationRating(dynamic model)
        {
            Reservation reservation = MapJsonToModelObject<Reservation>(model, false);

            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();
                reservation.RatingConsumed = true;
                bs.UpdateReservation(reservation);
                List<Reservation> reservationsList = bs.GetAllReservationsForUserId(GetUserId());
                string[] messages = new string[] { "Successfully Rated", "Your rating has been added for this accomodation" };
                return Ok(reservationsList, HttpStatusCode.OK, "Successfully updated", messages);
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }


        [System.Web.Http.HttpPut]
        public HttpResponseMessage RateAccomodation(dynamic model)
        {
            Rating rating = MapJsonToModelObject<Rating>(model, false);

            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();

                bs.RateAccomodation(rating);
                return Ok(null, HttpStatusCode.OK, "Successfully updated");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }
        #endregion
    }
}
