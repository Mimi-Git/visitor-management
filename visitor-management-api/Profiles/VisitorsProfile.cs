using AutoMapper;
using visitor_management_api.Dtos;
using visitor_management_api.Models;

namespace visitor_management_api.Profiles
{
    public class VisitorsProfile : Profile
    {
        public VisitorsProfile()
        {
            CreateMap<Visitor, VisitorReadDto>();
            CreateMap<VisitorCreateDto, Visitor>();
            CreateMap<VisitorUpdateDto, Visitor>();
        }
    }
}