// IAdminUserService.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AdminUserAPI.Core.DTOs;
using AdminUserAPI.Core.Entities;

namespace AdminUserAPI.Core.Interfaces
{
    public interface IAdminUserService
    {
        Task<ResultDto> RegisterUserAsync(AdminUserDto userCreateDto);
        Task<ResultDto> LoginUserAsync(UserLoginDto userLoginDto);
        Task<IEnumerable<AdminUser>> GetUsersAsync();
        Task<ResultDto> UpdateUserAsync(AdminUserDto userUpdateDto);
        Task<ResultDto> DeleteUserAsync(int id);
    }
}