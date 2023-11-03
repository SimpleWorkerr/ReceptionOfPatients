﻿using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ReceptionOfPatients
{
    public class CrudDoctorServices : ICRUDUtilitis<Doctor>
    {
        public void CreateRange(AppContext context, IEnumerable<Doctor>? values)
        {
            if (values != null)
            {

                context.Doctors.AddRange(values);

                context.SaveChanges();
            }
        }

        public void DeleteRange(AppContext context, IEnumerable<int>? indexes)
        {
            if (indexes != null)
            {

                foreach (int index in indexes)
                    context.Doctors.Remove(context.Doctors.First(doc => doc.Id == index));

                context.SaveChanges();
            }
        }

        public List<Doctor> Read(AppContext context)
        {
            var tempValue = context.Doctors.Include(doc => doc.Services);

            return tempValue.ToList();
        }

        public void UpdateRange(AppContext context, IEnumerable<Doctor>? values)
        {
            if (values != null)
            {
                context.Doctors.UpdateRange(values);
                context.SaveChanges();

            }
        }

        public List<Patient> GetDoctors(AppContext context, int doctorId)
        {
            var tempValue = from reception in context.Receptions
                            where reception.DoctorId == doctorId
                            select reception.Patient;

            return tempValue.ToList();
        }
    }
}
