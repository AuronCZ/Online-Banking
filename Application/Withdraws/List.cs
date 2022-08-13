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

namespace Application.Withdraws
{
    public class List
    {
        public class Query : IRequest<Result<List<Withdraw>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Withdraw>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Withdraw>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Withdraw>>.Success(await this.context.Withdraws.ToListAsync());
            }
        }
    }
}