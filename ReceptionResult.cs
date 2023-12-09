using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using ReceptionOfPatients.wwwroot.css;

namespace ReceptionOfPatients
{
    public class ReceptionResult
    {
        public int Id { get; set; }
        public string? Decsription { get; set; }
        public string? Recomendation { get; set; }

        public int? DoctorId { get; set; }
        public Doctor? Doctor { get; set; }
        public int? PatientId { get; set; }
        public Patient? Patient { get; set; }

        public int? ReceptionId { get; set; }
        public Reception? Reception { get; set; }

        public int? DiagnozId { get; set; }
        public Diagnoz? Diagnoz { get; set; }

        public List<Service?> Services { get; set; } = new();

        public ReceptionResult CreateJsonObject()
        {
            ReceptionResult result = new ReceptionResult();

            result.Id = Id;
            result.Decsription = Decsription;
            result.Recomendation = Recomendation;
            result.DoctorId = DoctorId;
            result.PatientId = PatientId;
            result.DiagnozId = DiagnozId;
            
            foreach(var resSercice in Services)
            {
                result.Services.Add(resSercice?.CreateJsonObject());
            }    

            return result;
        }
    }
}
