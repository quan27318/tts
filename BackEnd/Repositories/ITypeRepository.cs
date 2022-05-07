using BackEnd.Models;
namespace BackEnd.Repositories{
    public interface ITypeRepository{
        public List<TypeOfWork> GetAllTypes();
        public void CreateType(TypeOfWork type);
        public void RemoveType(int id);
        public void UpdateType(TypeOfWork type);
    }
}