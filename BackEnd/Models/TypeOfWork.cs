using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models{
    public class TypeOfWork{
        [Key]
        public int TypeId { get; set; }
        public string? TypeName { get; set; }
       
    }
}