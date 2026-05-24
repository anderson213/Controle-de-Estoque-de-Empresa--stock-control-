using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace StockControl.API.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public int MinQuantity { get; set; } // alerta de estoque baixo
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<StockMovement> Movements { get; set; } = new List<StockMovement>();
}