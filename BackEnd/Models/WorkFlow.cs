using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models{
    public class WorkFlow{
        [Key]
        public int Id{ get; set; }
        public string? Description{ get; set; }
        public DateTime DayStart{ get; set; }
        public DateTime DayEnd{ get; set; }
        public string? Explain{ get; set;}
        public string? Status{ get; set; }
        public bool? IsActive{ get; set; }
        
        public int TypeId{ get; set; }
    
       
    }
}