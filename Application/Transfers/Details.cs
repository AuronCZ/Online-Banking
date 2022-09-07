using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Transfers
{
    public class Details
    {
        public class Query : IRequest<Result<TransferDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<TransferDto>>
        {
        private readonly DataContext context;
        private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<TransferDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var transfer = await this.context.Transfers
                    .ProjectTo<TransferDto>(this.mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<TransferDto>.Success(transfer);
            }
        }
    }
}