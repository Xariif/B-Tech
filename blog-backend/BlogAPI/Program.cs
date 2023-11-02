using BlogAPI.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices();

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
    }).AddCookie()
        .AddOpenIdConnect(options =>
        {
            options.SignInScheme = "Cookies";

            options.ClientId = "ae144e6f-3902-4854-8183-7bcb47c9cade";
            options.ClientSecret = "0PL1aLA3kVPpfq6uT4n4my672VIAVbd0NcauFb2Bw3k";
            options.Authority = "http://localhost:9011";

            options.GetClaimsFromUserInfoEndpoint = true;
            options.RequireHttpsMetadata = false;

            options.ResponseType = "code";

            options.Scope.Add("profile");
            options.Scope.Add("offline");
            options.SaveTokens = true;
        });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseHttpsRedirection();

app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});


app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.Run();