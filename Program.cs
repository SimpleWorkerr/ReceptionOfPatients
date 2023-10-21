using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace ReceptionOfPatients
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var app = builder.Build();

            //RemoveData();
            AddData();
            //app.MapGet("/", () => );

            app.Run();
        }

        private static void AddData()
        {
            using (AppContext appContext = new AppContext())
            {
                Service service_1 = new Service() {ServiceName = "Консультация", Price = 0};
                Service service_2 = new Service() {ServiceName = "Осмотр_Базовый", Price = 5000 };
                Service service_3 = new Service() { ServiceName = "Осмотр_Полный", Price = 10000 };
                appContext.Services.AddRange(service_1, service_2, service_3);

                Doctor doctor_1 = new Doctor() { Name = "Булат", Surname = "Охинов", FatherName = "Тумэрович", OfficeNumber = "Кабинет 86", Specialization = "Хирург-Ортопед", StartWorkDate = DateTime.UtcNow, Services = new List<Service> { service_1, service_2 } };
                Doctor doctor_2 = new Doctor() { Name = "Чимит", Surname = "Вантеев", FatherName = "Чингисович", OfficeNumber = "Кабинет 87", Specialization = "Хирург-Логопед", StartWorkDate = DateTime.UtcNow, Services = new List<Service> { service_2, service_3 } };
                Doctor doctor_3 = new Doctor() { Name = "Захао", Surname = "Меркурьев", FatherName = "Алексеевич", OfficeNumber = "Кабинет 23", Specialization = "КардиоХирург", StartWorkDate = DateTime.UtcNow, Services = new List<Service> {service_1, service_2, service_3 } };
                appContext.Doctors.AddRange(doctor_1, doctor_2, doctor_3);

                Patient patient_1 = new Patient() { Name = "Пациент_1", Surname = "Пациентов_1", FatherName = "Пациентович_1", Address = "Пациентово_1", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> {doctor_1} };
                Patient patient_2 = new Patient() { Name = "Пациент_2", Surname = "Пациентов_2", FatherName = "Пациентович_2", Address = "Пациентово_2", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1, doctor_2 } };
                Patient patient_3 = new Patient() { Name = "Пациент_3", Surname = "Пациентов_3", FatherName = "Пациентович_3", Address = "Пациентово_3", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1, doctor_2, doctor_3 } };
                Patient patient_4 = new Patient() { Name = "Пациент_4", Surname = "Пациентов_4", FatherName = "Пациентович_4", Address = "Пациентово_4", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_2 } };
                Patient patient_5 = new Patient() { Name = "Пациент_5", Surname = "Пациентов_5", FatherName = "Пациентович_5", Address = "Пациентово_5", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_3 } };
                Patient patient_6 = new Patient() { Name = "Пациент_6", Surname = "Пациентов_6", FatherName = "Пациентович_6", Address = "Пациентово_6", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1 } };
                Patient patient_7 = new Patient() { Name = "Пациент_7", Surname = "Пациентов_7", FatherName = "Пациентович_7", Address = "Пациентово_7", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1, doctor_3 } };
                Patient patient_8 = new Patient() { Name = "Пациент_8", Surname = "Пациентов_8", FatherName = "Пациентович_8", Address = "Пациентово_8", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_2, doctor_3 } };
                
                appContext.Patients.AddRange(patient_1, patient_2, patient_3, patient_4, patient_5, patient_6, patient_7, patient_8);

                appContext.SaveChanges();
            }
        }

        private static void ReadData()
        {
            using (AppContext appContext = new AppContext())
            {

            }
        }
        private static void RemoveData()
        {
            using (AppContext appContext = new AppContext())
            {
                //appContext.Services.RemoveRange(appContext.Services);
               
                //appContext.Receptions.RemoveRange(appContext.Receptions);
                appContext.Patients.Remove(appContext.Patients.First());
                appContext.Doctors.Remove(appContext.Doctors.First());

                appContext.SaveChanges();
            }
        }
    }
}