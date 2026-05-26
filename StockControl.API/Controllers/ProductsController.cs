using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StockControl.API.DTOs;
using StockControl.API.Services;

namespace StockControl.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly ProductService _productService;

    public ProductsController(ProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _productService.GetAll();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _productService.GetById(id);
        if (product == null)
            return NotFound(new { message = "Produto não encontrado." });

        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateProductDTO dto)
    {
        var product = await _productService.Create(dto);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateProductDTO dto)
    {
        var product = await _productService.Update(id, dto);
        if (product == null)
            return NotFound(new { message = "Produto não encontrado." });

        return Ok(product);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _productService.Delete(id);
        if (!deleted)
            return NotFound(new { message = "Produto não encontrado." });

        return NoContent();
    }
}