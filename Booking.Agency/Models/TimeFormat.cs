using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Booking.Agency.Models
{
    public enum TimeFormat : short
    {
        //MM/DD/YYYY or DD/MM/YYYY
        NotSet = 0,
        HH_MM_SS_TT = 1,
        HH_MM_TT = 2,
        HH_MM_SSTT = 3,
        HH_MMTT = 4
    }
}
