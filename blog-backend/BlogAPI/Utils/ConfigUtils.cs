namespace BlogAPI.Utils
{
    public static class ConfigUtils
    {

        public static IConfigurationRoot GetConfig()
        {
            var builder = new ConfigurationBuilder();
            builder.AddJsonFile("appsettings.json", optional: false);

            return builder.Build();
        }
    }
}
