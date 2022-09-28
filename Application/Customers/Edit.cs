using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

using FluentValidation;
using Application.Core;


namespace Application.Customers
{
    public class Edit
    {

        public class Command : IRequest<Result<Unit>>
        {
            public Customer Customer { get; set; }
        }
         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.Customer).SetValidator(new CustomerValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>

        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }


            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var customer = await this.context.Customers.FindAsync(request.Customer.Id);
               
                if(customer == null) return null;
               
               this.mapper.Map(request.Customer, customer);

                var result=await this.context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to update customer");
               
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}