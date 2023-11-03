using Microsoft.EntityFrameworkCore;

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

        public void Delete(AppContext context, int index)
        {


            context.Patients.Remove(context.Patients.First(pat => pat.Id == index));

            context.SaveChanges();
        }


        public List<Patient> Read(AppContext context)
        {
            var tempValue = context.Patients;

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
