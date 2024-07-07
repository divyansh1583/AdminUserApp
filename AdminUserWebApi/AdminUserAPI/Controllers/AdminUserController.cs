using AdminUserAPI.Core.DTOs;
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
        public AdminUserController(IAdminUserService adminUserService,IMapper mapper)
        {   
            _adminUserService = adminUserService;
            _mapper = mapper;

        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(AdminUserDto adminUserDto)
        {
            var result = await _adminUserService.RegisterUserAsync(adminUserDto);
            if (!result.IsSuccess)
            {
                return BadRequest(result.Message);
            }
            return BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(UserLoginDto userLoginDto)
        {
            var result = await _adminUserService.LoginUserAsync(userLoginDto);
            if (!result.IsSuccess)
            {
                return BadRequest(result.Message);
            }
            return Ok(result);
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsersAsync()
        {
            var users = await _adminUserService.GetUsersAsync();
            return Ok(users);
        }
    }
}
