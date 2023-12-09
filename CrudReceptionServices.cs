using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace ReceptionOfPatients
{
    public class CrudReceptionServices : ICRUDUtilitis<Reception>
    {
        public void Create(AppContext context, Reception? value)
        {
            if (value != null)
            {

                context.Receptions.AddRange(value);

                context.SaveChanges();
            }
        }

        public void Delete(AppContext context, int index)
        {

            context.Receptions.Remove(context.Receptions.First(rec => rec.Id == index));

            context.SaveChanges();

        }
        public void Finish(AppContext context, ReceptionResult? value)
        {
            if (value != null)
            {
                ReceptionResult dbReceptionResult = new ReceptionResult()
                {
                    Decsription = value.Decsription,
                    Recomendation = value.Recomendation,
                    Doctor = context.Doctors.First(doc => doc.Id == value.DoctorId),
                    Patient = context.Patients.First(pat => pat.Id == value.PatientId),
                };

                foreach(var service in value.Services)
                {
                    if(service != null)
                        dbReceptionResult.Services.Add(context.Services.First(serv => serv.Id == service.Id));
                }


                context.Receptions.Remove(context.Receptions.First(rec => rec.Id == value.ReceptionId));

                context.ReceptionResults.Add(dbReceptionResult);

                context.SaveChanges();
            }
        }

        public List<Reception> Read(AppContext context)
        {
            var tempValue = context.Receptions.Include(rec => rec.Patient).Include(rec => rec.Doctor);

            List<Reception> result = new List<Reception>();

            foreach (var rec in tempValue)
            {
                result.Add(rec.CreateJsonObject());
            }

            return result;
        }

        public void Update(AppContext context, Reception? value)
        {
            if (value != null)
            {
                context.Receptions.UpdateRange(value);
                context.SaveChanges();
            }
        }

        public Doctor? GetDoctorByReceptionId(AppContext context, int receptionId)
        {
            var receptionRes = context.Receptions.FirstOrDefault(rec => rec.Id == receptionId);

            return receptionRes?.Doctor?.CreateJsonObject();
        }

        public Patient? GetPatientByReceptionId(AppContext context, int receptionId)
        {
            var receptionRes = context.Receptions.FirstOrDefault(rec => rec.Id == receptionId);

            return receptionRes?.Patient?.CreateJsonObject();
        }
    }
}
