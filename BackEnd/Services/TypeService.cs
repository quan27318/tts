using BackEnd.Models;
using BackEnd.Repositories;

namespace BackEnd.Services{
    public class TypeService : ITypeService
    {
        private readonly ITypeRepository _dataRepo;
        public TypeService(ITypeRepository dataRepo)
        {
         _dataRepo = dataRepo;   
        }
        public void CreateType(TypeOfWork type)
        {
            _dataRepo.CreateType(type);
        }

        public List<TypeOfWork> GetAllTypes()
        {
            return _dataRepo.GetAllTypes();
        }

        public void RemoveType(int id)
        {
            _dataRepo.RemoveType(id);
        }

        public void UpdateType(TypeOfWork type)
        {
            _dataRepo.UpdateType(type);
        }
    }
}