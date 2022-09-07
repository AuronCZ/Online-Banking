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

namespace Application.Transfers
{
    public class List
    {
        public class Query : IRequest<Result<List<TransferDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<TransferDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<List<TransferDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  this.context.Transfers
                .OrderBy(d => d.Date)
                .ProjectTo<TransferDto>(this.mapper.ConfigurationProvider,
                    new {currentUsername = this.userAccessor.GetUsername() })
                .AsQueryable();

                return Result<List<TransferDto>>.Success(await this.context.Transfers.ToListAsync());
            }
        }
    }
}