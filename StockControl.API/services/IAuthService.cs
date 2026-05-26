using StockControl.API.DTOs;

namespace StockControl.API.Services;

public interface IAuthService
{
    Task<AuthResponseDTO?> Register(RegisterDTO dto);
    Task<AuthResponseDTO?> Login(LoginDTO dto);
}
