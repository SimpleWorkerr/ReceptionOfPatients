using Microsoft.EntityFrameworkCore;

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
            var tempValue = context.ReceptionResults;

            return tempValue.ToList();
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
