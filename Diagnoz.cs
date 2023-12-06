namespace ReceptionOfPatients.wwwroot.css
{
    public class Diagnoz
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public List<ReceptionResult?> Results { get; set; } = new();

        public Diagnoz CreateJsonObject()
        {
            Diagnoz result = new Diagnoz();

            result.Id = Id;
            result.Name = Name;

            foreach(var recResult in Results)
            {
                result.Results.Add(recResult?.CreateJsonObject());
            }

            return result;
        }
    }
}
