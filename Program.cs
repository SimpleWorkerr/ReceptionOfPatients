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
                builder.Services.AddTransient<CrudPatientServices>();
                
                var app = builder.Build();
                app.UseStaticFiles();
                //doctor?operation=read
                app.UseMiddleware<DoctorMiddleware>(appContext);
                //patient?operation=read
                app.UseMiddleware<PatientMiddleware>(appContext);
                
                app.MapGet("/", () => "Hello world");
                app.Run();
            }           
        }
    }
}