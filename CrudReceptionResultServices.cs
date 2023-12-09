using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace ReceptionOfPatients
{
    public class CrudReceptionResultServices : ICRUDUtilitis<ReceptionResult>
    {
        public void Create(AppContext context, ReceptionResult? valuу)
        {
            throw new NotImplementedException("Такая операция не подразумевается");
        }

        public void Delete(AppContext context, int index)
        {

            context.ReceptionResults.Remove(context.ReceptionResults.First(ser => ser.Id == index));

            context.SaveChanges();

        }

        public List<ReceptionResult> Read(AppContext context)
        {
            var tempValue = (from rec in context.ReceptionResults.Include(rec => rec.Services).Include(rec => rec.Patient).Include(rec => rec.Doctor) select rec.CreateJsonObject()).ToList();

            Console.WriteLine(JsonSerializer.Serialize(tempValue, new JsonSerializerOptions() { WriteIndented = true}));

            return tempValue;
        }

        public void Update(AppContext context, ReceptionResult? value)
        {
            if (value != null)
            {
                context.ReceptionResults.UpdateRange(value);
                context.SaveChanges();

            }
        }
    }
}
