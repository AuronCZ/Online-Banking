using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Withdraws
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var withdraw = await this.context.Withdraws.FindAsync(request.Id);

                this.context.Remove(withdraw);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}