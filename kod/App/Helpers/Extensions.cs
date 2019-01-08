using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AdvAgency.Helpers
{
    public static class Extensions
    {
        public static string GetRoleId(this ClaimsPrincipal user)
        {
            foreach (var c in (user.Identity as ClaimsIdentity).Claims)
            {
                if (c.Type.Contains("role")) return c.Value;
            }
            return "";
        }
    }
}
