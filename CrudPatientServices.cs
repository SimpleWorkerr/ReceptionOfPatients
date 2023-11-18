using Microsoft.EntityFrameworkCore;

namespace ReceptionOfPatients
{
    public class CrudPatientServices : ICRUDUtilitis<Patient>
    {
        public void Create(AppContext context, Patient? value)
        {
            if (value != null)
            {

                context.Patients.AddRange(value);

                context.SaveChanges();
            }
        }

        public void Delete(AppContext context, int index)
        {


            context.Patients.Remove(context.Patients.First(pat => pat.Id == index));

            context.SaveChanges();
        }


        public List<Patient> Read(AppContext context)
        {
            var tempValue = context.Patients.Include(pat => pat.Doctors).Include(pat => pat.Services).Include(pat => pat.Receptions);

            return tempValue.ToList();
        }

        public void Update(AppContext context, Patient? value)
        {
            if (value != null)
            {
                context.Patients.UpdateRange(value);
                context.SaveChanges();

            }
        }

        public List<Doctor> GetDoctors(AppContext context, int patientId)
        {
            var tempValue = from rec in context.Receptions
                            where rec.PatientId == patientId
                            select rec.Doctor;

            return tempValue.ToList();
        }
    }
}
