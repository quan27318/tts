using BackEnd.Models;
namespace BackEnd.Services{
    public interface ITypeService{
        public List<TypeOfWork> GetAllTypes();
        public void CreateType(TypeOfWork type);
        public void RemoveType(int id);
        public void UpdateType(TypeOfWork type);
    }
}