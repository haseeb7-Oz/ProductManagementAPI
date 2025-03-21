using Microsoft.AspNetCore.Diagnostics;
using ProductManagementAPI.DTOs;
using System.Net;
using System.Text.Json;

namespace ProductManagementAPI.Middlewares
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(HttpContext context, Exception exception, CancellationToken cancellationToken)
        {
            _logger.LogError(exception, "An unexpected error occurred.");

            var response = new ErrorResponse
            {
                StatusCode = (int)HttpStatusCode.InternalServerError,
                Message = "An unexpected error occurred. Please try again later."
            };

            context.Response.StatusCode = response.StatusCode;
            context.Response.ContentType = "application/json";

            var json = JsonSerializer.Serialize(response);
            await context.Response.WriteAsync(json, cancellationToken);

            return true;
        }
    }
}
