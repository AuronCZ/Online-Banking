using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Cards
{
    public class Details
    {
        public class Query : IRequest<Result<Card>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Card>>
        {
        private readonly DataContext context;

            public Handler(DataContext context)
            {
            this.context = context;

            }

            public async Task<Result<Card>> Handle(Query request, CancellationToken cancellationToken)
            {
                var card = await this.context.Cards.FindAsync(request.Id);

                return Result<Card>.Success(card);
            }
        }
    }
}