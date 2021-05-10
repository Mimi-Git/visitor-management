using AutoMapper.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using visitor_management_api.Data;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Http;
using Microsoft.OpenApi.Models;

namespace visitor_management_api
{
    public static class ConfigureExtensions
    {
        public static void RegistrationConfiguration(this IServiceCollection services)
        {
            services.AddScoped<IVisitorRepo, SqlVisitorRepo>()
                    .AddScoped<IEmployeeRepo, SqlEmployeeRepo>()
                    .AddScoped<IVisitRepo, SqlVisitRepo>();
        }

        public static void AutoMapperConfiguration(this IServiceCollection services)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        }

        public static void NewtonsoftJsonConfiguration(this IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
        }

        public static void DbContextConfiguration(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddDbContext<VisitorAppContext>(opt => opt
            .UseSqlServer(Configuration.GetConnectionString("VisitorConnection"))
            .LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, LogLevel.Information));
        }

        public static void IpRateLimitConfiguration(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddOptions()
                    .AddMemoryCache()
                    .Configure<IpRateLimitOptions>(Configuration.GetSection("IpRateLimiting"))
                    .AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>()
                    .AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>()
                    .AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
                    .AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
        }

        public static void SwaggerConfiguration(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });
        }
    }
}