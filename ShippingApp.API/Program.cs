using ShippingApp.Business.Services;
using ShippingApp.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

// ── Servicios ──────────────────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Inyección de dependencias por capas
builder.Services.AddScoped<IRateRepository, RateRepository>();   // Capa Datos
builder.Services.AddScoped<IShippingService, ShippingService>(); // Capa Negocio

// CORS — permite al frontend React en puerto 5173
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// ── Pipeline ───────────────────────────────────────────────────────────────
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReact");
app.UseAuthorization();
app.MapControllers();
app.Run();
