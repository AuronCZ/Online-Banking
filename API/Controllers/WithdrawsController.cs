using System;
using System.Threading.Tasks;
using Application.Withdraws;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WithdrawsController: BaseApiController
    {  

        [HttpGet]
        public async Task<IActionResult> GetWithdraws()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWithdraw(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateWithdraw(Withdraw withdraw)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Withdraw = withdraw}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditWithdraw(Guid id, Withdraw withdraw)
        {
            withdraw.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Withdraw = withdraw}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWithdraw(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}