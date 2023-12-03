using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Immutable;
using System.Linq;

namespace ReceptionOfPatients
{
    public class CrudDoctorServices : ICRUDUtilitis<Doctor>
    {
        public void Create(AppContext context, Doctor? value)
        {
            if (value != null)
            {
                Doctor dbDoctor = new Doctor()
                {
                    Name = value.Name,
                    FatherName = value.FatherName,
                    Surname = value.Surname,
                    StartWorkDate = value.StartWorkDate,
                    OfficeNumber = value.OfficeNumber,
                    Specialization = value.Specialization
                };

                for(int i = 0; i< value.Services.Count; i++)
                    dbDoctor.Services.Add(context.Services.First(service => service.Id == value.Services[i].Id));
    
                for(int i = 0; i< value.Patients.Count; i++)
                    dbDoctor.Patients.Add(context.Patients.First(patient => patient.Id == value.Patients[i].Id));

                context.Doctors.Add(dbDoctor);

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
            var tempValue = context.Doctors.Include(doc => doc.Patients).Include(doc => doc.Services).ToList();

            List<Doctor> result = new List<Doctor>();

            foreach(var doc in tempValue)
            {
                result.Add(doc.CreateJsonObject());
            }

            return result;
        }

        public void Update(AppContext context, Doctor? value)
        {

            if (value != null)
            {
                Doctor dbDoctor = context.Doctors.First(doc => doc.Id == value.Id);

                dbDoctor.Name = value.Name;
                dbDoctor.Surname = value.Surname;
                dbDoctor.FatherName = value.FatherName;
                dbDoctor.OfficeNumber = value.OfficeNumber;
                dbDoctor.StartWorkDate = value.StartWorkDate;


                List<Patient> patientsRemove = new List<Patient>();
                List<Patient> patientsAdd = new List<Patient>();

                foreach (var dbPatient in dbDoctor.Patients)
                    if (!HasId(value.Patients, dbPatient))
                        patientsRemove.Add(context.Patients.First((pat) => pat.Id == dbPatient.Id));

                foreach (var webPatient in value.Patients)
                    if (!HasId(dbDoctor.Patients, webPatient))
                        patientsAdd.Add(context.Patients.First((pat) => pat.Id == webPatient.Id));

                foreach(var patient in patientsRemove)
                    dbDoctor.Patients.Remove(patient);

                foreach (var patient in patientsAdd)
                    dbDoctor.Patients.Add(patient);


                List<Service> servicesRemove = new List<Service>();
                List<Service> servicesAdd = new List<Service>();

                foreach (var dbService in dbDoctor.Services)
                    if (!HasId(value.Services, dbService))
                        servicesRemove.Add(context.Services.First((ser) => ser.Id == dbService.Id));

                foreach (var webService in value.Services)
                    if (!HasId(dbDoctor.Services, webService))
                        servicesAdd.Add(context.Services.First((ser) => ser.Id == webService.Id));

                foreach (var service in servicesRemove)
                    dbDoctor.Services.Remove(service);

                foreach (var service in servicesAdd)
                    dbDoctor.Services.Add(service);

                context.SaveChanges();
            }
        }

        public List<Patient> GetPatients(AppContext context, int doctorId)
        {
            var tempValue = from reception in context.Receptions
                            where reception.DoctorId == doctorId
                            select reception.Patient;

            List<Patient> result = new List<Patient>();

            foreach (var pat in tempValue)
            {
                result.Add(pat.CreateJsonObject());
            }

            return result;
        }

        private bool HasId(List<Patient> patients, Patient patient)
        {
            foreach(var tempPatient in patients)
            {
                if(tempPatient.Id == patient.Id)
                    return true;
            }

            return false;
        }
        private bool HasId(List<Service> services, Service service)
        {
            foreach (var tempService in services)
            {
                if (tempService.Id == service.Id)
                    return true;
            }

            return false;
        }
    }
}
