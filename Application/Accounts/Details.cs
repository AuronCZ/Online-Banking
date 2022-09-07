using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Accounts
{
    public class Details
    {
        public class Query : IRequest<Result<AccountDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<AccountDto>>
        {
        private readonly DataContext context;
        private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<AccountDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var account = await this.context.Accounts
                    .ProjectTo<AccountDto>(this.mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<AccountDto>.Success(account);
            }
        }
    }
}