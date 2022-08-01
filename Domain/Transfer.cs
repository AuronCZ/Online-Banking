using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Transfer
    {
        public Guid Id{ get; set; }
        
        public string TransferNumber { get; set; }

        public string AccountNumber{ get; set; }

        public string Amount { get; set; }

        public string Payee{ get; set; }

        public DateTime Date { get; set; }        
    }
}