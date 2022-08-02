using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Accounts
{
    public class Create
    {

        public class Command : IRequest
        {
            public Account Account { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {

            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                this.context.Accounts.Add(request.Account);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}