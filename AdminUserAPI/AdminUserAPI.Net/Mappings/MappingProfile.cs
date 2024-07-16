
using AdminUserAPI.Core.DTOs;
using AdminUserAPI.Core.Entities;
using AutoMapper;

namespace AdminUserAPI
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<AdminUserDto, AdminUser>(); // Explicitly map Password property;
        }
    }
}
