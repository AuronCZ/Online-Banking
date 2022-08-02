using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Cards
{
    public class Edit
    {
        
        public class Command : IRequest
        {
            public Card Card { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext context;
        private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;    
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var card  = await this.context.Cards.FindAsync(request.Card.Id);

                this.mapper.Map(request.Card, card);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}