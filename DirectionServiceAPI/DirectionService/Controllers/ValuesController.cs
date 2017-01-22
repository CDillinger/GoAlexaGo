using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace DirectionService.Controllers
{
    public class DirectionController : ApiController
    {
        // GET direction
        public HttpResponseMessage Get()
        {
            var httpResponseMessage = new HttpResponseMessage();

            httpResponseMessage.Content = new StringContent(WebApiConfig.CurrentDirection.ToString());
            httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("text/plain");

            return httpResponseMessage;
        }
        // GET direction/value
        public HttpResponseMessage Get(string id)
        {
            var direction = WebApiConfig.Direction.Straight;
            if (id == null)
                return null;
            switch (id.ToLower())
            {
                case "straight":
                default:
                    direction = WebApiConfig.Direction.Straight;
                    break;
                case "left":
                    direction = WebApiConfig.Direction.Left;
                    break;
                case "right":
                    direction = WebApiConfig.Direction.Right;
                    break;
                case "backwards":
                    direction = WebApiConfig.Direction.Backwards;
                    break;
                case "stop":
                    direction = WebApiConfig.Direction.Stop;
                    break;
            }

            WebApiConfig.CurrentDirection = direction;

            var httpResponseMessage = new HttpResponseMessage();

            httpResponseMessage.Content = new StringContent(WebApiConfig.CurrentDirection.ToString());
            httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("text/plain");

            return httpResponseMessage;
        }

        // POST direction
        public void Post([FromBody]string value)
        {
            var direction = WebApiConfig.Direction.Straight;
            if (value == null)
                return;
            switch (value.ToLower())
            {
                case "straight":
                default:
                    direction = WebApiConfig.Direction.Straight;
                    break;
                case "left":
                    direction = WebApiConfig.Direction.Left;
                    break;
                case "right":
                    direction = WebApiConfig.Direction.Right;
                    break;
                case "backwards":
                    direction = WebApiConfig.Direction.Backwards;
                    break;
            }

            WebApiConfig.CurrentDirection = direction;
        }
    }
}
