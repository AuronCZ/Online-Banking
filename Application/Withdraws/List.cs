using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Withdraws
{
    public class List
    {
        public class Query : IRequest<List<Withdraw>> {}

        public class Handler : IRequestHandler<Query, List<Withdraw>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<Withdraw>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Withdraws.ToListAsync();
            }
        }
    }
}