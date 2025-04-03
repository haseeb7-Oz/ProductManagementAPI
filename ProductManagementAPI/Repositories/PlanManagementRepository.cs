using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Database;
using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.DTOs;
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

        public async Task<IEnumerable<PlanManagementEntity>> GetAllAsync()
        {
            return await GetBaseQuery().ToListAsync();
        }

        public async Task<PlanManagementEntity?> GetByIdAsync(Guid id)
        {
            return await GetBaseQuery().FirstOrDefaultAsync(pm => pm.Id == id);
        }

        public async Task<IEnumerable<PlanManagementEntity>> SearchAsync(PlanSearchDto searchDto)
        {
            var query = GetBaseQuery().AsQueryable();

            // Dynamically build filters
            query = query
            .Where(p =>
                (string.IsNullOrEmpty(searchDto.PlanNumber) || p.PlanNumber == searchDto.PlanNumber) &&
                (string.IsNullOrEmpty(searchDto.PlanName) || p.PlanName == searchDto.PlanName) &&
                (!searchDto.MonthId.HasValue || p.MonthId == searchDto.MonthId) &&
                (!searchDto.YearId.HasValue || p.YearId == searchDto.YearId) &&
                (!searchDto.PropertyId.HasValue || p.PropertyId == searchDto.PropertyId) &&
                (!searchDto.StatusId.HasValue || p.StatusId == searchDto.StatusId)
            );

            return await query
                .Skip((searchDto.PageNumber - 1) * searchDto.PageSize)
                .Take(searchDto.PageSize)
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


        #region Helper Methods

        private IQueryable<PlanManagementEntity> GetBaseQuery()
        {
            return _context.PlanManagements
                .Include(pm => pm.Month)
                .Include(pm => pm.Year)
                .Include(pm => pm.Property)
                .Include(pm => pm.Status);
        }

        #endregion
    }
}
