using System.Text;

namespace ReceptionOfPatients
{
    public class Doctor
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string? FatherName { get; set; }
        public DateTime StartWorkDate { get; set; }
        public string OfficeNumber { get; set; } = null!;
        public string Specialization { get; set; } = null!;

        public List<Patient> Patients { get; set; } = new();
        public List<Reception> Receptions { get; set; } = new();
        public List<Service> Services { get; set; } = new();

        public override string ToString()
        {
            StringBuilder stringBuilder = new StringBuilder();

            stringBuilder.AppendLine($"Доктор: {Surname} {Name} {FatherName ?? "Нет отчества"}");
            stringBuilder.AppendLine($"\tСпециализация: {Specialization}");
            stringBuilder.AppendLine($"\tНомер кабинета: {OfficeNumber}");
            stringBuilder.AppendLine($"\tДата начала работы: {StartWorkDate.ToString()}");

            return stringBuilder.ToString();
        }

        public Doctor CreateJsonObject()
        {
            Doctor result = new Doctor();

            result.Id = Id;
            result.Name = Name;
            result.Surname = Surname;
            result.FatherName = FatherName;
            result.StartWorkDate = StartWorkDate;
            result.OfficeNumber = OfficeNumber;
            result.Specialization = Specialization;

            foreach (var patient in Patients)
            {
                result.Patients.Add(new Patient()
                {
                    Id = patient.Id,
                    Name = patient.Name,
                    Surname = patient.Surname,
                    FatherName = patient.FatherName,
                    Address = patient.Address,
                    BirthDate = patient.BirthDate,
                    PhoneNumber = patient.PhoneNumber
                });
            }
            foreach(var reception in Receptions)
            {
                result.Receptions.Add(new Reception()
                {
                    Id=reception.Id,
                    DoctorId = reception.DoctorId,
                    PatientId = reception.PatientId,
                    ReceptionDate = reception.ReceptionDate
                });
            }
            foreach(var service in Services)
            {
                result.Services.Add(new Service()
                {
                    Id = service.Id,
                    Price = service.Price,
                    ServiceName = service.ServiceName,
                });
            }

            return result;
        }
    }
}
