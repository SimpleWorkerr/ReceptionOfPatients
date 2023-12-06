

using Npgsql.Replication;

namespace ReceptionOfPatients
{
    public class Service
    {
        
        public int Id { get; set; }

        public Double Price { get; set; }
        public string ServiceName { get; set; } = null!;

        public List<Doctor?> Doctors { get; set; } = new();
        public List<Patient?> Patients { get; set; } = new();
        public List<ReceptionResult?> ReceptionResults { get; set; } = new();

        public Service CreateJsonObject()
        {
            Service result = new Service();

            result.Id = Id;
            result.Price = Price;
            result.ServiceName = ServiceName;

            foreach (var doctor in Doctors)
            {
                result.Doctors.Add(new Doctor()
                {
                    Id = doctor?.Id ?? 0,
                    Name = doctor?.Name ?? "",
                    Surname = doctor?.Surname ?? "",
                    FatherName = doctor?.FatherName ?? "",
                    OfficeNumber = doctor?.OfficeNumber ?? "",
                    Specialization = doctor?.Specialization ?? "",
                    StartWorkDate = doctor?.StartWorkDate ?? DateTime.Now
                });
            }
            foreach (var patient in Patients)
            {
                result.Patients.Add(new Patient()
                {
                    Id = patient?.Id ?? 0,
                    Name = patient?.Name ?? "",
                    Surname = patient?.Surname ?? "",
                    FatherName = patient?.FatherName ?? "",
                    Address = patient?.Address ?? "",
                    BirthDate = patient?.BirthDate ?? DateTime.Now,
                    PhoneNumber = patient?.PhoneNumber ?? ""
                });
            }
            foreach (var resResult in ReceptionResults)
            {
                result.ReceptionResults.Add(resResult);
            }


            return result;
        }
    }
}
