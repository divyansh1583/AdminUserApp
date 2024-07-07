using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdminUserAPI.Core.Entities;

namespace AdminUserAPI.Core.Interfaces
{
    public interface IAdminUserRepository
    {
        Task<AdminUser> GetUserByEmailAsync(string email);
        Task AddUserAsync(AdminUser user);
        Task<int> GetAdminCountAsync();
        Task<IEnumerable<AdminUser>> GetUsersAsync();
    }
}
