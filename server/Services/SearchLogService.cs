using System.Collections.Generic;
using WebApi.Entities;
using WebApi.Helpers;
using System.Linq;

namespace WebApi.Services
{
	public class SearchLogService : ISearchLogService
	{
		private DataContext _context;

		public SearchLogService(DataContext context)
		{
			_context = context;
		}

		public void AddSearchLog(SearchLog searchLog)
		{
			_context.SearchLogs.Add(searchLog);
			_context.SaveChanges();
		}

		public IEnumerable<SearchLog> GetLogs()
		{
			return _context.SearchLogs.OrderByDescending(log => log.SearchDate);
		}
	}
}