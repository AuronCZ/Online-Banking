using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Accounts
{
    public class List
    {
        public class Query : IRequest<List<Account>> {}

        public class Handler : IRequestHandler<Query, List<Account>>
        {

            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<Account>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Accounts.ToListAsync();
            }
        }
    }
}