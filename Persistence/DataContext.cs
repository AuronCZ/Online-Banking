using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext: IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Account> Accounts{ get; set; }
        public DbSet<Transfer> Transfers{ get; set; }
        public DbSet<Withdraw> Withdraws{ get; set; }
        public DbSet<Balance> Balances{ get; set; }
        public DbSet<Card> Cards{ get; set; }
        
    }
}