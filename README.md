# API de Entrega

API REST desenvolvida para gerenciamento de entregas, com funcionalidades de autenticação, autorização e controle de status de entregas.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- Jest
- Docker

## 📋 Pré-requisitos

- Node.js (versão LTS recomendada)
- Docker e Docker Compose
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/apiEntrega.git
cd apiEntrega
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api-entrega"
JWT_SECRET="sua-chave-secreta-aqui"
```

4. Inicie o banco de dados com Docker:

```bash
docker-compose up -d
```

5. Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

## 🚀 Executando a aplicação

Para iniciar a aplicação em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Para executar os testes:

```bash
npm run test:dev
# ou
yarn test:dev
```

## 📝 Funcionalidades

- Autenticação de usuários
- Criação e gerenciamento de entregas
- Controle de status de entregas (processando, enviado, entregue)
- Registro de logs de entregas
- Autorização baseada em roles (cliente, vendedor, admin)

## 🔐 Rotas da API

### Usuários

- `POST /users` - Criar novo usuário
- `POST /sessions` - Autenticar usuário

### Entregas

- `GET /deliveries` - Listar todas as entregas (requer autenticação de vendedor)
- `POST /deliveries` - Criar nova entrega (requer autenticação de vendedor)
- `PATCH /deliveries/:id/status` - Atualizar status da entrega (requer autenticação de vendedor)

### Logs de Entrega

- `POST /delivery-logs` - Criar log de entrega (requer autenticação de vendedor)
- `GET /delivery-logs/:delivery_id/show` - Visualizar logs de uma entrega (requer autenticação de vendedor ou cliente)

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
