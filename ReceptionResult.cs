using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace ReceptionOfPatients
{
    public class ReceptionResult
    {
        public int Id { get; set; }
        public string? Decsription { get; set; }
        public string? Recomendation { get; set; }
        public string? Diagnosis { get; set; }
        public string? Medicines { get; set; }
        public string? UsesServices { get; set; }

        public string? DoctorInfo { get; set; }
        public string? PatientInfo { get; set; }

        public int? ReceptionId { get; set; }
        public Reception? Reception { get; set; }
    }
}
