using Booking.Agency.Base.Data;
using Booking.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.Services;

namespace Booking.Agency
{
    /// <summary>
    /// Summary description for MasterBackendService
    /// </summary>
    [WebService(Namespace = "http://bookingagency.com/webservices")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class MasterBackendService : System.Web.Services.WebService
    {

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }



        [WebMethod]
        public string CheckIfAgentUserIsValid(string Username, string Password)
        {

            bool isAuthenticared = Membership.ValidateUser(Username, Password);
            MembershipUser mu = Membership.GetUser(Username);


            if (!isAuthenticared)
            {
                return "Wrong username or password";
            }

            if (mu != null)
            {
                if (mu.IsApproved == false)
                {
                    return "Your account has been disabled!";
                }
                else
                {
                    string[] rolesArray = Roles.GetRolesForUser(mu.UserName);

                    if (!rolesArray.Contains("AgentUser"))
                    {
                        return "Your account is not Agent User anymore, you cant login!";
                    }
                }
            }

            return "OK";
        }


        [WebMethod]
        public MembershipUser ReturnAgentCreditelians(string Username)
        {
            MembershipUser mu = Membership.GetUser(Username);

            return Membership.GetUser(Username);
        }

        [WebMethod]
        public Guid ReturnAgentId(string Username)
        {
            MembershipUser mu = Membership.GetUser(Username);

            BaseRepository bs = new BaseRepository();

            return (Guid)Membership.GetUser(Username).ProviderUserKey;
        }


        [WebMethod]
        public BookingAgencyUser ReturnBookingAgent(string Username)
        {


            using (var context = new BookingAgencyEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.BookingAgencyUsers.Where(u => u.Username == Username).Single();
            }
    
        }
        
        [WebMethod]
        public void UpdateMessageAsSeen(SentMessage UpdateMessageAsSeen)
        {
            BaseRepository bs = new BaseRepository();

            bs.UpdateMessage(UpdateMessageAsSeen);
        }

        [WebMethod]
        public void SendMessageFromAgent(SentMessage message)
        {
            BaseRepository bs = new BaseRepository();

            bs.SendMessage(message);
        }

        [WebMethod]
        public void CreateReservationFromAgent(Reservation reservation)
        {
            BaseRepository bs = new BaseRepository();

            bs.CreateReservation(reservation);
        }

        [WebMethod]
        public void CreateAccomodationAndAssignOwner(Accomodation accomodation, Guid ownerId)
        {
            BaseRepository bs = new BaseRepository();

            bs.CreateAccomodation(accomodation);
            bs.AssingAccomodationOwner(ownerId, accomodation.AccomodationId);
        }

        [WebMethod]
        public void UpdateAccomodation(Accomodation accomodation)
        {
            BaseRepository bs = new BaseRepository();

            bs.UpdateAccomodation(accomodation);
        }

        [WebMethod]
        public List<Comment> GetCommentsForOwnerId(Guid ownerId)
        {
            BaseRepository bs = new BaseRepository();

            return bs.GetCommentsForOwnerId(ownerId);
        }

        [WebMethod]
        public List<Reservation> GetReservationsForOwnerId(Guid ownerId)
        {
            BaseRepository bs = new BaseRepository();

            return bs.GetReservationsForOwnerId(ownerId);
        }

        [WebMethod]
        public List<SentMessage> GetSentMessagesForOwnerId(Guid ownerId)
        {
            BaseRepository bs = new BaseRepository();

            return bs.GetSentMessagesForOwnerId(ownerId);
        }

        [WebMethod]
        public List<Rating> GetRatingsForOwnerAccomodations(Guid ownerId)
        {
            BaseRepository bs = new BaseRepository();

            return bs.GetRatingsForOwnerAccomodations(ownerId);
        }

        [WebMethod]
        public List<BookingAgencyUser> GetAllAccomodationUsers()
        {
            BaseRepository bs = new BaseRepository();

            return bs.GetAllApprovedAccomodationUsers();
        }
        
        
    }
}
