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

            result.Doctor = Doctor?.CreateJsonObject();

            result.Patient = Patient?.CreateJsonObject();

            return result;
        }
    }
}
