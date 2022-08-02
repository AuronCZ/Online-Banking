using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Cards
{
    public class Create
    {

        public class Command : IRequest
        {
            public Card Card { get; set; }
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
                this.context.Cards.Add(request.Card);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}