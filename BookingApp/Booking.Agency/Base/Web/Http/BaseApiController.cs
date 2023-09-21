using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.Text;
using System.Web.SessionState;
using System;
using System.Web;
using System.IO;
using Booking.DataAccess;
using System.Collections;
using System.Collections.Generic;

namespace Booking.Agency.Base.Web.Http
{
    public class BaseApiController : ApiController
    {
        #region Declarations

        public JsonSerializerSettings customJsonSettings;
        public HttpSessionState Session;

        #endregion

        #region Methods - Helpers

        public T MapJsonToModelObject<T>(dynamic obj, bool initModelStateValidation)
        {
            var serObj = JsonConvert.SerializeObject(obj, customJsonSettings);
            var retObj = JsonConvert.DeserializeObject<T>(serObj);
            if (initModelStateValidation)
            {
                this.Validate(retObj);
            }
            return retObj;
        }

        public T MapJsonToModelArrayObjects<T>(dynamic obj, bool initModelStateValidation)
        {
            var serObj = JsonConvert.SerializeObject(obj, customJsonSettings);
            var retObj = JsonConvert.DeserializeObject<IList<SentMessage>>(serObj);

            if (initModelStateValidation)
            {
                this.Validate(retObj);
            }

            return retObj;
        }


        public Guid GetUserId()
        {
            if (Session["UserId"] != null)
            {
                return new Guid(Session["UserId"].ToString());
            }
            else
            {
                throw new Exception("Error occured! Session Object UserId is null");
            }
        }

        #endregion

        #region Constructors

        public BaseApiController()
        {
            Session = (HttpSessionState)HttpContext.Current.Session;
            customJsonSettings = new JsonSerializerSettings()
            {
                DateFormatHandling = DateFormatHandling.IsoDateFormat,
                DateTimeZoneHandling = DateTimeZoneHandling.Local,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                DateParseHandling = DateParseHandling.DateTime,
                DateFormatString = "MM/dd/yyyy HH:mm:ss"
            };
        }

        #endregion

        #region Http Responses

        public HttpResponseMessage Ok(Object obj, HttpStatusCode statusCode, string message, string[] messages)
        {
            var response = this.Request.CreateResponse(HttpStatusCode.OK);
            var json = JsonConvert.SerializeObject(obj, customJsonSettings);

            string retMessages = "[";
            foreach (string s in messages)
            {
                retMessages += "\"" + s + "\"";
            }
            retMessages += "]";
            retMessages = retMessages.Replace("\"\"", "\",\"");

            var ret = "{ \"data\": " + json + ", \"status\": { \"code\": \"" + (int)statusCode + "\", \"message\": \"" + message + "\", \"messages\": " + retMessages + "  }}";
            response.Content = new StringContent(ret, Encoding.UTF8, "application/json");
            return response;
        }
        public HttpResponseMessage Ok(Object obj, HttpStatusCode statusCode, string message)
        {
            var response = this.Request.CreateResponse(HttpStatusCode.OK);
            var json = JsonConvert.SerializeObject(obj, customJsonSettings);

            var ret = "{ \"data\": " + json + ", \"status\": { \"code\": \"" + (int)statusCode + "\", \"message\": \"" + message + "\"  }}";
            response.Content = new StringContent(ret, Encoding.UTF8, "application/json");
            return response;
        }
        public HttpResponseMessage Error(HttpStatusCode statusCode, System.Web.Http.ModelBinding.ModelStateDictionary ms)
        {
            var response = this.Request.CreateResponse(statusCode);

            string errorMessages = "[";
            foreach (var state in ModelState)
            {
                foreach (var error in state.Value.Errors)
                {
                    errorMessages += "{ \"key\": \"" + state.Key + "\"" + ", \"message\": \"" + error.ErrorMessage + "\" },";
                }
            }
            if (errorMessages.EndsWith(",")) {
                errorMessages = errorMessages.Substring(0, errorMessages.Length - 1);
            }
            errorMessages += "]";
            errorMessages = errorMessages.Replace("\"\"", "\",\"");

            var ret = "{ \"status\": { \"code\": \"" + (int)statusCode + "\", \"message\": \"Error occured\", \"errors\": " + errorMessages + " }}";
            response.Content = new StringContent(ret, Encoding.UTF8, "application/json");
            return response;
        }
        public HttpResponseMessage Error(HttpStatusCode statusCode, string message)
        {
            var response = this.Request.CreateResponse(statusCode);
            var ret = "{ \"status\": { \"code\": \"" + (int)statusCode + "\", \"message\": \"" + message + "\", \"errors\": []  }}";
            response.Content = new StringContent(ret, Encoding.UTF8, "application/json");
            return response;
        }
        public HttpResponseMessage Error(HttpStatusCode statusCode, string message, string[] errors)
        {
            string retErrors = "[";
            foreach (string s in errors)
            {
                retErrors += "\"" + s + "\"";
            }
            retErrors += "]";
            retErrors = retErrors.Replace("\"\"", "\",\"");

            var response = this.Request.CreateResponse(statusCode);
            var ret = "{ \"status\": { \"code\": \"" + (int)statusCode + "\", \"message\": \"" + message + "\", \"messages\":[], \"errors\": " + retErrors + "  }}";
            response.Content = new StringContent(ret, Encoding.UTF8, "application/json");
            return response;
        }

        #endregion
    }
}