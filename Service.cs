

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
                result.Doctors.Add(doctor?.CreateJsonObject());
            }
            foreach (var patient in Patients)
            {
                result.Patients.Add(patient?.CreateJsonObject());
            }
            //foreach (var resResult in ReceptionResults)
            //{
            //    result.ReceptionResults.Add(resResult);
            //}


            return result;
        }
    }
}
