using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Balances
{
    public class BalanceValidator: AbstractValidator<Balance>
    {
        public BalanceValidator()
        {
            RuleFor(x => x.AccountNumber).NotEmpty();
            RuleFor(x => x.AccountType).NotEmpty();
            RuleFor(x => x.Amount).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
        }
    }
}