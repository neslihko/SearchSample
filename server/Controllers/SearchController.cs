namespace WebApi.Controllers
{
	using Microsoft.AspNetCore.Mvc;
	using WebApi.Services;
	using WebApi.Dtos;
	using AutoMapper;
	using WebApi.Helpers;
	using Microsoft.Extensions.Options;
	using Microsoft.AspNetCore.Authorization;
	using WebApi.Entities;
	using System;
	

	[AllowAnonymous]
	[Route("[controller]")]
	public class SearchController : Controller
	{
		private ISearchLogService _searchLogService;

		private ISearchService _searchService;

		private IMapper _mapper;

		private readonly AppSettings _appSettings;

		public SearchController(
			ISearchLogService searchLogService,
			ISearchService searchService,
			IMapper mapper,
			IOptions<AppSettings> appSettings)
		{
			_searchLogService = searchLogService;
			_searchService = searchService;
			_mapper = mapper;
			_appSettings = appSettings.Value;
		}

		[Authorize]
		[HttpPost("searchWeb")]
		public IActionResult SearchWeb([FromBody] SearchDto searchDto)
		{
			var result = _searchService.SearchWeb(searchDto);
			if (result.Success)
			{
				var log = result.Data;
				var searchLog = new SearchLog()
				{
					URL = log.URL,
					Query = log.Query,
					HitCount = log.HitCount,
					SearchDate = DateTime.UtcNow
				};

				_searchLogService.AddSearchLog(searchLog);
			}

			return Ok(result);
		}

		[Authorize]
		[HttpGet("getLogs")]
		public IActionResult GetLogs()
		{
			var logs = _searchLogService.GetLogs();
			return Ok(logs);
		}

		[HttpGet]
		[AllowAnonymous]
		public IActionResult Index()
		{
			return Content($"Search OK @{DateTime.Now}");
		}
	}
}
