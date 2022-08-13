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

namespace Application.Transfers
{
    public class List
    {
        public class Query : IRequest<Result<List<Transfer>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Transfer>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Transfer>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Transfer>>.Success(await this.context.Transfers.ToListAsync());
            }
        }
    }
}