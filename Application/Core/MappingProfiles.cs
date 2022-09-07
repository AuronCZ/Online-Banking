using Application.Accounts;
using Application.Balances;
using Application.Cards;
using Application.Transfers;
using Application.Withdraws;
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
            CreateMap<Account,AccountDto>();
            CreateMap<Balance,BalanceDto>();
            CreateMap<Card,CardDto>();
            CreateMap<Transfer,TransferDto>();
            CreateMap<Withdraw,WithdrawDto>();
        }
    }
}