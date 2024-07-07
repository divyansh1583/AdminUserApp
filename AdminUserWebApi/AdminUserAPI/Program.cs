
using AdminUserAPI;
using AdminUserAPI.Core.Interfaces;
using AdminUserAPI.Infrastructure.Data;
using AdminUserAPI.Infrastructure.Implementation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AdminUserDbContext>(options=>
options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("AdminUserAPI")
    ));

builder.Services.AddScoped<IAdminUserService, AdminUserService>();
builder.Services.AddScoped<IAdminUserRepository, AdminUserRepository>();

builder.Services.AddAutoMapper(typeof(MappingProfile));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
