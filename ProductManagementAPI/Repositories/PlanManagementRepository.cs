using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Database;
using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.Repositories.Interfaces;

namespace ProductManagementAPI.Repositories
{
    public class PlanManagementRepository : IPlanManagementRepository
    {
        private readonly ProductManagementDbContext _context;

        public PlanManagementRepository(ProductManagementDbContext context)
        {
           _context = context; 
        }

        public async Task<IEnumerable<PlanManagementEntity>> GetAllAsync() => await _context.PlanManagements.ToListAsync();

        public async Task<PlanManagementEntity> GetByIdAsync(Guid id) => await _context.PlanManagements.FindAsync(id);

        public async Task<IEnumerable<PlanManagementEntity>> SearchAsync(string? keyword, int pageNumber, int pageSize)
        {
            var query = _context.PlanManagements.AsQueryable();

            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(p => p.PlanName.Contains(keyword));
            }

            return await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<PlanManagementEntity> AddAsync(PlanManagementEntity plan)
        {
            await _context.PlanManagements.AddAsync(plan);
            await _context.SaveChangesAsync();

            return plan;
        }

        public async Task<PlanManagementEntity> UpdateAsync(PlanManagementEntity plan)
        {
            _context.PlanManagements.Update(plan);
            await _context.SaveChangesAsync();

            return plan;
        }

        public async Task DeleteAsync(Guid id)
        {
            var plan = await _context.PlanManagements.FindAsync(id);
            if (plan != null)
            {
                _context.PlanManagements.Remove(plan);
                await _context.SaveChangesAsync();
            }
        }
    }
}
