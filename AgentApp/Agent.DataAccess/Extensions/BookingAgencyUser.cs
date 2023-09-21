using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Agent.DataAccess
{
    partial class BookingAgencyUser
    {
        public string Password { get; set; }
        public bool IsUserApproved { get; set; }
        public string[] Roles { get; set; }
    }
}
