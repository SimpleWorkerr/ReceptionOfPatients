using System.Text.Encodings.Web;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Text.Unicode;

namespace ReceptionOfPatients
{
    public class ServiceMiddleware
    {
        private RequestDelegate _next;
        private AppContext _appContext;

        public ServiceMiddleware(RequestDelegate next, AppContext appContext)
        {
            _next = next;
            _appContext = appContext;
        }

        public async Task InvokeAsync(HttpContext context, CrudServiceServices services)
        {
            HttpResponse response = context.Response;
            HttpRequest request = context.Request;

            JsonSerializerOptions options = new()
            {
                Encoder = JavaScriptEncoder.Create(UnicodeRanges.BasicLatin, UnicodeRanges.Cyrillic),
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true,

            };

            if (request.Path == "/service")
            {
                var operation = request.Query["operation"];

                switch (operation)
                {
                    case "create":


                        services.CreateRange(_appContext, await request.ReadFromJsonAsync<List<Service>>());

                        break;

                    case "update":

                        services.Update(_appContext, await request.ReadFromJsonAsync<Service>());

                        break;

                    case "delete":

                        services.Delete(_appContext, await request.ReadFromJsonAsync<int>());

                        break;

                    case "read":

                        await response.WriteAsJsonAsync(services.Read(_appContext), options);

                        break;

                    case "read_patients":
                        //await response.WriteAsJsonAsync(services.GetPatientsByService(_appContext, await request.ReadFromJsonAsync<int>()), options);

                        await response.WriteAsJsonAsync(services.GetPatientsByService(_appContext, 1), options);

                        break;

                    case "read_doctors":

                        //await response.WriteAsJsonAsync(services.GetPatientsByService(_appContext, await request.ReadFromJsonAsync<int>()), options);
                        await response.WriteAsJsonAsync(services.GetDoctorsByService(_appContext, 1), options);

                        break;

                    default:
                        await response.WriteAsJsonAsync(new ErrorClass() { Name = "Service error", Description = "Unexpected operation" });
                        break;
                }
            }
            else
                await _next.Invoke(context);
        }
    }
}
