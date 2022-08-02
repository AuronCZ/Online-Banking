using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Balances
{
    public class Edit
    {
        
        public class Command : IRequest
        {
            public Balance Balance { get; set; }
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
                var balance  = await this.context.Balances.FindAsync(request.Balance.Id);

                this.mapper.Map(request.Balance, balance);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}