using BackEnd.Models;
using BackEnd.Repositories;
using BackEnd.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SystemDbContext>(
    option => option.UseSqlServer("Server=DESKTOP-Q7NGFSM;Initial Catalog=TTS;Integrated Security=True")
);


//DI Repositories
builder.Services.AddTransient<IWorkFlowRepository, WorkFlowRepository>();
builder.Services.AddTransient<ITypeRepository, TypeRepository>();



//DI Services
builder.Services.AddTransient<ITypeService, TypeService>();
builder.Services.AddTransient<IWorkFlowService, WorkFlowService>();


// ADD CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Policy",
                          policy =>
                          {
                              policy.AllowAnyOrigin()
                                                    .AllowAnyOrigin()
                                                    .AllowAnyHeader()
                                                    .AllowAnyMethod();
                          });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
