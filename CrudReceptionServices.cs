﻿using Microsoft.EntityFrameworkCore;

namespace ReceptionOfPatients
{
    public class CrudReceptionServices : ICRUDUtilitis<Reception>
    {
        public void CreateRange(AppContext context, IEnumerable<Reception>? values)
        {
            if (values != null)
            {

                context.Receptions.AddRange(values);

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
                context.ReceptionResults.AddRange(value);

                context.SaveChanges();
            }
        }

        public List<Reception> Read(AppContext context)
        {
            var tempValue = context.Receptions;

            return tempValue.ToList();
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

            return receptionRes?.Doctor;
        }

        public Patient? GetPatientByReceptionId(AppContext context, int receptionId)
        {
            var receptionRes = context.Receptions.FirstOrDefault(rec => rec.Id == receptionId);

            return receptionRes?.Patient;
        }
    }
}
