using System;
using AutoMapper;

namespace Booking.Agency.Models
{
    public class DateTimeOffsetConverter : ITypeConverter<DateTimeOffset, DateTime>
    {
        public DateTime Convert(ResolutionContext context)
        {
            DateTimeOffset dateTimeOffset = (DateTimeOffset) context.SourceValue;
            return DateTime.SpecifyKind(dateTimeOffset.DateTime, DateTimeKind.Local);
        }
    }
}