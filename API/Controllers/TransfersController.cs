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
    public class TransfersController: BaseApiController//TransfersController
    {  
        private readonly DataContext context;
        public TransfersController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Transfer>>> GetTransfers()
        {
            return  await this.context.Transfers.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transfer>> GetATransfer(Guid id)
        {
            return  await this.context.Transfers.FindAsync(id);
        }
    }
}