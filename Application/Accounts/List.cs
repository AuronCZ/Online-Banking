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

namespace Application.Accounts
{
    public class List
    {
        public class Query : IRequest<Result<List<Account>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Account>>>
        {

            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Account>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Account>>.Success(await this.context.Accounts.ToListAsync());
            }
        }
    }
}