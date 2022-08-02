using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Balances
{
    public class Details
    {
        public class Query : IRequest<Balance>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Balance>
        {
        private readonly DataContext context;

            public Handler(DataContext context)
            {
            this.context = context;

            }

            public async Task<Balance> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Balances.FindAsync(request.Id);
            }
        }
    }
}