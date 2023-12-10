using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;
using System.Text.Json.Serialization;

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
            var tempValue = context.Services.Include(serv => serv.Patients).Include(serv => serv.Doctors);

            List<Service> result = new List<Service>();

            foreach (var service in tempValue)
            {
                result.Add(service.CreateJsonObject());
            }

            return result;
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
                    foreach(var doctor in value.Doctors)
                    {
                        docRes.Add(doctor?.CreateJsonObject() ?? new Doctor());
                    }
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
                    foreach (var patient in value.Patients)
                    {
                        patRes.Add(patient?.CreateJsonObject() ?? new Patient());
                    }
                    break;
                }
            }

            Console.Write(JsonSerializer.Serialize(patRes, new JsonSerializerOptions() { WriteIndented = true}));

            return patRes;
        }
    }
}
