using Microsoft.EntityFrameworkCore;
using WebCRUD.Dados;
using WebCRUD.Controllers;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<Contexto>(
    options => options.UseMySql(
        "server=LocalHost;database=viasoftBD;user=root;password=masterkey;",
        Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.40-mysql")
    )
);

builder.Services.AddCors();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();   
}
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
//app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebCRUD API V1");
    c.RoutePrefix = string.Empty; // Define a raiz do aplicativo como a página do Swagger
});

app.UseRouting();

//app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Pessoas}/{action=Index}/{id?}");

//app.MapPessoaEndpoints();

app.Run();
