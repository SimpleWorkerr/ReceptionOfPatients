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

            List<Patient> result = new List<Patient>();

            foreach (var pat in tempValue)
            {
                result.Add(pat.CreateJsonObject());
            }

            return result;
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

                List<Doctor> doctorsRemove = new List<Doctor>();
                List<Doctor> doctorsAdd = new List<Doctor>();

                foreach (var dbDoctor in dbPatient.Doctors)
                    if (!HasId(value.Doctors, dbDoctor))
                        doctorsRemove.Add(context.Doctors.First((doc) => doc.Id == dbDoctor.Id));

                foreach (var webDoctor in value.Doctors)
                    if (!HasId(dbPatient.Doctors, webDoctor))
                        doctorsAdd.Add(context.Doctors.First((doc) => doc.Id == webDoctor.Id));

                foreach(var doctor in doctorsRemove)
                    dbPatient.Doctors.Remove(doctor);

                foreach (var doctor in doctorsAdd)
                    dbPatient.Doctors.Add(doctor);

                context.SaveChanges();
            }
        }

        public List<Doctor> GetDoctors(AppContext context, int patientId)
        {
            var tempValue = from rec in context.Receptions
                            where rec.PatientId == patientId
                            select rec.Doctor;

            List<Doctor> result = new List<Doctor>();

            foreach (var doc in tempValue)
            {
                result.Add(doc.CreateJsonObject());
            }

            return result.ToList();
        }

        private bool HasId(List<Doctor> doctors, Doctor doctor)
        {
            foreach (var tempPatient in doctors)
            {
                if (tempPatient.Id == doctor.Id)
                    return true;
            }

            return false;
        }
    }
}
