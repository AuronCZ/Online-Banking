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

namespace Application.Cards
{
    public class List
    {
        public class Query : IRequest<Result<List<CardDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<CardDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<List<CardDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  this.context.Cards
                .OrderBy(d => d.ExpirationDate)
                .ProjectTo<CardDto>(this.mapper.ConfigurationProvider,
                    new {currentUsername = this.userAccessor.GetUsername() })
                .AsQueryable();

                return Result<List<CardDto>>.Success(await this.context.Cards.ToListAsync());
            }
        }
    }
}