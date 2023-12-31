﻿using System.Text.Encodings.Web;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Text.Unicode;

namespace ReceptionOfPatients
{
    public class PatientMiddleware
    {
        private RequestDelegate _next;
        private AppContext _appContext;

        public PatientMiddleware(RequestDelegate next, AppContext appContext)
        {
            _next = next;
            _appContext = appContext;
        }

        public async Task InvokeAsync(HttpContext context, CrudPatientServices services)
        {
            HttpResponse response = context.Response;
            HttpRequest request = context.Request;
            JsonSerializerOptions options = new()
            {
                Encoder = JavaScriptEncoder.Create(UnicodeRanges.BasicLatin, UnicodeRanges.Cyrillic),
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                
                WriteIndented = true,

            };
            if (request.Path == "/patient")
            {
                var operation = request.Query["operation"];

                switch (operation)
                {
                    case "read_page":

                        response.ContentType = "text/html; charset=utf-8";
                        await response.SendFileAsync("C:..\\ReceptionOfPatients\\wwwroot\\html\\patient.html");

                        break;

                    case "create":
                        services.Create(_appContext, await request.ReadFromJsonAsync<Patient>());
                        break;

                    case "update":
                        services.Update(_appContext, await request.ReadFromJsonAsync<Patient>());
                        break;

                    case "delete":
                        services.Delete(_appContext, await request.ReadFromJsonAsync<int>());
                        break;

                    case "read":
                        await response.WriteAsJsonAsync(services.Read(_appContext), options);
                        break;

                    case "read_doctors":

                        await response.WriteAsJsonAsync(services.GetDoctors(_appContext, await request.ReadFromJsonAsync<int>()), options);
                        break;

                    default:
                        await response.WriteAsJsonAsync(new ErrorClass() { Name = "Patient error", Description = "Unexpected operation" });
                        break;
                }
            }
            else
                await _next.Invoke(context);
        }
    }
}
