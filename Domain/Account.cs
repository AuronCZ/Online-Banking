using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Account
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


