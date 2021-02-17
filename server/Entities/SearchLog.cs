using System;

namespace WebApi.Entities
{
	public class SearchLog
	{
		public int Id { get; set; }
        
		public string URL { get; set; }

		public string Query { get; set; }

		public int HitCount { get; set; }

		public DateTime SearchDate { get; set; }
	}
}