using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Transfers
{
    public class Details
    {
        public class Query : IRequest<Transfer>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Transfer>
        {
        private readonly DataContext context;

            public Handler(DataContext context)
            {
            this.context = context;

            }

            public async Task<Transfer> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Transfers.FindAsync(request.Id);
            }
        }
    }
}