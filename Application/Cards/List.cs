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

namespace Application.Cards
{
    public class List
    {
        public class Query : IRequest<Result<List<Card>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Card>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Card>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Card>>.Success(await this.context.Cards.ToListAsync());
            }
        }
    }
}