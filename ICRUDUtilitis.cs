namespace ReceptionOfPatients
{
    public interface ICRUDUtilitis<T>
    {
        public void CreateRange(AppContext context, IEnumerable<T> values);
        
        public void Update(AppContext context, T value);
        
        public void Delete(AppContext context, int index);

        public List<T> Read(AppContext context);
    }
}
