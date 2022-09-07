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

namespace Application.Withdraws
{
    public class List
    {
        public class Query : IRequest<Result<List<WithdrawDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<WithdrawDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<List<WithdrawDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  this.context.Withdraws
                .OrderBy(d => d.Date)
                .ProjectTo<WithdrawDto>(this.mapper.ConfigurationProvider,
                    new {currentUsername = this.userAccessor.GetUsername() })
                .AsQueryable();

                return Result<List<WithdrawDto>>.Success(await this.context.Withdraws.ToListAsync());
            }
        }
    }
}