using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Withdraws
{
    public class Details
    {
        public class Query : IRequest<Result<Withdraw>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Withdraw>>
        {
        private readonly DataContext context;

            public Handler(DataContext context)
            {
            this.context = context;

            }

            public async Task<Result<Withdraw>> Handle(Query request, CancellationToken cancellationToken)
            {
                var withdraw = await this.context.Withdraws.FindAsync(request.Id);

                return Result<Withdraw>.Success(withdraw);
            }
        }
    }
}