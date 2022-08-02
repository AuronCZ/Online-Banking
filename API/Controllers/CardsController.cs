using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Cards;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CardsController: BaseApiController
    {  

        [HttpGet]
        public async Task<ActionResult<List<Card>>> GetCards()
        {
            return  await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Card>> GetCard(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateCard(Card card)
        {
            return Ok(await Mediator.Send(new Create.Command {Card = card}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCard(Guid id, Card card)
        {
            card.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Card = card}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}