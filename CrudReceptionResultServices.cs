using Microsoft.EntityFrameworkCore;

namespace ReceptionOfPatients
{
    public class CrudReceptionResultServices:ICRUDUtilitis<ReceptionResult>
    {
        public void CreateRange(AppContext context, IEnumerable<ReceptionResult>? values)
        {
            throw new NotImplementedException("Такая операция не подразумевается");
        }

        public void DeleteRange(AppContext context, IEnumerable<int>? indexes)
        {
            if (indexes != null)
            {

                foreach (int index in indexes)
                    context.ReceptionResults.Remove(context.ReceptionResults.First(ser => ser.Id == index));

                context.SaveChanges();
            }
        }

        public List<ReceptionResult> Read(AppContext context)
        {
            var tempValue = context.ReceptionResults;

            return tempValue.ToList();
        }

        public void UpdateRange(AppContext context, IEnumerable<ReceptionResult>? values)
        {
            if (values != null)
            {
                context.ReceptionResults.UpdateRange(values);
                context.SaveChanges();

            }
        }
    }
}
