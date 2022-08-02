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
    public class Create
    {

        public class Command : IRequest
        {
            public Balance Balance { get; set; }
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
                this.context.Balances.Add(request.Balance);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}