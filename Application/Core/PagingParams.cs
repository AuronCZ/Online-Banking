namespace Application.Core
{
    public class PagingParams
    {
        private const int  MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;

        private int pageSize = 10;
        public int PageSize
        {
            get => this.pageSize;
            set => this.pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
        
    }
}