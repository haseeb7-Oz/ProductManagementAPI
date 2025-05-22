using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Data;
using ProductManagementAPI.Data.Entities;
using ProductManagementAPI.Repositories.Interfaces;

namespace ProductManagementAPI.Repositories
{
    public class TierRepository : ITierRepository
    {
        private readonly ProductManagementDbContext _context;

        public TierRepository(ProductManagementDbContext context)
        {
           _context = context; 
        }

        public async Task<IEnumerable<Tier>> GetAllAsync()
        {
            return await _context.Tiers.Include(x=>x.Offers).ToListAsync();
        }
    }
}
