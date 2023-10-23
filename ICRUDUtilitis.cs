namespace ReceptionOfPatients
{
    public interface ICRUDUtilitis<T>
    {
        public void CreateRange(AppContext context, IEnumerable<Doctor> values);
        
        public void UpdateRange(AppContext context, IEnumerable<Doctor> values);
        
        public void DeleteRange(AppContext context, IEnumerable<int> indexes);

        public List<Doctor> Read(AppContext context);
    }
}
