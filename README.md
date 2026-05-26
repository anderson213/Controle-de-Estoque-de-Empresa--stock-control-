#  Stock Control — Sistema de Controle de Estoque

Sistema web completo de controle de estoque com autenticação JWT, CRUD de produtos, movimentação de estoque, gráficos e exportação de PDF.

>  **Projeto em desenvolvimento** — atualmente com as Fases 1, 2 e 3 concluídas (estrutura, banco de dados e autenticação JWT).

---

##  Tecnologias utilizadas

**Backend**
- ASP.NET Core 8 Web API
- Entity Framework Core
- PostgreSQL
- JWT (autenticação)
- BCrypt (criptografia de senhas)

**Frontend**
- React + Vite
- Tailwind CSS
- Axios
- Recharts (gráficos)

---

##  Funcionalidades previstas

- [x] Autenticação com JWT (registro e login com senha criptografada)
- [ ] CRUD completo de produtos
- [ ] Movimentação de estoque (entradas e saídas)
- [ ] Busca de produtos em tempo real
- [ ] Gráfico de produtos mais vendidos no mês
- [ ] Exportação de relatório em PDF

---

##  Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org)
- [PostgreSQL](https://www.postgresql.org/download/)
- [pgAdmin](https://www.pgadmin.org/) (opcional, para visualizar o banco)

---

## Como configurar e rodar

### 1. Clone o repositório

```bash
git clone https://github.com/anderson213/Controle-de-Estoque-de-Empresa--stock-control-.git
cd Controle-de-Estoque-de-Empresa--stock-control-
```

### 2. Configure o banco de dados

No pgAdmin ou no terminal do PostgreSQL, crie o banco:

```sql
CREATE DATABASE stockcontrol;
```

### 3. Configure o appsettings.json

Dentro da pasta `StockControl.API`, crie um arquivo `appsettings.json` com o seguinte conteúdo:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=stockcontrol;Username=postgres;Password=SUA_SENHA_AQUI"
  },
  "JwtSettings": {
    "SecretKey": "sua-chave-secreta-minimo-32-caracteres-aqui",
    "Issuer": "StockControl",
    "Audience": "StockControlUsers",
    "ExpirationHours": 8
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

> Substitua `SUA_SENHA_AQUI` pela senha do seu PostgreSQL e gere uma chave secreta aleatória com pelo menos 32 caracteres.

### 4. Rode as migrations

```bash
cd StockControl.API
dotnet ef database update
```

### 5. Rode o backend

```bash
dotnet run
```

A API estará disponível em `http://localhost:5284`  
O Swagger estará em `http://localhost:5284/swagger`

### 6. Rode o frontend

Em outro terminal:

```bash
cd stockcontrol-frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

---

## Estrutura do projeto

```
StockControl/
├── StockControl.API/
│   ├── Controllers/       # Endpoints da API
│   ├── Models/            # Entidades do banco de dados
│   ├── DTOs/              # Objetos de transferência de dados
│   ├── Data/              # DbContext (Entity Framework)
│   ├── Services/          # Lógica de negócio
│   ├── Migrations/        # Histórico de migrations
│   └── Program.cs         # Configuração da aplicação
└── stockcontrol-frontend/
    └── src/               # Código React
```

---

## Endpoints disponíveis

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/Auth/register` | Cadastrar usuário ||
| POST | `/api/Auth/login` | Fazer login e receber token JWT ||

> Novos endpoints serão adicionados nas próximas fases do desenvolvimento.

---

## 👨‍💻 Autor

Anderson Oliveira — [@anderson213](https://github.com/anderson213)
