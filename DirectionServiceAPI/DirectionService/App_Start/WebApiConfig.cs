using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebApiContrib.Formatting;

namespace DirectionService
{
    public static class WebApiConfig
    {
        public enum Direction
        {
            Straight,
            Left,
            Right,
            Backwards,
            Stop
        }

        public static Direction CurrentDirection { get; set; }

        public static void Register(HttpConfiguration config)
        {
            CurrentDirection = Direction.Straight;
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Formatters.Add(new PlainTextFormatter());

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
