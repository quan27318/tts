using BackEnd.Models;

namespace BackEnd.Repositories{
    public class TypeRepository : ITypeRepository
    {
        private readonly SystemDbContext _dbContext;
        public TypeRepository(SystemDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public void CreateType(TypeOfWork type)
        {
            _dbContext.Types.Add(type);
            _dbContext.SaveChanges();
        }

        public List<TypeOfWork> GetAllTypes()
        {
            return _dbContext.Types.ToList();
        }

        public void RemoveType(int id)
        {
            var type = _dbContext.Types.Where(t => t.TypeId == id).FirstOrDefault();
            if (type == null) throw new KeyNotFoundException ("type not found");
           _dbContext.Types.Remove(type);
            _dbContext.SaveChanges();
        }

        public void UpdateType(TypeOfWork type)
        {
            var typeUpdate = _dbContext.Types.Where(x=>x.TypeId == type.TypeId).FirstOrDefault();
            if(typeUpdate == null) throw new KeyNotFoundException ("Type not found");
            typeUpdate.TypeName = type.TypeName;
            _dbContext.SaveChanges();
        }
    }
}