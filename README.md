# Devedle
Um jogo de adivinhação feito para desenvolvedores, inspirado no popular jogo chamado gamedle.
![devedle](https://github.com/user-attachments/assets/976f09fb-a067-461f-bd62-ea16f17a6635)

# Como jogar
O jogador precisa adivinha o nome da tecnologia através da imagem que está sendo exibida.

# Configurações
1. Instale as dependências do `backend` e do `frontend`:

   ```
   npm install
   ```

3. Crie um arquivo `.env` no `backend` com as seguintes propriedades:

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=root
   DB_PASSWORD=root
   DB_DATABASE=postgres
   ```

5. Inicialize o `docker-compose.yml` do `backend` para usar o banco de dados _conteinerizado_ (opcional)

   ```
   docker compose up -d
   ```

7. Inicialize o `backend` e o `frontend`, respectivamente:

   ```
   npm run start:dev
   ```
   ```
   npm start
   ```

# Desenvolvimento
O projeto foi desenvolvido com [NestJS](https://nestjs.com) (backend) e [Angular](https://angular.dev/) (frontend).
