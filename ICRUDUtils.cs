namespace ReceptionOfPatients
{
    public interface ICRUDUtils
    {
        public void CreateData(AppContext appContext);
        public void ReadData(AppContext appContext);
        public void UpdateData(AppContext appContext);
        public void DeleteData(AppContext appContext);

    }
}
