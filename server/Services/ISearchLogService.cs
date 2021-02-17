using System.Collections.Generic;
using WebApi.Entities;

namespace WebApi.Services
{
	public interface ISearchLogService
	{
		void AddSearchLog(SearchLog searchLog);

		IEnumerable<SearchLog> GetLogs();
	}
}