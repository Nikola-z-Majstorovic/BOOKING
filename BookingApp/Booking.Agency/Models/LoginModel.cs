using Booking.DataAccess;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Booking.Agency.Models
{
    public class LoginModel : BookingAgencyUser
    {

        public bool IsOffline { get; set; }

    }
}
