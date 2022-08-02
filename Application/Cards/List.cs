using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Cards
{
    public class List
    {
        public class Query : IRequest<List<Card>> {}

        public class Handler : IRequestHandler<Query, List<Card>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<Card>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Cards.ToListAsync();
            }
        }
    }
}