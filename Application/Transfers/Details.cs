using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Transfers
{
    public class Details
    {
        public class Query : IRequest<Result<Transfer>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Transfer>>
        {
        private readonly DataContext context;

            public Handler(DataContext context)
            {
            this.context = context;

            }

            public async Task<Result<Transfer>> Handle(Query request, CancellationToken cancellationToken)
            {
                var transfer = await this.context.Transfers.FindAsync(request.Id);

                return Result<Transfer>.Success(transfer);
            }
        }
    }
}