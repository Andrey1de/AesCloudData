using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace AesCloudData.Utils
{
    public static class ForPostgress
    {
        public static string ParseDatabaseUrl(string databaseUrl)
        {
            try
            {
                //DATABASE_URL=postgres://{user}:{password}@{hostname}:{port}/{database-name}
                //   const string PostgresConnectionString = "host=localhost;port=5432;database=clouddata;userid=postgres;password=1q1q";

                //            const string DATABASE_URL = @"postgres://jpiugjjydtcoej:7867dbb5ee52caa47a8e71c211a8fc688a99360a931ff79bc0ff53567b978349" +
                //"@ec2-107-22-83-3.compute-1.amazonaws.com:5432/d59dgts7li116b";
                var arr = databaseUrl.Split("/@:".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
                var userid = arr[1];
                var password = arr[2];
                var host = arr[3];
                var port = arr[4];
                var database = arr[5];
                string connect = $"host={host}; port={port}; database={database}; userid={userid}; password={password}; sslmode=require";
                return connect;
            }
            catch (Exception ex)
            {
                var old = Console.BackgroundColor;
                Console.BackgroundColor = ConsoleColor.Magenta;
                Console.WriteLine("ParseDatabaseUrl:" + ex.Message);
                Console.BackgroundColor = old;
   

                return null;
            }
        }
    }
}
