﻿using AdminUserAPI.Core.DTOs;
using AdminUserAPI.Core.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdminUserAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminUserController : ControllerBase
    {
        private readonly IAdminUserService _adminUserService;
        private readonly IMapper _mapper;
        public AdminUserController(IAdminUserService adminUserService, IMapper mapper)
        {
            _adminUserService = adminUserService;
            _mapper = mapper;

        }
        [HttpGet("users")]
        public async Task<IActionResult> GetUsersAsync()
        {
            var users = await _adminUserService.GetUsersAsync();
            return Ok(users);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(AdminUserDto adminUserDto)
        {
            var result = await _adminUserService.RegisterUserAsync(adminUserDto);

            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(UserLoginDto userLoginDto)
        {
            var result = await _adminUserService.LoginUserAsync(userLoginDto);

            return Ok(result);
        }


        [HttpPut("update")]
        public async Task<IActionResult> UpdateUserAsync(AdminUserDto userUpdateDto)
        {
            var result = await _adminUserService.UpdateUserAsync(userUpdateDto);
            return Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUserAsync(int id)
        {
            var result = await _adminUserService.DeleteUserAsync(id);
            return Ok(result);
        }
    }
}