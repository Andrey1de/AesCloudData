using AesCloudData;
using AesCloudData.Utils;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;

namespace AasCloudData
{
    public class Startup
    {
        readonly string DATABASE_URL = "";
        readonly string PostgresConnectionString = "";
        readonly bool IS_HEROKU;

        bool isStr(string str) => str != null && str.Length > 10;
        public Startup(IConfiguration configuration)
        {

            Configuration = configuration;
            var old = Console.BackgroundColor;
            Console.BackgroundColor = ConsoleColor.Blue;

            IS_HEROKU  = bool.TryParse(Environment.GetEnvironmentVariable("IS_HEROKU"), out IS_HEROKU);
            Console.WriteLine("IS_HEROKU:" + IS_HEROKU.ToString().ToUpper());

            if (IS_HEROKU)
            {

                DATABASE_URL = Environment.GetEnvironmentVariable("DATABASE_URL");
                if (isStr(DATABASE_URL))
                {
                    PostgresConnectionString = ForPostgress.ParseDatabaseUrl(DATABASE_URL);
                    if (isStr(PostgresConnectionString))
                    {
                        Console.WriteLine("PostgresConnectionString:" + PostgresConnectionString);

                    }
                }
            }
            else
            {
                PostgresConnectionString = Configuration.GetConnectionString("PostgresConnectionString");
                Console.WriteLine("PostgresConnectionString:" + PostgresConnectionString);

            }


            Console.BackgroundColor = old;
  
        }


        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var old = Console.BackgroundColor;
            Console.BackgroundColor = ConsoleColor.Blue;

            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));


            if (isStr(PostgresConnectionString))
            {
                _ = services.AddDbContext<ClouddataContext>(options =>
                {
                    options.UseNpgsql(PostgresConnectionString);
                    Console.WriteLine($"AddDbContext:UseNpgsql({PostgresConnectionString})");
                });
            }


            Console.BackgroundColor = old;

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "AasCloudData", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("MyPolicy");

            if (true || env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AasCloudData v1"));
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
