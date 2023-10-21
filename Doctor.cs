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
    }
}
