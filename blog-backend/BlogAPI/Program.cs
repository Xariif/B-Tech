using BlogAPI.Extensions;
using BlogAPI.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices();

builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.AddSingleton<Auth0Repository>();


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder
            .WithOrigins("http://localhost:3000", "https://localhost:7007")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});




builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Auth0:Domain"];
        options.Audience = builder.Configuration["Auth0:Audience"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = ClaimTypes.NameIdentifier,            
        };
    });

builder.Services.AddAuthorization(options =>
{

    options.AddPolicy("user", x => x.RequireClaim("permissions", "read:posts", "comment:posts"));

    options.AddPolicy("author", x => x.RequireClaim("permissions", "write:posts", "delete:posts"));

    options.AddPolicy("admin", x => x.RequireClaim("permissions", "admin"));

//  options.AddPolicy("read:messages", policy => policy.Requirements.Add(new 
//  HasScopeRequirement("read:messages", domain)));
});

builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(builder =>
{
    builder
    .WithOrigins("http://localhost:3000", "https://localhost:7007", "https://localhost:7007/signin-google", "https://accounts.google.com", "https://localhost:7007/signin-oidc")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials();
});

app.UseRouting();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();


app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.Run();