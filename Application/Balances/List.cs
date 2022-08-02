using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Balances
{
    public class List
    {
        public class Query : IRequest<List<Balance>> {}

        public class Handler : IRequestHandler<Query, List<Balance>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<Balance>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Balances.ToListAsync();
            }
        }
    }
}