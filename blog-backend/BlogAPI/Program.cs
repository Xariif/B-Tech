using BlogAPI.Contexts;
using BlogAPI.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "ApiPlayground", Version = "v1" });
    c.AddSecurityDefinition("token", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        In = ParameterLocation.Header,
        Name = HeaderNames.Authorization,
        Scheme = "Bearer"
    });

});


builder.Services.AddApplicationServices();

builder.Services.Configure<ConnectionSetting>(options =>
{
    options.ConnectionString = builder.Configuration["MongoDB:ConnectionURI1"] ?? throw new Exception("MongoDB:ConnectionURI1");
    options.DataBase = builder.Configuration["MongoDB:DatabaseName1"] ?? throw new Exception("MongoDB:DatabaseName1");
});
builder.Services.AddTransient<MongoDataBaseContext>();

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


string domain = builder.Configuration["Auth0:Domain"] ?? String.Empty;

builder.Services.AddAuthorization(options =>
{

    options.AddPolicy("read:posts", policy => policy.RequireClaim("permissions", "read:posts"));
    options.AddPolicy("comment:posts", policy => policy.RequireClaim("permissions", "comment:posts"));
    options.AddPolicy("write:posts", policy => policy.RequireClaim("permissions", "write:posts"));
    options.AddPolicy("delete:posts", policy => policy.RequireClaim("permissions", "delete:posts"));
    options.AddPolicy("admin", policy => policy.RequireClaim("permissions", "admin"));
});



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