using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class BalancesController: BaseApiController
    {  
        private readonly DataContext context;
        public BalancesController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Balance>>> GetBalances()
        {
            return  await this.context.Balances.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Balance>> GetBalance(Guid id)
        {
            return  await this.context.Balances.FindAsync(id);
        }
    }
}