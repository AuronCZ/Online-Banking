using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Withdraws
{
    public class WithdrawValidator: AbstractValidator<Withdraw>
    {
        public WithdrawValidator()
        {
            RuleFor(x => x.AccountNumber).NotEmpty();
            RuleFor(x => x.Amount).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Pin).NotEmpty();
        }
    }
}