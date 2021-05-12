using Microsoft.AspNetCore.Mvc;
using visitor_management_api.Data;

namespace visitor_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestoreDatasController : ControllerBase
    {
        private readonly IEmployeeRepo _employeeRepo;
        private readonly IVisitorRepo _visitorRepo;
        private readonly IVisitRepo _visitRepo;

        public RestoreDatasController(IEmployeeRepo employeeRepo, IVisitorRepo visitorRepo, IVisitRepo visitRepo)
        {
            _employeeRepo = employeeRepo;
            _visitorRepo = visitorRepo;
            _visitRepo = visitRepo;
        }

        [HttpDelete]
        public ActionResult ResetAllData()
        {
            _employeeRepo.RestoreEmployees();
            _visitorRepo.RestoreVisitors();
            _visitRepo.RestoreVisits();

            _employeeRepo.SaveChanges();
            _visitorRepo.SaveChanges();
            _visitRepo.SaveChanges();

            return NoContent();
        }
    }
}