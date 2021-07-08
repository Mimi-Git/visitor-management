using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using visitor_management_api.Models;

namespace visitor_management_api.Data
{
    public class EfEmployeeRepositoryAsync : EfBaseRepositoryAsync<Employee>, IEmployeeRepositoryAsync
    {
        public EfEmployeeRepositoryAsync(VisitorAppContext context) : base(context)
        {
        }

        public async new Task RestoreAsync()
        {
            _context.Employees.RemoveRange(_context.Employees);

            _context.Employees.AddRange(GetRandomEmployees(20));

            await _context.SaveChangesAsync();
        }

        private IEnumerable<Employee> GetRandomEmployees(int quantity)
        {
            string[] randomFirtNames = { "Gabriel", "Léo", "Raphaël", "Arthur", "Louis", "Lucas", "Adam", "Jules", "Hugo", "Maël", "Liam", "Noah", "Paul", "Ethan", "Tiago", "Sacha", "Gabin", "Nathan", "Mohamed", "Aaron", "Jade", "Louise", "Alice", "Lina", "Chloé", "Rose", "Léa", "Mila", "Ambre", "Mia", "Anna", "Julia", "Inès", "Léna", "Juliette", "Zoé", "Manon", "Agathe" };
            string[] randomLastNames = { "Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Durand", "Dubois", "Moreau", "Laurent", "Simon", "Michel", "Lefèvre", "Leroy", "Roux", "David", "Bertrand", "Morel", "Fournier", "Girard", "Bonnet", "Dupont", "Lambert", "Fontaine", "Rousseau", "Vincent", "Muller", "Lefevre", "Faure", "Andre", "Mercier", "Blanc", "Guerin", "Boyer", "Garnier", "Chevalier", "Francois", "Legrand", "Gauthier", "Garci" };
            string[] departments = { "Finance", "Réception", "Informatique", "Direction", "QHSE", "Paie", "Services généraux", "Achats", "Comptabilité", "Maintenance" };

            Random rnd = new Random();
            var employees = new List<Employee>();
            var companyName = "Mon Entreprise";

            for (int i = 0; i < quantity; i++)
            {
                int fNIndex = rnd.Next(randomFirtNames.Length);
                int lNIndex = rnd.Next(randomLastNames.Length);
                int dIndex = rnd.Next(departments.Length);

                var firstName = randomFirtNames[fNIndex];
                var lastName = randomLastNames[lNIndex];
                var email = $"{firstName}.{lastName}@{companyName.Replace(" ", String.Empty).ToLower()}.com";
                var department = departments[dIndex];

                var randomEmployee = new Employee()
                {
                    FirstName = firstName,
                    LastName = lastName,
                    CompanyName = companyName,
                    Email = email,
                    Department = department
                };

                employees.Add(randomEmployee);
            }

            return employees;
        }
    }
}