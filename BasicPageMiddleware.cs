namespace ReceptionOfPatients
{
    public class BasicPageMiddleware
    {
        private RequestDelegate _next;
        private AppContext _appContext;

        public BasicPageMiddleware(RequestDelegate next, AppContext appContext)
        {
            _next = next;
            _appContext = appContext;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            context.Response.ContentType = "text/html; charset=utf-8";
            await context.Response.SendFileAsync("C:..\\ReceptionOfPatients\\wwwroot\\index.html");
        }
    }
}
