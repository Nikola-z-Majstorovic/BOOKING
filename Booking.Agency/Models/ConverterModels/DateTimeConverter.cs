using System;
using System.Web;
using AutoMapper;

namespace Booking.Agency.Models
{
    public class DateTimeConverter : ITypeConverter<DateTime, DateTimeOffset>
    {
        public DateTimeOffset Convert(ResolutionContext context)
        {
            TimeZoneInfo timeZoneInfo = HttpContext.Current.Session["TimeZone"] as TimeZoneInfo;
            DateTime dateTime = (DateTime)context.SourceValue;

            return timeZoneInfo != null ? new DateTimeOffset(dateTime, timeZoneInfo.GetUtcOffset(dateTime)) : DateTimeOffset.MinValue;
        }
    }
}