// AdminUserRepository.cs
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

        //updating user
        public async Task UpdateUserAsync(AdminUser user)
        {
            _context.DC_AdminUsers.Update(user);

            await _context.SaveChangesAsync();
        }

        //deleting user
        public async Task DeleteUserAsync(int id)
        {
            var user = await _context.DC_AdminUsers.FindAsync(id);

            if (user != null)
            {
                _context.DC_AdminUsers.Remove(user);

                await _context.SaveChangesAsync();
            }
        }
    }
}