using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        //public async ActionResult<IEnumerable<AppUser>> GetUser() // blocked
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUser() // async
        {
          //return _context.Users.ToList();  //Blocking
          return await _context.Users.ToListAsync(); // Async
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
          return await _context.Users.FindAsync(id); // Async
        }
    }
}