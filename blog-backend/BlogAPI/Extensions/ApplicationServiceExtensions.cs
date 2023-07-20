﻿using BlogAPI.Services;

namespace BlogAPI.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<PostService>();

            return services;
        }
    }
}
