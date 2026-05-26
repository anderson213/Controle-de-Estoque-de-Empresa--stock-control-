using System.ComponentModel.DataAnnotations;

namespace StockControl.API.DTOs;

public class LoginDTO
{
    [Required(ErrorMessage = "O email e obrigatorio.")]
    [EmailAddress(ErrorMessage = "Informe um email valido.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "A senha e obrigatoria.")]
    [MinLength(6, ErrorMessage = "A senha deve ter pelo menos 6 caracteres.")]
    public string Password { get; set; } = string.Empty;
}
