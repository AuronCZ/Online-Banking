using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.BankUsers
{
    public class BankUserDto
    {
        
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime Date { get; set; }
    }
}