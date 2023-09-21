using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Filters;

namespace Booking.Agency.Base.Web.Http
{
    public interface IBaseActions
    {
        [System.Web.Http.HttpPost]
        [System.Web.Http.ActionName("GetAll")]
        HttpResponseMessage GetAll();

        [System.Web.Http.HttpPost]
        [System.Web.Http.ActionName("Get")]
        HttpResponseMessage Get(Guid objId);

        [System.Web.Http.HttpPost]
        [System.Web.Http.ActionName("Add")]
        HttpResponseMessage Create(dynamic model);

        [System.Web.Http.HttpPost]
        [System.Web.Http.ActionName("Update")]
        HttpResponseMessage Update(dynamic model);

        [System.Web.Http.HttpPost]
        [System.Web.Http.ActionName("Delete")]
        HttpResponseMessage Delete(Guid objId);
    }
}
