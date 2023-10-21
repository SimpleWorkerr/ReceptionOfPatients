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
                Service service_1 = new Service() {ServiceName = "������������", Price = 0};
                Service service_2 = new Service() {ServiceName = "������_�������", Price = 5000 };
                Service service_3 = new Service() { ServiceName = "������_������", Price = 10000 };
                appContext.Services.AddRange(service_1, service_2, service_3);

                Doctor doctor_1 = new Doctor() { Name = "�����", Surname = "������", FatherName = "���������", OfficeNumber = "������� 86", Specialization = "������-�������", StartWorkDate = DateTime.UtcNow, Services = new List<Service> { service_1, service_2 } };
                Doctor doctor_2 = new Doctor() { Name = "�����", Surname = "�������", FatherName = "����������", OfficeNumber = "������� 87", Specialization = "������-�������", StartWorkDate = DateTime.UtcNow, Services = new List<Service> { service_2, service_3 } };
                Doctor doctor_3 = new Doctor() { Name = "�����", Surname = "���������", FatherName = "����������", OfficeNumber = "������� 23", Specialization = "������������", StartWorkDate = DateTime.UtcNow, Services = new List<Service> {service_1, service_2, service_3 } };
                appContext.Doctors.AddRange(doctor_1, doctor_2, doctor_3);

                Patient patient_1 = new Patient() { Name = "�������_1", Surname = "���������_1", FatherName = "�����������_1", Address = "����������_1", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> {doctor_1} };
                Patient patient_2 = new Patient() { Name = "�������_2", Surname = "���������_2", FatherName = "�����������_2", Address = "����������_2", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1, doctor_2 } };
                Patient patient_3 = new Patient() { Name = "�������_3", Surname = "���������_3", FatherName = "�����������_3", Address = "����������_3", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1, doctor_2, doctor_3 } };
                Patient patient_4 = new Patient() { Name = "�������_4", Surname = "���������_4", FatherName = "�����������_4", Address = "����������_4", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_2 } };
                Patient patient_5 = new Patient() { Name = "�������_5", Surname = "���������_5", FatherName = "�����������_5", Address = "����������_5", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_3 } };
                Patient patient_6 = new Patient() { Name = "�������_6", Surname = "���������_6", FatherName = "�����������_6", Address = "����������_6", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1 } };
                Patient patient_7 = new Patient() { Name = "�������_7", Surname = "���������_7", FatherName = "�����������_7", Address = "����������_7", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1, doctor_3 } };
                Patient patient_8 = new Patient() { Name = "�������_8", Surname = "���������_8", FatherName = "�����������_8", Address = "����������_8", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_2, doctor_3 } };
                
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