using Agent.Agency;
using Agent.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using Newtonsoft.Json;
using Agent.Agency.Models;
using System.Text;
using System.Web;
using System.Web.Http.Filters;
using Agent.Agency.Base.Web.Http;
using Agent.Agency.Base.Data;



namespace Agent.Agency.Controllers
{
    public class ReservationsController : BaseApiController, IBaseActions
    {

        [System.Web.Http.HttpGet]
        public HttpResponseMessage GetAll()
        {
            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();


                //Refresh reservations
                MasterBService.MasterBackendServiceSoapClient client = new MasterBService.MasterBackendServiceSoapClient();
                MasterBService.Reservation[] reservationListFromMB = client.GetReservationsForOwnerId(GetUserId());

                List<Reservation> freshReservations = AutoMapper.Mapper.Map<MasterBService.Reservation[], List<Reservation>>(reservationListFromMB);

                // bs.RefreshReservationsTable(freshReservations);





                List<Reservation> localReservations = bs.GetAllReservations(); //we are returning all reservations, because on local db Agent will have only his accomodation reservations.

                List<Reservation> newReservationsList = new List<Reservation>();

                foreach (Reservation freshReservation in freshReservations)
                {
                    if (!localReservations.Any(res => res.Id == freshReservation.Id))
                    {
                        if (!newReservationsList.Contains(freshReservation))
                        {
                            newReservationsList.Add(freshReservation);
                        }
                    }
                }

                if (newReservationsList.Count > 0)//Only call db if there is a new reservation
                {
                    bs.RefreshReservationsTable(freshReservations);
                }

                //Refresh SentMessages
                MasterBService.SentMessage[] sentMessageListFromMB = client.GetSentMessagesForOwnerId(GetUserId());

                List<SentMessage> freshSentMessages = AutoMapper.Mapper.Map<MasterBService.SentMessage[], List<SentMessage>>(sentMessageListFromMB);

                bs.RefreshMessagesTable(freshSentMessages);

                List<Reservation> reservationsList = bs.GetAllReservations(); //Again return all reservations, maybe there is some new reservation/messages added
                List<Reservation> reservationListFiltered = new List<Reservation>();

                List<AccomodationOwner> ownersAccomodations = bs.GetAccomodationsForSelectedUser(GetUserId());

                foreach (Reservation checkReservation in reservationsList)
                {
                    if (ownersAccomodations.Any(ac => ac.AccomodationId == checkReservation.AccomodationId))
                    {
                       
                        if (!reservationListFiltered.Contains(checkReservation))
                        {
                            reservationListFiltered.Add(checkReservation);
                        }
                    }
                }

                return Ok(reservationListFiltered, HttpStatusCode.OK, "Successfully GetAll");
                //return Ok(reservationsList, HttpStatusCode.OK, "Successfully GetAll");
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
