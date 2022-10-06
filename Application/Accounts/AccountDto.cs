using System;

namespace Application.Accounts
{
    public class AccountDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string AccountNumber { get; set; }

        public string AccountType { get; set; }

        public DateTime OpenDate { get; set; }
        
        public string Balance { get; set; }
    }
}