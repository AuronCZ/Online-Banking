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

namespace Application.Accounts
{
    public class List
    {
        public class Query : IRequest<Result<List<AccountDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<AccountDto>>>
        {

            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<List<AccountDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  this.context.Accounts
                .OrderBy(d => d.OpenDate)
                .ProjectTo<AccountDto>(this.mapper.ConfigurationProvider,
                    new {currentUsername = this.userAccessor.GetUsername() })
                .AsQueryable();

                return Result<List<AccountDto>>.Success(await this.context.Accounts.ToListAsync());
            }
        }
    }
}