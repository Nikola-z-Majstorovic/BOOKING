using Booking.Agency.Models;
using Booking.DataAccess;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Data.Entity.Infrastructure;
using System.Data;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Reflection;

namespace Booking.Agency.Base.Data
{
    public class BaseRepository
    {
        #region Constructors
        public BaseRepository()
        {

        }
        #endregion


        #region Users
        public void CreateUser(BookingAgencyUser user)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.BookingAgencyUsers.Attach(user);

                context.Entry(user).State = EntityState.Added;

                context.SaveChanges();
            }
        }
        #endregion


        #region Accomodations
        public List<Accomodation> GetAllAccomodations()
        {
            using (var context = new BookingAgencyEntities())
            {
                return context.Accomodations.ToList();
            }
        }

        public List<Accomodation> GetAccomodationsForSelectedType(int AccomodationType)
        {
            using (var context = new BookingAgencyEntities())
            {
                return context.Accomodations.Where(a => a.Type == AccomodationType).ToList();
            }
        }

        public List<Accomodation> GetAccomodationsForSelectedLocation(string AccomodationLocation)
        {
            using (var context = new BookingAgencyEntities())
            {
                return context.Accomodations.Where(a => a.Location == AccomodationLocation).ToList();
            }
        }

        public Accomodation GetSelectedAccomodation(Guid AccomodationId)
        {
            using (var context = new BookingAgencyEntities())
            {
                return context.Accomodations.FirstOrDefault(a => a.AccomodationId == AccomodationId);
            }
        }

        public void UpdateAccomodation(Accomodation Accomodation)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                var ExistingAccomodation = context.Accomodations.Where(a => a.AccomodationId == Accomodation.AccomodationId).Single();
                context.Entry(ExistingAccomodation).CurrentValues.SetValues(Accomodation);
                context.SaveChanges();
            }
        }

        public void DeleteAccomodation(Guid AccomodationId)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                var ExistingAccomodation = context.Accomodations.Where(a => a.AccomodationId == AccomodationId).Single();
                context.Accomodations.Attach(ExistingAccomodation);
                context.Accomodations.Remove(ExistingAccomodation);
                context.SaveChanges();
            }
        }
        #endregion 
       
        #region Messages
        public void SendMessage(SentMessage message)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.SentMessages.Attach(message);

                context.Entry(message).State = EntityState.Added;

                context.SaveChanges();
            }
        }

        public List<SentMessage> GetSentMessagesForAccomodationId(Guid AccomodationId)
        {
            using (var context = new BookingAgencyEntities())
            {
                return context.SentMessages.Where(m => m.AccomodationId == AccomodationId).ToList();                                
            }
        }

        public List<ReceivedMessage> GetReceivedMessagesForReceiverId(Guid UserId)
        {
            using (var context = new BookingAgencyEntities())
            {
                return context.ReceivedMessages.Where(m => m.ReceiverId == UserId).ToList();
            }
        }
        #endregion

        #region Comments
        public void CreateComment(Comment Comment)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Comments.Attach(Comment);

                context.Entry(Comment).State = EntityState.Added;

                context.SaveChanges();
            }
        }

        public void ApproveComment(Comment Comment)
        {
            using (var context = new BookingAgencyEntities())
            {

                context.Configuration.ProxyCreationEnabled = false;
                var ExistingComment = context.Comments.Where(c => c.Id == Comment.Id).Single();
                context.Entry(ExistingComment).CurrentValues.SetValues(Comment);
                context.SaveChanges();
            }
        }

        public void DeleteComment(int CommentId)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                var ExistingComment = context.Comments.Where(c => c.Id == CommentId).Single();
                context.Comments.Attach(ExistingComment);
                context.Comments.Remove(ExistingComment);
                context.SaveChanges();
            }
        }

        public List<Comment> GetAllComments()
        {
            using (var context = new BookingAgencyEntities())
            {
                return context.Comments.ToList();
            }
        }

        public Comment GetAllCommentsForSelectedAccomodation(Guid AccomodationId)
        {
            using (var context = new BookingAgencyEntities())
            {
                return context.Comments.Where(c => c.AccomodationId == AccomodationId).Single();
            }
        }
        #endregion

        #region Reservations
        //public List<Reservation> GetAllReservations()
        //{
        //    using (var context = new BookingAgencyEntities())
        //    {
        //        return context.Reservations.ToList();
        //    }
        //}

        //public List<Reservation> GetAllReservationsForAccomodationId(Guid AccomodationId)
        //{
        //    using (var context = new BookingAgencyEntities())
        //    {
        //        return context.Reservations.Where(r => r.AccomodationId == AccomodationId).ToList();
        //    }
        //}

        //public List<Reservation> GetAllReservationsForUserId(Guid UserId)
        //{
        //    using (var context = new BookingAgencyEntities())
        //    {
        //        return context.Reservations.Where(r => r.UserId == UserId).ToList();
        //    }
        //}
        #endregion
    }
}