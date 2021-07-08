using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using visitor_management_api.Data;

namespace visitor_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestoreDatasController : ControllerBase
    {
        private readonly IEmployeeRepositoryAsync _employeeRepo;
        private readonly IVisitorRepositoryAsync _visitorRepo;
        private readonly IVisitRepositoryAsync _visitRepo;

        public RestoreDatasController(IEmployeeRepositoryAsync employeeRepo, IVisitorRepositoryAsync visitorRepo, IVisitRepositoryAsync visitRepo)
        {
            _employeeRepo = employeeRepo;
            _visitorRepo = visitorRepo;
            _visitRepo = visitRepo;
        }

        [HttpDelete]
        public async Task<ActionResult> ResetAllData()
        {
            await _employeeRepo.RestoreAsync();
            await _visitorRepo.RestoreAsync();
            await _visitRepo.RestoreAsync();

            return NoContent();
        }
    }
}