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
            var tempValue = context.Doctors.ToList();

            List<Doctor?> doctorsResult = new List<Doctor?>();

            foreach(var doc in tempValue)
            {
                doc.Patients = new List<Patient>();
                doc.Services = new List<Service>();
                doc.Receptions = new List<Reception>();

                doctorsResult.Add(doc);
            }

            return doctorsResult;
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

                dbDoctor.Services.Clear();
                dbDoctor.Patients.Clear();

                var patientsList = context.Patients.ToList();
                var serviceList = context.Services.ToList();

                for (int i = 0; i < patientsList.Count(); i++)
                    if (HasId(value.Patients, patientsList[i]))
                        dbDoctor.Patients.Add(patientsList[i]);

                for(int i = 0; i < serviceList.Count(); i++)
                    if(HasId(value.Services, serviceList[i]))
                        dbDoctor.Services.Add(serviceList[i]);

                context.SaveChanges();
            }
        }

        public List<Patient> GetPatients(AppContext context, int doctorId)
        {
            var tempValue = from reception in context.Receptions
                            where reception.DoctorId == doctorId
                            select reception.Patient;

            return tempValue.ToList();
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
