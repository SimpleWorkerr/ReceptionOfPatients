using Microsoft.EntityFrameworkCore;

namespace ReceptionOfPatients
{
    public class CrudServiceServices : ICRUDUtilitis<Service>
    {
        public void CreateRange(AppContext context, IEnumerable<Service>? values)
        {
            if (values != null)
            {

                context.Services.AddRange(values);

                context.SaveChanges();
            }
        }

        public void DeleteRange(AppContext context, IEnumerable<int>? indexes)
        {
            if (indexes != null)
            {

                foreach (int index in indexes)
                    context.Services.Remove(context.Services.First(ser => ser.Id == index));

                context.SaveChanges();
            }
        }

        public List<Service> Read(AppContext context)
        {
            var tempValue = context.Services;

            return tempValue.ToList();
        }

        public void UpdateRange(AppContext context, IEnumerable<Service>? values)
        {
            if (values != null)
            {
                context.Services.UpdateRange(values);
                context.SaveChanges();

            }
        }

        public List<Doctor> GetDoctorsByService(AppContext context, int serviceId)
        {
            List<Doctor> docRes = new List<Doctor>();

            foreach(var doc in context.Doctors)
            {
                foreach (var serv in doc.Services)
                {
                    if (serv.Id == serviceId)
                    {
                        docRes.Add(doc);
                        break;
                    }
                }
            }

            return docRes;
        }

        public List<Patient> GetPatientsByService(AppContext context, int serviceId)
        {
            List<Patient> patRes = new List<Patient>();

            foreach (var doc in GetDoctorsByService(context, serviceId))
                patRes.AddRange(doc.Patients);

            return patRes;
        }
    }
}
