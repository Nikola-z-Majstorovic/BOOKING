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
    public class CommentsController : BaseApiController, IBaseActions
    {

        #region Custom Actions
        [System.Web.Http.HttpGet]
        public HttpResponseMessage GetSelectedComment(int objId)
        {
            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();

                Comment comment = bs.GetSelectedComment(objId);
                return Ok(comment, HttpStatusCode.OK, "Successfully Get");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        [System.Web.Http.HttpGet]
        public HttpResponseMessage DeleteSelectedComment(int objId)
        {
            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();

                bs.DeleteComment(objId);
                List<Comment> commentsList = bs.GetAllComments();
                return Ok(commentsList, HttpStatusCode.OK, "Successfully Get");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        /// <summary>
        /// Get single object
        /// </summary>
        /// <param name="id">UniqueId to get</param>
        /// <returns>HttpResponseMessage - Json</returns>
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
         #endregion
        /// <summary>
        /// Get all objects
        /// </summary>
        /// <returns>HttpResponseMessage - Json</returns>
        [System.Web.Http.HttpGet]
        public HttpResponseMessage GetAll()
        {
            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();
                List<Comment> commentsList = bs.GetAllNotApprovedComments();
                return Ok(commentsList, HttpStatusCode.OK, "Successfully GetAll");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }


        /// <summary>
        /// Create new object
        /// </summary>
        /// <param name="item">Object model to create</param>
        /// <returns>HttpResponseMessage - Json</returns>
        [System.Web.Http.HttpPost]
        public HttpResponseMessage Create(dynamic model)
        {
            Comment comment = MapJsonToModelObject<Comment>(model, false);

            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();

                bs.CreateComment(comment);
                
                return Ok(null, HttpStatusCode.OK, "Successfully created");
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        /// <summary>
        /// Update object
        /// </summary>
        /// <param name="item">Object/Model to update</param>
        /// <returns>HttpResponseMessage - Json</returns>       
        [System.Web.Http.HttpPut]
        public HttpResponseMessage Update(dynamic model)
        {
            Comment comment = MapJsonToModelObject<Comment>(model, false);

            if (ModelState.IsValid)
            {
                BaseRepository bs = new BaseRepository();
                comment.Approved = 1;
                bs.ApproveComment(comment);
                List<Comment> commentsList = bs.GetAllNotApprovedComments();

                string[] messages = new string[] { "Successfully Updated", "Comment successfully approved" };
                return Ok(commentsList, HttpStatusCode.OK, "Successfully updated", messages);
            }
            else
            {
                return Error(HttpStatusCode.NotAcceptable, ModelState);
            }
        }

        /// <summary>
        /// Delete object
        /// </summary>
        /// <param name="id">UniqueId to delete</param>
        /// <returns>HttpResponseMessage - Json</returns>
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

    }
}
