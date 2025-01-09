using Microsoft.EntityFrameworkCore;
using WebCRUD.Models;

namespace WebCRUD.Dados
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options) 
        {  }

        public DbSet<Pessoa> Pessoa { get; set; }
    }
}
