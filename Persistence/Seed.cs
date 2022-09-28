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
               var balance = new List<Balance>
            {
                new Balance
                {
                AccountNumber="0021XXXXX",
                AccountType="Students account",
                Amount="150",
                Date=DateTime.Now.AddMonths(-3),
                },
            };                                    
                var bankuser = new List<BankUser>
            {
                new BankUser
                {
                Name="Filan",
                Surname="Fisteku",
                Username="filan1",
                Email="filan@asd.com",
                Password="1234",
                Date=DateTime.Now.AddMonths(-3)
                },
            };
                var branches = new List<Branch>
            {
                new Branch
                {
                   Bank="TEB",
                   BranchNumber="Branch 01",
                   Country="Kosova",
                   City="Prishtina",
                   Address="Street,Street Number",
                   Date=DateTime.Now.AddMonths(-3),
                },
            };
              var card = new List<Card>
            {
                new Card
                {
                AccountNumber="7531XXXXX",
                CardType="VISA",
                CardNumber="5XXX-XXXX-XXXX-XXXX",
                ExpirationDate=DateTime.Now.AddMonths(-2),
                },
            };
               var contacts = new List<Contacts>
            {
                new Contacts
                {
                 Name ="Customer Name",
                 Surname="Customer Surname",
                 Email="name.surname@gmail.com",
                 Message="Report problem" 
                },
            };
                var customers = new List<Customer>
            {
                new Customer
                {
                 Name ="Customer Name",
                 Surname="Customer Surname",
                 Address="Kosova, Prishtina",
                 Email="name.surname@gmail.com",
                 Tel="+383 45 XXX XXX",
                 BirthDate=DateTime.Now.AddMonths(-1),
                 Gender="F",
                 Bank="TEB",
                 AccNumber="2010XXXXXX",
                 
                },
            };
          var deposit = new List<Deposit>
            {
                new Deposit
                {
                Account="Filan",
                Amount="250",
                Date=DateTime.Now.AddMonths(-2),
                Payee="Banka X"   
                },
            };
             var interest = new List<Interest>
            {
                new Interest
                {
                Type="Personal Loan",
                Amount="250",
                InterestRate="500",
                MonthsNumber="12",
                Date=DateTime.Now.AddMonths(-4),
                },
            };
             var loan = new List<Loan>
            {
                new Loan
                {
                Name="Customer Name",
                Surname="Customer Surname",
                AccNumber="2001XXXXXX",
                Type="Personal Loan",
                Amount="25.000",
                Duration="5 years",
                LoanDate=DateTime.Now.AddMonths(-2),
                Payments="10.000"
                },
            };
              var payment = new List<Payment>
            {
                new Payment
                {
                Account="Filan",
                Amount="100",
               Date=DateTime.Now.AddMonths(-2),
                Payee="Banka X"   
                },
            };
              var salary = new List<Salary>
            {
                new Salary
                {
                AccountNumber="1232145",
                AnualSalary="100000",
                MonthlyPayment="800",
                Date=DateTime.Now.AddMonths(-3),  
                },
            };
             var transaction = new List<Transaction>
            {
                new Transaction
                {
                Type="Deposit",
                Amount="250",
                Date=DateTime.Now.AddMonths(-2),
                Payee="Banka X"
                    
                },
            };
            var transfer = new List<Transfer>
            {
                new Transfer
                {
                TransferNumber="5523XXXXX",
                AccountNumber="1275XXXXXX",
                Amount="100",
                Payee="2323XXXXXX",
                Date=DateTime.Now.AddMonths(-2),
                },
            };
    
            var withdraw = new List<Withdraw>
            {
                new Withdraw
                {
                AccountNumber="2120XXXXX",
                Amount="50",
                Date=DateTime.Now.AddMonths(-2),
                Pin="XXXX"
                },
            };
                await context.Accounts.AddRangeAsync(account);
                await context.Balances.AddRangeAsync(balance);
                await context.BankUsers.AddRangeAsync(bankuser);
                await context.Branches.AddRangeAsync(branches);
                await context.Cards.AddRangeAsync(card); 
                await context.Contacts.AddRangeAsync(contacts);
                await context.Customers.AddRangeAsync(customers);
                await context.Deposits.AddRangeAsync(deposit);
                await context.Interests.AddRangeAsync(interest);
                await context.Loans.AddRangeAsync(loan);
                await context.Payments.AddRangeAsync(payment);
                await context.Salarys.AddRangeAsync(salary);
                await context.Transactions.AddRangeAsync(transaction);
                await context.Transfers.AddRangeAsync(transfer);
                await context.Withdraws.AddRangeAsync(withdraw);
                await context.SaveChangesAsync();
        }
    }
           
}
  
