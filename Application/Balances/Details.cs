using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Balances
{
    public class Details
    {
        public class Query : IRequest<Result<Balance>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Balance>>
        {
        private readonly DataContext context;

            public Handler(DataContext context)
            {
            this.context = context;

            }

            public async Task<Result<Balance>> Handle(Query request, CancellationToken cancellationToken)
            {
                var balance = await this.context.Balances.FindAsync(request.Id);

                return Result<Balance>.Success(balance);
            }
        }
    }
}