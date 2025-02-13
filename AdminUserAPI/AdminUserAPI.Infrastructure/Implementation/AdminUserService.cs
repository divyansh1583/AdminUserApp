﻿// AdminUserService.cs
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
        public AdminUserService(IAdminUserRepository adminUserRepository, IMapper mapper)
        {
            _adminUserRepository = adminUserRepository;
            _mapper = mapper;
        }

        //register user if all conditions are met
        public async Task<ResultDto> RegisterUserAsync(AdminUserDto adminUserDto)
        {
            if (adminUserDto.Password != adminUserDto.ConfirmPassword)
            {
                return new ResultDto { IsSuccess = false, Message = "Passwords do not match" };
            }
            if (adminUserDto.Role == "admin" && await _adminUserRepository.GetAdminCountAsync() >= 2)
            {
                return new ResultDto { IsSuccess = false, Message = "Cannot register more than 2 admins" };
            }
            if (await _adminUserRepository.GetUserByEmailAsync(adminUserDto.Email) != null)
            {
                return new ResultDto { IsSuccess = false, Message = "This email is already registered!" };
            }
            var user = _mapper.Map<AdminUser>(adminUserDto);
            await _adminUserRepository.AddUserAsync(user);
            return new ResultDto { IsSuccess = true, Message = "User created successfully" };
        }

        //loging use if email id and 
        public async Task<ResultDto> LoginUserAsync(UserLoginDto userLoginDto)
        {
            var user = await _adminUserRepository.GetUserByEmailAsync(userLoginDto.Email);

            if (user == null || user.Password != userLoginDto.Password)
            {
                return new ResultDto { IsSuccess = false, Message = "Invalid email or password" };
            }
            return new ResultDto { IsSuccess = true, Message = "Login successful" };
        }

        //returning list of users and admin
        public async Task<IEnumerable<AdminUser>> GetUsersAsync()
        {
            return await _adminUserRepository.GetUsersAsync();
        }

        //update user
        public async Task<ResultDto> UpdateUserAsync(AdminUserDto userUpdateDto)
        {
            var user = await _adminUserRepository.GetUserByEmailAsync(userUpdateDto.Email);

            if (user == null)
            {
                return new ResultDto { IsSuccess = false, Message = "User not found" };
            }
            if (userUpdateDto.Role == "admin" && await _adminUserRepository.GetAdminCountAsync() >= 2)
            {
                return new ResultDto { IsSuccess = false, Message = "Cannot register more than 2 admins" };
            }
            user.FirstName = userUpdateDto.FirstName;
            user.LastName = userUpdateDto.LastName;
            user.Role = userUpdateDto.Role;

            await _adminUserRepository.UpdateUserAsync(user);

            return new ResultDto { IsSuccess = true, Message = "User updated successfully" };
        }

        //delete user
        public async Task<ResultDto> DeleteUserAsync(int id)
        {
            await _adminUserRepository.DeleteUserAsync(id);

            return new ResultDto { IsSuccess = true, Message = "User deleted successfully" };
        }
    }
}