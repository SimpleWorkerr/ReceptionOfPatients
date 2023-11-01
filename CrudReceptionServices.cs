using Microsoft.EntityFrameworkCore;

namespace ReceptionOfPatients
{
    public class CrudReceptionServices : ICRUDUtilitis<Reception>
    {
        public void CreateRange(AppContext context, IEnumerable<Reception>? values)
        {
            if (values != null)
            {

                context.Receptions.AddRange(values);

                context.SaveChanges();
            }
        }

        public void DeleteRange(AppContext context, IEnumerable<int>? indexes)
        {
            if (indexes != null)
            {

                foreach (int index in indexes)
                    context.Receptions.Remove(context.Receptions.First(rec => rec.Id == index));

                context.SaveChanges();
            }
        }
        public void FinishRange(AppContext context, IEnumerable<ReceptionResult>? values)
        {
            if (values != null)
            {
                context.ReceptionResults.AddRange(values);

                context.SaveChanges();
            }
        }

        public List<Reception> Read(AppContext context)
        {
            var tempValue = context.Receptions;

            return tempValue.ToList();
        }

        public void UpdateRange(AppContext context, IEnumerable<Reception>? values)
        {
            if (values != null)
            {
                context.Receptions.UpdateRange(values);
                context.SaveChanges();

            }
        }
    }
}
