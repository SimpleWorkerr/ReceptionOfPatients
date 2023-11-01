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
                builder.Services.AddTransient<CrudServiceServices>();
                builder.Services.AddTransient<CrudReceptionServices>();
                builder.Services.AddTransient<CrudReceptionResultServices>();


                var app = builder.Build();
                app.UseStaticFiles();
                //doctor?operation=read
                app.UseMiddleware<DoctorMiddleware>(appContext);
                //patient?operation=read
                app.UseMiddleware<PatientMiddleware>(appContext);
                //service?operation=read
                app.UseMiddleware<ServiceMiddleware>(appContext);
                //reception?operation=read
                app.UseMiddleware<ReceptionMiddleware>(appContext);
                //receptionResult?operation=read
                app.UseMiddleware<ReceptionResultMiddleware>(appContext);

                app.MapGet("/", () => "Hello world");
                app.Run();
            }           
        }
    }
}