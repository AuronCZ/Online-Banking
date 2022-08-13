using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Transfers
{
    public class Create
    {

        public class Command : IRequest<Result<Unit>>
        {
            public Transfer Transfer { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Transfer).SetValidator(new TransferValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                this.context.Transfers.Add(request.Transfer);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create transfer");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}