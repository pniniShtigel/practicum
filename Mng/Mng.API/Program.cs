using AutoMapper;
using Mng.Core.interfaces;
using Mng.Core.Services;
using Mng.Data;
using Mng.Data.Repositories;
using Mng.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IRoleService, RoleService>();


var mappingConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new Profiler());
});


IMapper mapper = mappingConfig.CreateMapper();
builder.Services.AddSingleton(mapper);


ConfigurationManager configuration = builder.Configuration;
builder.Services.AddDbContext<DataContext>(option =>
{
    option.UseSqlServer(configuration.GetConnectionString("PniniProjectApi"));
}
 );

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var policy = "policy";
builder.Services.AddCors(option => option.AddPolicy(name: policy, policy =>
{
    policy.AllowAnyOrigin(); policy.AllowAnyHeader(); policy.AllowAnyMethod();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseCors(policy);
app.MapControllers();

app.Run();
