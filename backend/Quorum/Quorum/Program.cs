using Quorum.Application.Services;
using Quorum.Infrastructure.Repositories;
using Microsoft.OpenApi.Models;
using Quorum.Application.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Quorum.Infrastructure.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Legislative Data API",
        Version = "v1",
        Description = "API for accessing legislative data including bills, legislators, and voting records",
        Contact = new OpenApiContact
        {
            Name = "Quorum",
            Email = "info@quorum.us"
        }
    });

    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var dataPath = builder.Configuration.GetValue<string>("DataPath")
  ?? Path.Combine(Directory.GetCurrentDirectory(), "Data");

builder.Services.AddSingleton<IQuorumDataRepository>(
sp => new CsvQuorumDataRepository(dataPath)
);
builder.Services.AddScoped<IQuorumDataService, QuorumDataService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Legislative Data API V1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();