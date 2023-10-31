namespace ReceptionOfPatients
{
    public interface ICRUDUtilitis<T>
    {
        public void CreateRange(AppContext context, IEnumerable<T> values);
        
        public void UpdateRange(AppContext context, IEnumerable<T> values);
        
        public void DeleteRange(AppContext context, IEnumerable<int> indexes);

        public List<T> Read(AppContext context);
    }
}
