using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ReceptionOfPatients
{
    public class CrudServiceServices : ICRUDUtilitis<Service>
    {
        public void Create(AppContext context, Service? value)
        {
            if (value != null)
            {

                context.Services.AddRange(value);

                context.SaveChanges();
            }
        }

        public void Delete(AppContext context, int index)
        {

            context.Services.Remove(context.Services.First(ser => ser.Id == index));

            context.SaveChanges();
        }


        public List<Service> Read(AppContext context)
        {
            var tempValue = context.Services.ToList();

            List<Service> servicesResult = new List<Service>();

            foreach (var service in tempValue)
            {
                service.Doctors = new List<Doctor?>();
                service.Patients = new List<Patient?>();

                servicesResult.Add(service);
            }

            return servicesResult;
        }

        public void Update(AppContext context, Service? value)
        {
            if (value != null)
            {
                Service dbService = context.Services.First(ser => ser.Id == value.Id);

                dbService.ServiceName = value.ServiceName;
                dbService.Price = value.Price;

                context.SaveChanges();
            }
        }

        public List<Doctor?> GetDoctorsByService(AppContext context, int serviceId)
        {
            List<Doctor?> docRes = new List<Doctor?>();

            foreach(var value in context.Services.Include(ser => ser.Doctors))
            {
                if(value.Id == serviceId)
                {
                    docRes = value.Doctors;
                    break;
                }
            }

            return docRes;
        }

        public List<Patient?> GetPatientsByService(AppContext context, int serviceId)
        {
            List<Patient?> patRes = new List<Patient?>();

            foreach (var value in context.Services.Include(ser => ser.Patients))
            {
                if (value.Id == serviceId)
                {
                    patRes = value.Patients;
                    break;
                }
            }
            return patRes;
        }
    }
}
