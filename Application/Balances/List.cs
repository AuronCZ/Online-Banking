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

namespace Application.Balances
{
    public class List
    {
        public class Query : IRequest<Result<List<Balance>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Balance>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Balance>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Balance>>.Success(await this.context.Balances.ToListAsync());
            }
        }
    }
}