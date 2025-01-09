using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebCRUD.Models
{
    [Table("Pessoa")]
    public class Pessoa
    {
        [Display(Name = "Código")]
        [Column("Id")]
        public int Id { get; set; }

        [Display(Name = "Nome")]
        [Column("Nome")]
        public required string Nome { get; set; }

        [Display(Name = "Sobrenome")]
        [Column("SobreNome")]
        public required string SobreNome { get; set; }

        [Display(Name = "Idade")]
        [Column("Idade")]
        public int Idade { get; set; }

    }
}
