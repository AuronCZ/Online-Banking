using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Transfers
{
    public class List
    {
        public class Query : IRequest<List<Transfer>> {}

        public class Handler : IRequestHandler<Query, List<Transfer>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<Transfer>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Transfers.ToListAsync();
            }
        }
    }
}