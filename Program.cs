using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace ReceptionOfPatients
{
    public class Program
    {

        public static void Main(string[] args)
        {
            using (AppContext appContext = new AppContext())
            {
                var builder = WebApplication.CreateBuilder(args);
                builder.Services.AddTransient<CrudDoctorServices>();
                
                var app = builder.Build();
                app.UseStaticFiles();
                app.UseMiddleware<DoctorMiddleware>(appContext);
                ///doctor?operation=read
                app.MapGet("/", () => "Hello world");
                app.Run();
            }           
        }
    }
}