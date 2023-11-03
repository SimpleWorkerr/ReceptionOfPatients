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

                app.UseMiddleware<BasicPageMiddleware>(appContext);

                app.Run();
            }
            

        }
        private static void AddData()
        {
            using (AppContext appContext = new AppContext())
            {
                Service service_1 = new Service() { ServiceName = "Осмотр", Price = 0 };
                Service service_2 = new Service() { ServiceName = "Диагностика", Price = 5000 };
                Service service_3 = new Service() { ServiceName = "Фикс", Price = 10000 };
                appContext.Services.AddRange(service_1, service_2, service_3);

                Doctor doctor_1 = new Doctor() { Name = "Врач_1", Surname = "Врачёв_1", FatherName = "Врачёвсий_1", OfficeNumber = "86", Specialization = "Õèðóðã-Îðòîïåä", StartWorkDate = DateTime.UtcNow, Services = new List<Service> { service_1, service_2 } };
                Doctor doctor_2 = new Doctor() { Name = "Врач_2", Surname = "Врачёв_2", FatherName = "Врачёвсий_2", OfficeNumber = "87", Specialization = "Õèðóðã-Ëîãîïåä", StartWorkDate = DateTime.UtcNow, Services = new List<Service> { service_2, service_3 } };
                Doctor doctor_3 = new Doctor() { Name = "Врач_3", Surname = "Врачёв_3", FatherName = "Врачёвсий_3", OfficeNumber = "23", Specialization = "ÊàðäèîÕèðóðã", StartWorkDate = DateTime.UtcNow, Services = new List<Service> { service_1, service_2, service_3 } };
                appContext.Doctors.AddRange(doctor_1, doctor_2, doctor_3);

                Patient patient_1 = new Patient() { Name = "Пациент_1", Surname = "Пациентов_1", FatherName = "Пациентович_1", Address = "Ïàöèåíòîâî_1", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1 }, Services = new List<Service?> { service_1, service_2 } };
                Patient patient_2 = new Patient() { Name = "Пациент_2", Surname = "Пациентов_2", FatherName = "Пациентович_2", Address = "Ïàöèåíòîâî_2", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1, doctor_2 }, Services = new List<Service?> {service_2 } };
                Patient patient_3 = new Patient() { Name = "Пациент_3", Surname = "Пациентов_3", FatherName = "Пациентович_3", Address = "Ïàöèåíòîâî_3", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1, doctor_2, doctor_3 }, Services = new List<Service?> { service_1 } };
                Patient patient_4 = new Patient() { Name = "Пациент_4", Surname = "Пациентов_4", FatherName = "Пациентович_4", Address = "Ïàöèåíòîâî_4", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_2 }, Services = new List<Service?> { service_1 } };
                Patient patient_5 = new Patient() { Name = "Пациент_5", Surname = "Пациентов_5", FatherName = "Пациентович_5", Address = "Ïàöèåíòîâî_5", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_3 }, Services = new List<Service?> { service_3} };
                Patient patient_6 = new Patient() { Name = "Пациент_6", Surname = "Пациентов_6", FatherName = "Пациентович_6", Address = "Ïàöèåíòîâî_6", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1 }, Services = new List<Service?> { service_1} };
                Patient patient_7 = new Patient() { Name = "Пациент_7", Surname = "Пациентов_7", FatherName = "Пациентович_7", Address = "Ïàöèåíòîâî_7", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_1, doctor_3 }, Services = new List<Service?> {service_3 } };
                Patient patient_8 = new Patient() { Name = "Пациент_8", Surname = "Пациентов_8", FatherName = "Пациентович_8", Address = "Ïàöèåíòîâî_8", BirthDate = DateTime.UtcNow, PhoneNumber = "89835331521", Doctors = new List<Doctor> { doctor_2, doctor_3 }, Services = new List<Service?> { service_1, service_3 } };

                appContext.Patients.AddRange(patient_1, patient_2, patient_3, patient_4, patient_5, patient_6, patient_7, patient_8);

                appContext.SaveChanges();
            }
        }
    }
}