using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Withdraws
{
    public class Details
    {
        public class Query : IRequest<Withdraw>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Withdraw>
        {
        private readonly DataContext context;

            public Handler(DataContext context)
            {
            this.context = context;

            }

            public async Task<Withdraw> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Withdraws.FindAsync(request.Id);
            }
        }
    }
}