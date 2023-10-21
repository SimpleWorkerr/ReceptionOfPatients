namespace ReceptionOfPatients
{
    public class Service
    {
        public int Id { get; set; }

        public Double Price { get; set; }
        public string ServiceName { get; set; } = null!;

        public List<Doctor> Doctor { get; set; } = new();
    }
}
