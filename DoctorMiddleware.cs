using Azure.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using System;
using System.ComponentModel;
using System.ComponentModel.Design.Serialization;
using System.Linq.Expressions;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Unicode;

namespace ReceptionOfPatients
{
    public class DoctorMiddleware
    {
        private RequestDelegate _next;
        private AppContext _appContext;

        public DoctorMiddleware(RequestDelegate next, AppContext appContext)
        {
            _next = next;
            _appContext = appContext;
        }

        public async Task InvokeAsync(HttpContext context, CrudDoctorServices services)
        {
            HttpResponse response = context.Response;
            HttpRequest request = context.Request;

            JsonSerializerOptions options = new()
            {
                Encoder = JavaScriptEncoder.Create(UnicodeRanges.BasicLatin, UnicodeRanges.Cyrillic),
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true,

            };

            if (request.Path == "/doctor")
            {
                var operation = request.Query["operation"];

                switch (operation)
                {
                    case "read_page":

                        response.ContentType = "text/html; charset=utf-8";
                        await response.SendFileAsync("C:..\\ReceptionOfPatients\\wwwroot\\html\\doctor.html");

                        break;

                    case "create":

                        services.Create(_appContext, await request.ReadFromJsonAsync<Doctor>());

                        break;

                    case "update":

                        services.Update(_appContext, await request.ReadFromJsonAsync<Doctor>());

                        break;

                    case "delete":

                        services.Delete(_appContext, await request.ReadFromJsonAsync<int>());

                        break;

                    case "read":

                        await response.WriteAsJsonAsync(services.Read(_appContext), options);

                        break;

                    case "read_patients":

                        List<Patient> patients = services.GetPatients(_appContext, await request.ReadFromJsonAsync<int>());

                        foreach (var patient in patients)
                        {
                            Console.WriteLine(patient.Name);
                        }

                        await response.WriteAsJsonAsync(patients, options);

                        break;
                        
                    default:
                        await response.WriteAsJsonAsync(new ErrorClass() { Name = "Doctor error", Description = "Unexpected operation" });
                        break;
                }
            }
            else
                await _next.Invoke(context);
        }
    }
}
