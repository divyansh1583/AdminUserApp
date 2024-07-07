using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdminUserAPI.Core.Entities;
using AdminUserAPI.Core.Interfaces;
using AdminUserAPI.Core.DTOs;
using AutoMapper;

namespace AdminUserAPI.Infrastructure.Implementation
{
    public class AdminUserService : IAdminUserService
    {   
        private readonly IAdminUserRepository _adminUserRepository;
        private readonly IMapper _mapper;
        public AdminUserService( IAdminUserRepository adminUserRepository,IMapper mapper)
        {
            _adminUserRepository = adminUserRepository;
            _mapper = mapper;
        }

        public async Task<ResultDto> RegisterUserAsync(AdminUserDto adminUserDto)
        {
            if (adminUserDto.Password!=adminUserDto.ConfirmPassword)
            {
                return new ResultDto { IsSuccess = false, Message = "Passwords do not match" };
            }
            if (adminUserDto.Role=="Admin" && await _adminUserRepository.GetAdminCountAsync()>=2)
            {
                return new ResultDto { IsSuccess = false, Message = "Cannot register more than 2 admins" };
            }

            var user = _mapper.Map<AdminUser>(adminUserDto);
            await _adminUserRepository.AddUserAsync(user);
            return new ResultDto { IsSuccess = true, Message = "User created successfully" };
        }

        public async Task<ResultDto> LoginUserAsync(UserLoginDto userLoginDto)
        {
            var user = await _adminUserRepository.GetUserByEmailAsync(userLoginDto.Email);

            if (user == null)
            {
                return new ResultDto { IsSuccess = false, Message = "Invalid email or password" };
            }
            return new ResultDto { IsSuccess = true, Message = "Login successful" };
        }
        public async Task<IEnumerable<AdminUser>> GetUsersAsync()
        {
            return await _adminUserRepository.GetUsersAsync();
        }

    }
}
