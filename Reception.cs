using System.ComponentModel.DataAnnotations.Schema;
namespace ReceptionOfPatients
{
    public class Reception
    {
        public DateTime ReceptionDate { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        //Доктор
        public int DoctorId { get; set; }
        public Doctor? Doctor { get; set; }
        //Пациент
        public int PatientId { get; set; }
        public Patient? Patient { get; set; }

        public int? ReceptionResultId { get; set; }
        public ReceptionResult? ReceptionResult { get; set; }

        public Reception CreateJsonObject()
        {
            Reception result = new Reception();

            result.Id = Id;
            result.DoctorId = DoctorId;
            result.PatientId = PatientId;
            result.ReceptionResultId = ReceptionResultId;

            result.Doctor = new Doctor()
            {
                Id = Doctor?.Id ?? 0,
                Name = Doctor?.Name ?? "",
                Surname = Doctor?.Surname ?? "",
                FatherName = Doctor?.FatherName ?? "",
                StartWorkDate = Doctor?.StartWorkDate ?? DateTime.Now,
                OfficeNumber = Doctor?.OfficeNumber ?? "",
                Specialization = Doctor?.Specialization ?? ""
            };

            result.Patient = new Patient()
            {
                Id = Patient?.Id ?? 0,
                Name = Patient?.Name ?? "",
                Surname = Patient?.Surname ?? "",
                FatherName = Patient?.FatherName ?? "",
                BirthDate = Patient?.BirthDate ?? DateTime.Now,
                Address = Patient?.Address ?? "",
                PhoneNumber = Patient?.PhoneNumber ?? ""
            };

            return result;
        }
    }
}
