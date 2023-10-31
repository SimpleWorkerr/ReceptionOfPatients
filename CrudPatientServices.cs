﻿using Microsoft.EntityFrameworkCore;

namespace ReceptionOfPatients
{
    public class CrudPatientServices : ICRUDUtilitis<Patient>
    {
        public void CreateRange(AppContext context, IEnumerable<Patient>? values)
        {
            if (values != null)
            {

                context.Patients.AddRange(values);

                context.SaveChanges();
            }
        }

        public void DeleteRange(AppContext context, IEnumerable<int>? indexes)
        {
            if (indexes != null)
            {

                foreach (int index in indexes)
                    context.Patients.Remove(context.Patients.First(pat => pat.Id == index));

                context.SaveChanges();
            }
        }

        public List<Patient> Read(AppContext context)
        {
            var tempValue = context.Patients.Include(pat => pat.Receptions);

            return tempValue.ToList();
        }

        public void UpdateRange(AppContext context, IEnumerable<Patient>? values)
        {
            if (values != null)
            {
                context.Patients.UpdateRange(values);
                context.SaveChanges();

            }
        }
    }
}