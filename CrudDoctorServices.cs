using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ReceptionOfPatients
{
    public class CrudDoctorServices : ICRUDUtilitis<Doctor>
    {
        public void Create(AppContext context, Doctor? value)
        {
            if (value != null)
            {

                context.Doctors.AddRange(value);

                context.SaveChanges();
            }
        }

        public void Delete(AppContext context, int index)
        {
            context.Doctors.Remove(context.Doctors.First(doc => doc.Id == index));
            context.SaveChanges();
        }

        public List<Doctor> Read(AppContext context)
        {
            var tempValue = context.Doctors.Include(doc => doc.Services).Include(doc => doc.Patients).Include(doc => doc.Receptions);

            return tempValue.ToList();
        }

        public void Update(AppContext context, Doctor? value)
        {

            if (value != null)
            {
                context.Doctors.Update(value);

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
