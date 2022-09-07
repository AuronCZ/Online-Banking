using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.Balances
{
    public class List
    {
        public class Query : IRequest<Result<List<BalanceDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<BalanceDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<List<BalanceDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  this.context.Balances
                .OrderBy(d => d.Date)
                .ProjectTo<BalanceDto>(this.mapper.ConfigurationProvider,
                    new {currentUsername = this.userAccessor.GetUsername() })
                .AsQueryable();

                return Result<List<BalanceDto>>.Success(await this.context.Balances.ToListAsync());
            }
        }
    }
}