using Agent.Agency.Models;
using Agent.DataAccess;
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

namespace Agent.Agency.Base.Data
{
    public class BaseRepository
    {
        #region Constructors
        public BaseRepository()
        {

        }
        #endregion

        #region Users


        public BookingAgencyUser GetUserForId(Guid userId)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.BookingAgencyUsers.Where(u => u.UserId == userId).Single();
            }
        }
        public void CreateUser(BookingAgencyUser user)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.BookingAgencyUsers.Attach(user);

                context.Entry(user).State = EntityState.Added;

                context.SaveChanges();
            }
        }

        public List<BookingAgencyUser> GetAllUsers()
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;

                Guid adminUserId = GetUserId();
                return context.BookingAgencyUsers.Where(u => u.UserId != adminUserId).ToList();
            }
        }

        public List<BookingAgencyUser> GetAllLocalUsers()
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
               
                return context.BookingAgencyUsers.ToList();
            }
        }

        public Guid GetUserId()
        {
            if (HttpContext.Current.Session["UserId"] != null)
            {
                return new Guid(HttpContext.Current.Session["UserId"].ToString());
            }
            else
            {
                throw new Exception("Error!");
            }
        }

        public void UpdateUser(BookingAgencyUser user)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                var ExistingUser = context.BookingAgencyUsers.Where(u => u.UserId == user.UserId).Single();
                context.Entry(ExistingUser).CurrentValues.SetValues(user);
                context.SaveChanges();
            }
        }
        
        #endregion

        #region Accomodations

        public List<AccomodationOwner> GetAccomodationsForSelectedUser(Guid OwnerId)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.AccomodationOwners.Include(a => a.Accomodation).Where(a => a.OwnerId == OwnerId).ToList();
            }
            
        }
        
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

        public List<Accomodation> GetAccomodationsForSelectedLocation(int LocationId)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.Accomodations.Where(a => a.Location == LocationId).Include(a => a.Ratings).Include(a => a.AccomodationImages).ToList();
            }
        }

        public Accomodation GetSelectedAccomodation(Guid AccomodationId)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.Accomodations.Include(a => a.Reservations).Include(a => a.Ratings).Include(a => a.Comments.Select(bu => bu.BookingAgencyUser)).FirstOrDefault(a => a.AccomodationId == AccomodationId);
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

        public void CreateAccomodation(Accomodation accomodation)
        {
            using (var context = new BookingAgencyEntities())
            {                
                //context.Configuration.ProxyCreationEnabled = false;

                context.Accomodations.Attach(accomodation);

                context.Entry(accomodation).State = EntityState.Added;

                context.SaveChanges();
            }
        }

        public void AssingAccomodationOwner(Guid userId, Guid accomodationId)
        {
            using (var context = new BookingAgencyEntities())
            {

                AccomodationOwner owner = new AccomodationOwner();

                owner.AccomodationId = accomodationId;
                owner.OwnerId = userId;

                context.AccomodationOwners.Attach(owner);

                context.Entry(owner).State = EntityState.Added;

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

        public void UpdateMessage(SentMessage message)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                var ExistingMessage = context.SentMessages.Where(a => a.Id == message.Id).Single();
                context.Entry(ExistingMessage).CurrentValues.SetValues(message);
                context.SaveChanges();
            }
        }


        public void RefreshMessagesTable(List<SentMessage> FreshSentMessages)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                context.Database.ExecuteSqlCommand("TRUNCATE TABLE [SentMessages]");//Delete all records from table
                foreach (SentMessage message in FreshSentMessages)
                {
                    context.SentMessages.Attach(message);

                    context.Entry(message).State = EntityState.Added;

                    context.SaveChanges();
                }
            }
        }

        //public List<SentMessage> GetSentMessagesForAccomodationId(Guid AccomodationId)
        //{
        //    using (var context = new BookingAgencyEntities())
        //    {
        //        return context.SentMessages.Where(m => m.AccomodationId == AccomodationId).ToList();                                
        //    }
        //}

        //public List<ReceivedMessage> GetReceivedMessagesForReceiverId(Guid UserId)
        //{
        //    using (var context = new BookingAgencyEntities())
        //    {
        //        return context.ReceivedMessages.Where(m => m.ReceiverId == UserId).ToList();
        //    }
        //}
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


        public List<Comment> GetAllCommentsForSelectedAccomodation(Guid AccomodationId)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;

                return context.Comments.OrderByDescending(c => c.CommentDate).Include(c => c.BookingAgencyUser).Where(c => c.AccomodationId == AccomodationId).ToList();
            }
        }

        public List<Comment> GetAllComments()
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.Comments.OrderByDescending(c => c.CommentDate).Include(c => c.BookingAgencyUser).Include(c => c.Accomodation).ToList();
            }
        }

        public void RefreshCommentsTable(List<Comment> FreshComments)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                context.Database.ExecuteSqlCommand("TRUNCATE TABLE [Comments]");//Delete all records from table
                foreach (Comment comment in FreshComments)
                {
                    context.Comments.Attach(comment);

                    context.Entry(comment).State = EntityState.Added;

                    context.SaveChanges();
                }
            }
        }

        public List<Comment> GetAllNotApprovedComments()
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.Comments.OrderByDescending(c => c.CommentDate).Include(c => c.BookingAgencyUser).Include(c => c.Accomodation).Where(c => c.Approved == 0).ToList();
            }
        }

        public Comment GetSelectedComment(int CommentId)
        {
            using (var context = new BookingAgencyEntities())
            {
                return context.Comments.Where(c => c.Id == CommentId).Single();
            }
        }
        
        #endregion

        #region Reservations

        public void UpdateReservation(Reservation reservation)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                var ExistingReservation = context.Reservations.Where(u => u.Id == reservation.Id).Single();
                context.Entry(ExistingReservation).CurrentValues.SetValues(reservation);
                context.SaveChanges();
            }
        }

        public void CreateReservation(Reservation reservation)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Reservations.Attach(reservation);

                context.Entry(reservation).State = EntityState.Added;

                context.SaveChanges();
            }
        }

        public List<Reservation> GetAllReservations()
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.Reservations.Include(m => m.SentMessages.Select(sm => sm.BookingAgencyUser)).Include(m => m.BookingAgencyUser).Include(m => m.Accomodation).ToList();
                //return context.Reservations.ToList();
            }
        }

        public List<Reservation> GetAllReservationsForAccomodationId(Guid AccomodationId)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.Reservations.Where(r => r.AccomodationId == AccomodationId).ToList();
            }
        }

        public List<Reservation> GetAllReservationsForUserId(Guid UserId)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.Reservations.Include(m => m.SentMessages.Select(sm => sm.BookingAgencyUser)).Include(m => m.BookingAgencyUser).Include(m => m.Accomodation).Where(r => r.UserId == UserId).ToList();
            }
        }


        public void RefreshReservationsTable(List<Reservation> FreshReservations)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                //context.Database.ExecuteSqlCommand("TRUNCATE TABLE [Reservations]");//Delete all records from table
                foreach (Reservation reservation in FreshReservations)
                {
                    context.Reservations.Attach(reservation);

                    context.Entry(reservation).State = EntityState.Added;

                    context.SaveChanges();
                }
            }
        }

        #endregion

        #region Locations
        public List<TravelLocation> GetAllLocations()
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.TravelLocations.Include(a => a.Accomodations).ToList();
            }
        }

        public TravelLocation GetSelectedLocation(int LocationId)
        {
            using (var context = new BookingAgencyEntities())
            {
                return context.TravelLocations.Where(l => l.Id == LocationId).Single();
            }
        }
        
        #endregion

        #region Rating

        public void RateAccomodation(Rating rate)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Ratings.Attach(rate);

                context.Entry(rate).State = EntityState.Added;

                context.SaveChanges();
            }
        }


        public List<Rating> GetRatingsForAccomodationId(Guid AccomodationId)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.Ratings.Where(r => r.AccomodationId == AccomodationId).ToList();
            }
        }

        

        public void RefreshRatingsTable(List<Rating> FreshRatings)
        {
            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                context.Database.ExecuteSqlCommand("TRUNCATE TABLE [Rating]");//Delete all records from table
                foreach (Rating rating in FreshRatings)
                {
                    context.Ratings.Attach(rating);

                    context.Entry(rating).State = EntityState.Added;

                    context.SaveChanges();
                }
            }
        }

        public AccomodationImage SaveImageForAccomodation(string AccomodationId, string FileName)
        {

            AccomodationImage ai = new AccomodationImage();
            ai.ImageId = Guid.NewGuid();
            ai.AccomodationId = new Guid(AccomodationId);
            ai.ImageName = FileName;

            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;

                context.AccomodationImages.Attach(ai);

                context.Entry(ai).State = EntityState.Added;

                context.SaveChanges();
            }
            return ai;
        }
        #endregion

    }
}