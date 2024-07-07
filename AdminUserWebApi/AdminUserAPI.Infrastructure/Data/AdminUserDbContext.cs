using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdminUserAPI.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace AdminUserAPI.Infrastructure.Data
{
    public class AdminUserDbContext : DbContext
    {
        public AdminUserDbContext(DbContextOptions<AdminUserDbContext> options)
            : base(options)
        {
        }
        public DbSet<AdminUser> DC_AdminUsers { get; set; }
    }
}
