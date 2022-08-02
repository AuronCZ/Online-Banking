using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Accounts;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountsController: BaseApiController
    {  

        [HttpGet]
        public async Task<ActionResult<List<Account>>> GetAccounts()
        {
            return  await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransfer(Account account)
        {
            return Ok(await Mediator.Send(new Create.Command {Account = account}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAccount(Guid id, Account account)
        {
            account.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Account = account}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}