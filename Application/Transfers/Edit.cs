using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Transfers
{
    public class Edit
    {
        
        public class Command : IRequest
        {
            public Transfer Transfer { get; set; }
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
                var transfer  = await this.context.Transfers.FindAsync(request.Transfer.Id);

                this.mapper.Map(request.Transfer, transfer);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}