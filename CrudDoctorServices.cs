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
                Doctor tempDoc = new Doctor()
                {
                    Name = value.Name,
                    FatherName = value.FatherName,
                    Surname = value.Surname,
                    StartWorkDate = value.StartWorkDate,
                    OfficeNumber = value.OfficeNumber,
                    Specialization = value.Specialization
                };

                for(int i = 0; i< value.Services.Count; i++)
                    tempDoc.Services.Add(context.Services.First(service => service.Id == value.Services[i].Id));
    
                for(int i = 0; i< value.Patients.Count; i++)
                    tempDoc.Patients.Add(context.Patients.First(patient => patient.Id == value.Patients[i].Id));

                context.Doctors.Add(tempDoc);

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
                Doctor dbDoctor = context.Doctors.First(doc => doc.Id == value.Id);

                dbDoctor.Name = value.Name;
                dbDoctor.Surname = value.Surname;
                dbDoctor.FatherName = value.FatherName;
                dbDoctor.OfficeNumber = value.OfficeNumber;
                dbDoctor.StartWorkDate = value.StartWorkDate;

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
    }
}
