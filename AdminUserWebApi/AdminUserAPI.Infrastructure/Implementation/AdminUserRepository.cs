using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdminUserAPI.Core.Entities;
using AdminUserAPI.Core.Interfaces;
using AdminUserAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace AdminUserAPI.Infrastructure.Implementation
{
    public class AdminUserRepository : IAdminUserRepository
    {   
        private readonly AdminUserDbContext _context;
        public AdminUserRepository(AdminUserDbContext context)
        {
            _context = context;
        }

        //getting user by email
        public async Task<AdminUser> GetUserByEmailAsync(string email)
        {
            return await _context.DC_AdminUsers.FirstOrDefaultAsync(x => x.Email == email);
        }

        //adding user or admin
        public async Task AddUserAsync(AdminUser user)
        {
            _context.DC_AdminUsers.AddAsync(user);

            await _context.SaveChangesAsync();
        }

        //getting admin count
        public async Task<int> GetAdminCountAsync()
        {
            return await _context.DC_AdminUsers.CountAsync(x => x.Role == "Admin");
        }

        //getting all users list
        public async Task<IEnumerable<AdminUser>> GetUsersAsync()
        {
            return await _context.DC_AdminUsers.ToListAsync();
        }
    }
}
