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
    public class WithdrawsController: BaseApiController
    {  
        private readonly DataContext context;
        public WithdrawsController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Withdraw>>> GetWithdraws()
        {
            return  await this.context.Withdraws.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Withdraw>> GetWithdraw(Guid id)
        {
            return  await this.context.Withdraws.FindAsync(id);
        }
    }
}