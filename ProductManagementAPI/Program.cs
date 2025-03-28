using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ProductManagementAPI.Database;
using ProductManagementAPI.Middlewares;
using ProductManagementAPI.Repositories;
using ProductManagementAPI.Repositories.Interfaces;
using ProductManagementAPI.Services;
using ProductManagementAPI.Services.Interfaces;
using Serilog;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog for logging
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .WriteTo.Console()
    .WriteTo.File("logs/app_log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

// Add CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add Serilog as the Logging Provider
builder.Host.UseSerilog();

// Add Database Context
builder.Services.AddDbContext<ProductManagementDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register Repositories & Services
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IPlanManagementRepository, PlanManagementRepository>();
builder.Services.AddScoped<IPlanManagementService, PlanManagementService>();
builder.Services.AddSingleton<JwtService>();

// Configure JWT authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var key = Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]!);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key),            
            ClockSkew = TimeSpan.Zero
        };        
    });
builder.Services.AddAuthorization();
// Register Repositories & Services for Customer
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<ICustomerService, CustomerService>();


// Add Controllers & Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register Global Exception Handler
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// Add Controllers
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    // Configure JWT in Swagger
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your JWT token in the format: Bearer {your_token}"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            new string[] { }
        }
    });
});

var app = builder.Build();

// Apply database migrations
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ProductManagementDbContext>();
    dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// IMPORTANT: Use routing first so that the middleware can correctly match endpoints.
app.UseRouting();

// Apply CORS policy early in the pipeline
app.UseCors("AllowReactApp");

// Apply authentication and authorization middleware in order
app.UseAuthentication();
app.UseAuthorization();

// Map controllers to endpoints
app.MapControllers();

app.Run();
