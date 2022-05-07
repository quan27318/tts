using Microsoft.EntityFrameworkCore;

namespace BackEnd.Models {
    public class SystemDbContext : DbContext {
        public SystemDbContext() { }
        public SystemDbContext(DbContextOptions<SystemDbContext> options) : base (options) { }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Initial Catalog=DBName;Integrated Security=True");
        // }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<WorkFlow>().HasKey(s=>s.Id);
            builder.Entity<TypeOfWork>().HasKey(s=>s.TypeId);
            builder.Entity<WorkFlow>()
            .HasOne<TypeOfWork>()
            .WithMany()
            .HasForeignKey(c=>c.TypeId);
            
            builder.Entity<TypeOfWork>().HasData(
                new TypeOfWork {TypeId = 1, TypeName = "Xử lý hồ sơ vay vốn"},
                new TypeOfWork {TypeId = 2, TypeName = "Xử lý hồ sơ đăng ký dịch vụ"},
                new TypeOfWork {TypeId = 3, TypeName = "Giải ngân"},
                new TypeOfWork {TypeId = 4, TypeName = "Khác"}
            );
            builder.Entity<WorkFlow>().HasData(
                new WorkFlow{Id = 1, Description = "None", TypeId = 1, DayStart = DateTime.Now, DayEnd = DateTime.Now, Explain = "None", Status = "None", IsActive = false}
            );
            
        }

        public DbSet<WorkFlow> WorkFlows { get; set; }
        public DbSet<TypeOfWork> Types { get; set; }
    }
}