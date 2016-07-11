using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CivicSite.Startup))]
namespace CivicSite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
