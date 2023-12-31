﻿using System.Text.Encodings.Web;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Text.Unicode;

namespace ReceptionOfPatients
{
    public class ReceptionMiddleware
    {
        private RequestDelegate _next;
        private AppContext _appContext;

        public ReceptionMiddleware(RequestDelegate next, AppContext appContext)
        {
            _next = next;
            _appContext = appContext;
        }

        public async Task InvokeAsync(HttpContext context, CrudReceptionServices services)
        {
            HttpResponse response = context.Response;
            HttpRequest request = context.Request;

            JsonSerializerOptions options = new()
            {
                Encoder = JavaScriptEncoder.Create(UnicodeRanges.BasicLatin, UnicodeRanges.Cyrillic),
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true,

            };

            if (request.Path == "/reception")
            {
                var operation = request.Query["operation"];

                switch (operation)
                {

                    case "read_page":

                        response.ContentType = "text/html; charset=utf-8";
                        await response.SendFileAsync("C:..\\ReceptionOfPatients\\wwwroot\\html\\current-appointments.html");

                        break;


                    case "create":


                        services.Create(_appContext, await request.ReadFromJsonAsync<Reception>());

                        break;

                    case "update":

                        services.Update(_appContext, await request.ReadFromJsonAsync<Reception>());

                        break;

                    case "finish":

                        services.Finish(_appContext, await request.ReadFromJsonAsync<ReceptionResult>());

                        break;

                    case "delete":

                        services.Delete(_appContext, await request.ReadFromJsonAsync<int>());

                        break;

                    case "read":

                        await response.WriteAsJsonAsync(services.Read(_appContext), options);

                        break;
                    case "read_patient":

                        //await response.WriteAsJsonAsync(services.GetDoctorByReceptionId(_appContext, await request.ReadFromJsonAsync<int>()), options);
                        await response.WriteAsJsonAsync(services.GetPatientByReceptionId(_appContext, 1), options);

                        break;

                    case "read_doctor":

                        //await response.WriteAsJsonAsync(services.GetDoctorByReceptionId(_appContext, await request.ReadFromJsonAsync<(int, int)>()), options);
                        await response.WriteAsJsonAsync(services.GetDoctorByReceptionId(_appContext, 1), options);

                        break;


                    default:
                        await response.WriteAsJsonAsync(new ErrorClass() { Name = "Reception error", Description = "Unexpected operation" });
                        break;
                }
            }
            else
                await _next.Invoke(context);
        }
    }
}
