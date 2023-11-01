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

                //AddData();

                app.MapGet("/", () => "Hello world");
                app.Run();
            }
            

        }
        private static void AddData()
        {
            using (AppContext appContext = new AppContext())
            {
                Service service_1 = new Service() { ServiceName = "Êîíñóëüòàöèÿ", Price = 0 };
                Service service_2 = new Service() { ServiceName = "Îñìîòð_Áàçîâûé", Price = 5000 };
                Service service_3 = new Service() { ServiceName = "Îñìîòð_Ïîëíûé", Price = 10000 };
                appContext.Services.AddRange(service_1, service_2, service_3);

                Doctor doctor_1 = new Doctor() { Name = "Áóëàò", Surname = "Îõèíîâ", FatherName = "Òóìýðîâè÷", OfficeNumber = "Êàáèíåò 86", Specialization = "Õèðóðã-Îðòîïåä", StartWorkDate = DateTime.UtcNow, Services = new List<Service> { service_1, service_2 } };
                Doctor doctor_2 = new Doctor() { Name = "×èìèò", Surname = "Âàíòååâ", FatherName = "×èíãèñîâè÷", OfficeNumber = "Êàáèíåò 87", Specialization = "Õèðóðã-Ëîãîïåä", StartWorkDate = DateTime.UtcNow, Services = new List<Service> { service_2, service_3 } };
                Doctor doctor_3 = new Doctor() { Name = "Çàõàî", Surname = "Ìåðêóðüåâ", FatherName = "Àëåêñååâè÷", OfficeNumber = "Êàáèíåò 23", Specialization = "ÊàðäèîÕèðóðã", StartWorkDate = DateTime.UtcNow, Services = new List<Service> { service_1, service_2, service_3 } };
                appContext.Doctors.AddRange(doctor_1, doctor_2, doctor_3);

                Patient patient_1 = new Patient() { Name = "Ïàöèåíò_1", Surname = "Ïàöèåíòîâ_1", FatherName = "Ïàöèåíòîâè÷_1", Address = "Ïàöèåíòîâî_1", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1 } };
                Patient patient_2 = new Patient() { Name = "Ïàöèåíò_2", Surname = "Ïàöèåíòîâ_2", FatherName = "Ïàöèåíòîâè÷_2", Address = "Ïàöèåíòîâî_2", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1, doctor_2 } };
                Patient patient_3 = new Patient() { Name = "Ïàöèåíò_3", Surname = "Ïàöèåíòîâ_3", FatherName = "Ïàöèåíòîâè÷_3", Address = "Ïàöèåíòîâî_3", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1, doctor_2, doctor_3 } };
                Patient patient_4 = new Patient() { Name = "Ïàöèåíò_4", Surname = "Ïàöèåíòîâ_4", FatherName = "Ïàöèåíòîâè÷_4", Address = "Ïàöèåíòîâî_4", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_2 } };
                Patient patient_5 = new Patient() { Name = "Ïàöèåíò_5", Surname = "Ïàöèåíòîâ_5", FatherName = "Ïàöèåíòîâè÷_5", Address = "Ïàöèåíòîâî_5", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_3 } };
                Patient patient_6 = new Patient() { Name = "Ïàöèåíò_6", Surname = "Ïàöèåíòîâ_6", FatherName = "Ïàöèåíòîâè÷_6", Address = "Ïàöèåíòîâî_6", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1 } };
                Patient patient_7 = new Patient() { Name = "Ïàöèåíò_7", Surname = "Ïàöèåíòîâ_7", FatherName = "Ïàöèåíòîâè÷_7", Address = "Ïàöèåíòîâî_7", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1, doctor_3 } };
                Patient patient_8 = new Patient() { Name = "Ïàöèåíò_8", Surname = "Ïàöèåíòîâ_8", FatherName = "Ïàöèåíòîâè÷_8", Address = "Ïàöèåíòîâî_8", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_2, doctor_3 } };

                appContext.Patients.AddRange(patient_1, patient_2, patient_3, patient_4, patient_5, patient_6, patient_7, patient_8);

                appContext.SaveChanges();
            }
        }
    }
}