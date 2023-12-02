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
            var tempValue = context.Patients.ToList();

            List<Patient> patientsResult = new List<Patient>();

            foreach (var pat in tempValue)
            {
                pat.Services = new List<Service?>();
                pat.Doctors = new List<Doctor>();
                pat.Receptions = new List<Reception>();

                patientsResult.Add(pat);
            }

            return patientsResult;
        }

        public void Update(AppContext context, Patient? value)
        {
            if (value != null)
            {
                Patient dbPatient = context.Patients.First(pat => pat.Id == value.Id);

                dbPatient.Name = value.Name;
                dbPatient.Surname = value.Surname;
                dbPatient.FatherName = value.FatherName;
                dbPatient.Address = value.Address;
                dbPatient.PhoneNumber = value.PhoneNumber;
                dbPatient.BirthDate = value.BirthDate;

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
