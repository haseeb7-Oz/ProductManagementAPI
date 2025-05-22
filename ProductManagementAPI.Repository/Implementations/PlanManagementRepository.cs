using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Database;
using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.Repositories.Interfaces;
using ProductManagementAPI.Common.Dtos;
using ProductManagementAPI.Data;
using ProductManagementAPI.Data.Entities;

namespace ProductManagementAPI.Repositories
{
    public class PlanManagementRepository : IPlanManagementRepository
    {
        private readonly ProductManagementDbContext _context;

        public PlanManagementRepository(ProductManagementDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PlanManagement>> GetAllAsync()
        {
            return await GetBaseQuery().ToListAsync();
        }

        public async Task<PlanManagement?> GetByIdAsync(Guid id)
        {
            return await GetBaseQuery().FirstOrDefaultAsync(pm => pm.Id == id);
        }

        public async Task<IEnumerable<PlanManagement>> SearchAsync(PlanSearchDto searchDto)
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

        public async Task<PlanManagement> AddAsync(PlanManagement plan)
        {
            await _context.PlanManagements.AddAsync(plan);
            await _context.SaveChangesAsync();

            return plan;
        }

        public async Task<PlanManagement> UpdateAsync(PlanManagement plan)
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

        private IQueryable<PlanManagement> GetBaseQuery()
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
