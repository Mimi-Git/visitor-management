using AutoMapper;
using visitor_management_api.Dtos;
using visitor_management_api.Models;

namespace visitor_management_api.Profiles
{
    public class VisitsProfile : Profile
    {
        public VisitsProfile()
        {
            CreateMap<Visit, VisitReadDto>();
            CreateMap<VisitCreateDto, Visit>();
            CreateMap<VisitUpdateDto, Visit>();
        }
    }
}