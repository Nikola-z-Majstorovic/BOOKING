using Agent.DataAccess;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Agent.Agency.Models
{
    public class LoginModel : BookingAgencyUser
    {
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool IsOffline { get; set; }

        public string[] Roles { get; set; }
    }
}
