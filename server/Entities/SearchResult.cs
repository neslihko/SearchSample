namespace WebApi.Entities
{
	public class SearchResult
	{
		public string URL { get; set; }

		public string Query { get; set; }

		public int HitCount { get; set; }
	}
}