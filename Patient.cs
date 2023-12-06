using System.Text;

namespace ReceptionOfPatients
{
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string? FatherName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public int ReceptionResultId { get; set; }
        public List<ReceptionResult?> ReceptionResult { get; set; } = new();


        public List<Doctor> Doctors { get; set; } = new();
        public List<Reception> Receptions { get; set; } = new();
        public List<Service?> Services { get; set; } = new();


        public override string ToString()
        {
            StringBuilder stringBuilder = new StringBuilder();

            stringBuilder.AppendLine($"Пациент: {Surname} {Name} {FatherName ?? "Нет отчества"} Id: {Id}");
            stringBuilder.AppendLine($"\tАдресс: {Address}");
            stringBuilder.AppendLine($"\tНомер телефона: {PhoneNumber}");
            stringBuilder.AppendLine($"\tДата рождения: {BirthDate.ToString()}");

            return stringBuilder.ToString();
        }

        public Patient CreateJsonObject()
        {
            Patient result = new Patient();

            result.Id = Id;
            result.Name = Name;
            result.Surname = Surname;
            result.FatherName = FatherName;
            result.BirthDate = BirthDate;
            result.Address = Address;
            result.PhoneNumber = PhoneNumber;

            foreach (var doctor in Doctors)
            {
                result.Doctors.Add(new Doctor()
                {
                    Id = doctor.Id,
                    Name = doctor.Name,
                    Surname = doctor.Surname,
                    FatherName = doctor.FatherName,
                    OfficeNumber = doctor.OfficeNumber,
                    Specialization = doctor.Specialization,
                    StartWorkDate = doctor.StartWorkDate
                });
            }
            foreach (var reception in Receptions)
            {
                result.Receptions.Add(new Reception()
                {
                    Id = reception.Id,
                    DoctorId = reception.DoctorId,
                    PatientId = reception.PatientId,
                    ReceptionDate = reception.ReceptionDate
                });
            }
            foreach (var service in Services)
            {
                result.Services.Add(new Service()
                {
                    Price = service?.Price ?? 0,
                    ServiceName = service?.ServiceName ?? "",
                });
            }

            return result;
        }
    }
}
