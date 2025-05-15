using ProductManagementAPI.Extensions;
using ProductManagementAPI.Middlewares;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog for logging
builder.Host.UseSerilog((context, config) =>
    config.ReadFrom.Configuration(context.Configuration)
          .WriteTo.Console()
          .WriteTo.File("logs/app_log.txt", rollingInterval: RollingInterval.Day));

// Add services to the container
builder.Services.AddApplicationDb(builder.Configuration);
builder.Services.AddCustomServices();
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddCustomSwagger();
builder.Services.AddCorsPolicy();
builder.Services.AddControllers();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

var app = builder.Build();

// Apply database migrations
app.ApplyDatabaseMigrations();

// Configure the HTTP request pipeline
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowReactApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
