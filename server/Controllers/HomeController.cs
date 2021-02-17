namespace WebApi.Controllers
{
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.AspNetCore.Authorization;

	[AllowAnonymous]
	[Route("[controller]")]
	public class HomeController : Controller
	{
		public HomeController()
		{
		}

		[AllowAnonymous]
		[HttpGet]
		public IActionResult Index()
		{
			return Ok(new { Message = $"Api OK {System.DateTime.Now}" });
		}
	}
}
