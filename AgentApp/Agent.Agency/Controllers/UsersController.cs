using Agent.Agency.Models;
using Agent.Agency.Base.Web.Http;
using Agent.DataAccess;
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
using Agent.Agency.Base.Data;
using System.Web.Providers.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;


namespace Agent.Agency.Controllers
{
    public class UsersController : BaseApiController, IBaseActions
    {
        #region Custom Actions

        [System.Web.Http.HttpPost]
        [System.Web.Http.ActionName("login")]
        public HttpResponseMessage Login(dynamic model)
        {

            BaseRepository bs = new BaseRepository();
            BookingAgencyUser user = MapJsonToModelObject<BookingAgencyUser>(model, false);

            //Check if we have this user on our local aspnet_membership table
            bool isAuthenticared = Membership.ValidateUser(user.Username, user.Password);

            if (ModelState.IsValid)
            {

                //Contact master backend for checking user status
                MasterBService.MasterBackendServiceSoapClient client = new MasterBService.MasterBackendServiceSoapClient();
                string resultMessage = client.CheckIfAgentUserIsValid(user.Username, user.Password);

            if (resultMessage != "OK")
            {//User is not agent or creditalians are not valid or account has been disabled
                string[] errors = new string[] { "Access Denied", resultMessage };
                return Ok(false, HttpStatusCode.OK, "Access Denied", errors);
            }
            else
            {//Login here
                //Now check if we have this user on local db or its newly created user
                if (!isAuthenticared)
                {//create user because he doesnt exists on local db
                    
                    //get user from BookingAgencyUsers from backend master
                    var returnedAgent = client.ReturnAgentCreditelians(user.Username);

                    //map proxy soap class to our class
                    BookingAgencyUser userFromBackendBookingUsers = AutoMapper.Mapper.Map<BookingAgencyUser>(client.ReturnBookingAgent(user.Username)); 
                   
                    bs.CreateUser(userFromBackendBookingUsers);

                    MembershipCreateStatus status;
                    //create user in aspnet tables
                    MembershipUser newUser = Membership.CreateUser(user.Username, user.Password, userFromBackendBookingUsers.Email, "question", "answer", true, (object)userFromBackendBookingUsers.UserId, out status);
                    //Add the role
                    Roles.AddUserToRole(user.Username, "AgentUser");
                }

            }

                MembershipUser mu = Membership.GetUser(user.Username);
                //Authenticate user again just in case
                isAuthenticared = Membership.ValidateUser(user.Username, user.Password);
                
                if (isAuthenticared)
                {
                    bool rolesOk = false;
                    rolesOk = CreateUserSessions(user.Username, this.Request, Session);

                    if (rolesOk == true)
                    {

                        string[] messages = new string[] { "Successfully logged in", "Welcome to Agent Agency Application" };


                        //-----------------------------------------------------
                        BookingAgencyUser lm = new BookingAgencyUser();
                        lm = ((BookingAgencyUser)Session["User"]);

                        RolePrincipal r = (RolePrincipal)HttpContext.Current.User;
                        lm.Roles = Roles.GetRolesForUser(mu.UserName);


                        
                        foreach(string role in lm.Roles)
                        {
                            if(role == "AccomodationUser")
                            {
                                Roles.RemoveUserFromRole(user.Username, "AccomodationUser");

                                Roles.AddUserToRole(user.Username, "AgentUser");

                            }
                        }

                        lm.Roles = Roles.GetRolesForUser(mu.UserName);

                        Session["ln"] = lm;
                        //-----------------------------------------------------


                        return Ok(lm, HttpStatusCode.OK, "Success", messages);
                    }
                    else
                    {
                        string[] errors = new string[] { "Access Denied", "Your role does not allow Booking Agency access. Please contact your center administrator to get access to the Booking Agency." };
                        return Ok(false, HttpStatusCode.OK, "Access Denied", errors);
                    }
                }
                else
                {
                    string[] errors = new string[] { "Access Denied", "Wrong username or password" }; 
                    if (mu != null)
                    {
                        if (mu.IsApproved == false)
                        {
                            errors = new string[] { "Access Denied", "Your account has been disabled!" };
                            return Ok(false, HttpStatusCode.OK, "Access Denied", errors);
                        }
                    }                                                          
                    return Error(HttpStatusCode.Forbidden, "Access Denied", errors);
                }
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        public bool CreateUserSessions(string userName, HttpRequestMessage request, HttpSessionState session)
        {
            var user = Membership.GetUser(userName);
            MembershipUser ur = user;
            bool userIsApproved = false;

            BaseRepository bs = new BaseRepository();
    
            var guid = new Guid(user.ProviderUserKey.ToString());
            var dbUser = bs.GetUserForId(guid);
              
                
            string[] roles = System.Web.Security.Roles.GetRolesForUser(userName);

            session["User"] = dbUser;

            session["UserId"] = dbUser.UserId;

            userIsApproved = true;
   
            return userIsApproved;
        }
 
        [System.Web.Http.HttpPost]
        [System.Web.Http.ActionName("checksession")]
        public HttpResponseMessage Checksession()
        {
            string[] messages = new string[] { "Successfully logged out", "See you soon" };
            return Ok(null, HttpStatusCode.OK, "Success", messages);
        }
   
        [System.Web.Http.HttpPost]
        [System.Web.Http.ActionName("logout")]
        public HttpResponseMessage Logout()
        {
            if (ModelState.IsValid)
            {
                FormsAuthentication.SignOut();
                Session.Abandon();

                //HttpCookie currentUserCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
                //currentUserCookie.Expires = DateTime.Now.AddYears(-1);
                //currentUserCookie.Value = "";

                //HttpContext.Current.Response.Cookies.Add(currentUserCookie);

                string[] messages = new string[] { "Successfully logged out", "See you soon" };
                return Ok(null, HttpStatusCode.OK, "Success", messages);
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }


        #endregion


        #region IBaseActions - Default CRUD Actions

        [System.Web.Http.HttpGet]
        public HttpResponseMessage GetAll()
        {
            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();

                //Refresh reservations
                MasterBService.MasterBackendServiceSoapClient client = new MasterBService.MasterBackendServiceSoapClient();
                MasterBService.BookingAgencyUser[] usersFromMB = client.GetAllAccomodationUsers();

                List<BookingAgencyUser> freshUsers = AutoMapper.Mapper.Map<MasterBService.BookingAgencyUser[], List<BookingAgencyUser>>(usersFromMB);

                // bs.RefreshReservationsTable(freshReservations);

                List<BookingAgencyUser> localUserList = bs.GetAllLocalUsers(); //local users

                List<BookingAgencyUser> newUsersList = new List<BookingAgencyUser>();

                foreach (BookingAgencyUser freshUser in freshUsers)
                {
                    if (!localUserList.Any(u => u.UserId == freshUser.UserId))
                    {
                        if (!newUsersList.Contains(freshUser))
                        {
                            newUsersList.Add(freshUser);
                        }
                    }
                }

                List<BookingAgencyUser> userList = bs.GetAllLocalUsers(); //Again return all users, maybe there is some new user added

                return Ok(userList, HttpStatusCode.OK, "Successfully GetAll");
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

                BookingAgencyUser user = bs.GetUserForId(objId);
                return Ok(user, HttpStatusCode.OK, "Successfully Loaded");
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
                return Ok(null, HttpStatusCode.OK, "Successfully deleted");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        #endregion

    }
}
