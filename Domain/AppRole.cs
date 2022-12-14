using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppRole : IdentityRole<int>
    {
         public ICollection<AppUserRole> UserRoles { get; set; }
    }
}