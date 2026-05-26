using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace StockControl.API.DTOs
{
    public class CreateProductDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Price { get; set;}
        public int Quantity { get; set; }
        public int MinQuantity { get; set; }
    }
}