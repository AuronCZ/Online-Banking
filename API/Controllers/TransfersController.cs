using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Transfers;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TransfersController: BaseApiController
    {  


        [HttpGet]
        public async Task<ActionResult<List<Transfer>>> GetTransfers()
        {
            return  await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transfer>> GetATransfer(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransfer(Transfer transfer)
        {
            return Ok(await Mediator.Send(new Create.Command {Transfer = transfer}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTransfer(Guid id, Transfer transfer)
        {
            transfer.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Transfer = transfer}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransfer(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}