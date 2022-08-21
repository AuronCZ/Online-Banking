using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Bob", UserName = "bob", Email = "bob@test.com"},
                    new AppUser{DisplayName = "Tom", UserName = "tom", Email = "tom@test.com"},
                    new AppUser{DisplayName = "Jane", UserName = "jane", Email = "jane@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

        if (context.Accounts.Any()) return;
    
            var account = new List<Account>
            {
                new Account
                {
                Name="Customer Name",
                Surname="Customer Surname",
                AccountNumber="2077XXXXXX",
                AccountType="Savings account",
                OpenDate=DateTime.Now.AddMonths(-2),
                Balance="110.000"
                },
            };


        if (context.Balances.Any()) return;
    
            var balance = new List<Balance>
            {
                new Balance
                {
                AccountNumber="0021XXXXX",
                AccountType="Students account",
                Amount="150",
                Date=DateTime.Now.AddMonths(-3)
                },
            };  

        if (context.Cards.Any()) return;
    
            var card = new List<Card>
            {
                new Card
                {
                AccountNumber="7531XXXXX",
                CardType="VISA",
                CardNumber="5XXX-XXXX-XXXX-XXXX",
                ExpirationDate=DateTime.Now.AddMonths(-4)
                },
            };

        if (context.Transfers.Any()) return;
    
            var transfer = new List<Transfer>
            {
                new Transfer
                {
                TransferNumber="5523XXXXX",
                AccountNumber="1275XXXXXX",
                Amount="100",
                Payee="2323XXXXXX",
                Date=DateTime.Now.AddMonths(-5)
                },
            };

        if (context.Withdraws.Any()) return;
    
            var withdraw = new List<Withdraw>
            {
                new Withdraw
                {
                AccountNumber="2120XXXXX",
                Amount="50",
                Date=DateTime.Now.AddMonths(-6),
                Pin="XXXX"
                },
            };

                                
            await context.Accounts.AddRangeAsync(account);
            await context.Balances.AddRangeAsync(balance);
            await context.Cards.AddRangeAsync(card);
            await context.Transfers.AddRangeAsync(transfer);
            await context.Withdraws.AddRangeAsync(withdraw);
            await context.SaveChangesAsync();
      
        }
           
    }
  
}