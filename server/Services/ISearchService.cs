using System.Collections.Generic;
using WebApi.Dtos;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
	public interface ISearchService
	{
		Result<SearchResult> SearchWeb(SearchDto searchDto);
	}
}