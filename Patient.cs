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
    }
}
