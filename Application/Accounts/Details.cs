using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Accounts
{
    public class Details
    {
        public class Query : IRequest<Result<Account>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Account>>
        {
        private readonly DataContext context;

            public Handler(DataContext context)
            {
            this.context = context;

            }

            public async Task<Result<Account>> Handle(Query request, CancellationToken cancellationToken)
            {
                var account = await this.context.Accounts.FindAsync(request.Id);

                return Result<Account>.Success(account);
            }
        }
    }
}