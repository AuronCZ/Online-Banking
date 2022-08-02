using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Account,Account>();
            CreateMap<Balance,Balance>();
            CreateMap<Card,Card>();
            CreateMap<Transfer,Transfer>();
            CreateMap<Withdraw,Withdraw>();
        }
    }
}