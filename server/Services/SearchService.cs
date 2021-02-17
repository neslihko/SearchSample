using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using HtmlAgilityPack;
using WebApi.Dtos;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
	public class SearchService : ISearchService
	{
		public SearchService()
		{
		}

		public Result<SearchResult> SearchWeb(SearchDto searchDto)
		{
			if (string.IsNullOrWhiteSpace(searchDto.URL) || string.IsNullOrWhiteSpace(searchDto.Expression))
			{
				return new Result<SearchResult>(false, "URL and Expression fields are required.");
			}

			var validUri = Uri.TryCreate(searchDto.URL, UriKind.Absolute, out Uri uri);

			if (!validUri)
			{
				return new Result<SearchResult>(false, $"Can't parse URL: {searchDto.URL}");
			}

			var document = new HtmlDocument();

			using (var client = new WebClient())
			{
				var html = client.DownloadString(uri);
				document.LoadHtml(html);
				var original = document.DocumentNode.InnerText;
				var replaced = original.Replace(searchDto.Expression, "", System.StringComparison.InvariantCultureIgnoreCase);
				var hitCount = (original.Length - replaced.Length) / searchDto.Expression.Length;

				var result = new SearchResult
				{
					URL = searchDto.URL,
					Query = searchDto.Expression,
					HitCount = hitCount
				};

				return new Result<SearchResult>(result);
			}
		}
	}
}