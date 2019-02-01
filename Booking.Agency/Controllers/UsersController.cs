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
    public class UsersController : BaseApiController, IBaseActions
    {
        #region Custom Actions
 
        [System.Web.Http.HttpPost]
        [System.Web.Http.ActionName("register")]
        public HttpResponseMessage Register(dynamic model)
        {
             BookingAgencyUser user = MapJsonToModelObject<BookingAgencyUser>(model, false);

             try
             {
                 MembershipUser newUser = Membership.CreateUser(user.Username, user.Password, user.Email);

                 //Roles.CreateRole("AccomodationUser");
                 //Roles.CreateRole("AdminUser");
                 //Roles.CreateRole("AgentUser");

                 if (newUser.UserName != null)
                 {
                     
                     Roles.AddUserToRole(newUser.UserName, "AccomodationUser");
                     BaseRepository bs = new BaseRepository();
                     user.UserId = (Guid)newUser.ProviderUserKey;
                     bs.CreateUser(user);

                     string[] messages = new string[] { "Successfully Registered", "You can now login in Booking Agency" };
                     return Ok(false, HttpStatusCode.OK, "Successfully Registered", messages);
                 }
                 else
                 {
                     string[] errors = new string[] { "Registration Failed", "Please check your inputs or contact Administrator" };
                     return Ok(false, HttpStatusCode.OK, "Registration Failed", errors);
                 }
             }
             catch (Exception ex)
             {
                 string[] errors = new string[] { "Registration Failed", ex.Message };
                 return Ok(false, HttpStatusCode.OK, "Registration Failed", errors);
             }

        }
 
        [System.Web.Http.HttpPost]
        [System.Web.Http.ActionName("login")]
        public HttpResponseMessage Login(dynamic model)
        {
            BookingAgencyUser user = MapJsonToModelObject<BookingAgencyUser>(model, false);

            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();


                bool isAuthenticared = Membership.ValidateUser(user.Username, user.Password);
                MembershipUser mu = Membership.GetUser(user.Username);
                
                
                if (isAuthenticared)
                {
                    bool rolesOk = false;
                    rolesOk = CreateUserSessions(user.Username, this.Request, Session);

                    if (rolesOk == true)
                    {

                        FormsAuthentication.SetAuthCookie(user.Username, true);
                        Session.Timeout = Convert.ToInt32(FormsAuthentication.Timeout.TotalMinutes);
                        string[] messages = new string[] { "Successfully logged in", "Welcome to Booking Agency Application" };


                        //-----------------------------------------------------
                        BookingAgencyUser lm = new BookingAgencyUser();
                        lm = ((BookingAgencyUser)Session["User"]);

                        RolePrincipal r = (RolePrincipal)HttpContext.Current.User;
                        lm.Roles = Roles.GetRolesForUser(mu.UserName);

                        //if (lm.Roles.Length == 0)
                        //{//This is for some users who doesnt have roles
                        //    string[] errors = new string[] { "Access Denied", "Your role does not allow Booking Agency access. Please contact your center administrator to get access to the Booking Agency." };
                        //    return Ok(false, HttpStatusCode.OK, "Access Denied", errors);
                        //}

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
            var dbUser = bs.GetUserForId(guid);//   context.BookingAgencyUsers.FirstOrDefault(u => u.UserId == guid);
              
                
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

                HttpCookie currentUserCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
                currentUserCookie.Expires = DateTime.Now.AddYears(-1);
                currentUserCookie.Value = "";

                HttpContext.Current.Response.Cookies.Add(currentUserCookie);

                string[] messages = new string[] { "Successfully logged out", "See you soon" };
                return Ok(null, HttpStatusCode.OK, "Success", messages);
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        [System.Web.Http.HttpPut]
        public HttpResponseMessage changeUserToAgent(dynamic model)
        {
            BookingAgencyUser user = MapJsonToModelObject<BookingAgencyUser>(model, false);
            if (ModelState.IsValid)
            {
                Roles.RemoveUserFromRole(user.Username, "AccomodationUser");

                Roles.AddUserToRole(user.Username, "AgentUser");

                BaseRepository bs = new BaseRepository();
                //We are updating user in BookingAgencyUsers table to save PIB for newly Agent
                bs.UpdateUser(user);

                List<BookingAgencyUser> userList = bs.GetAllUsers();

                userList.ForEach(u => u.Roles = Roles.GetRolesForUser(u.Username));

                return Ok(userList, HttpStatusCode.OK, "Successfully updated");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        [System.Web.Http.HttpPut]
        public HttpResponseMessage LockUser(dynamic model)
        {
            BookingAgencyUser user = MapJsonToModelObject<BookingAgencyUser>(model, false);
            if (ModelState.IsValid)
            {
                MembershipUser membershipUser = Membership.GetUser(user.UserId);
                membershipUser.IsApproved = false;
                Membership.UpdateUser(membershipUser);

                BaseRepository bs = new BaseRepository();

                List<BookingAgencyUser> userList = bs.GetAllUsers();

                //Include user roles from asp tables
                userList.ForEach(u => u.Roles = Roles.GetRolesForUser(u.Username));
                //Include user approve status from asp tables
                userList.ForEach(u => u.IsUserApproved = Membership.GetUser(u.UserId).IsApproved);//if false is returned, that means user is disabled

                return Ok(userList, HttpStatusCode.OK, "Successfully updated");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        [System.Web.Http.HttpPut]
        public HttpResponseMessage UnockUser(dynamic model)
        {
            BookingAgencyUser user = MapJsonToModelObject<BookingAgencyUser>(model, false);
            if (ModelState.IsValid)
            {
                MembershipUser membershipUser = Membership.GetUser(user.UserId);
                membershipUser.IsApproved = true;
                Membership.UpdateUser(membershipUser);

                BaseRepository bs = new BaseRepository();

                List<BookingAgencyUser> userList = bs.GetAllUsers();

                //Include user roles from asp tables
                userList.ForEach(u => u.Roles = Roles.GetRolesForUser(u.Username));
                //Include user approve status from asp tables
                userList.ForEach(u => u.IsUserApproved = Membership.GetUser(u.UserId).IsApproved);//if false is returned, that means user is disabled

                return Ok(userList, HttpStatusCode.OK, "Successfully updated");
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
                List<BookingAgencyUser> userList = bs.GetAllUsers();

                //Include user roles from asp tables
                userList.ForEach(u => u.Roles = Roles.GetRolesForUser(u.Username));
                //Include user approve status from asp tables
                userList.ForEach(u => u.IsUserApproved = Membership.GetUser(u.UserId).IsApproved); //if false is returned, that means user is disabled
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
