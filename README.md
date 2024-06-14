<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# En desarrollo

1. Clonar repositorio
2. Ejecutar

```
npm i
```

3. Nest CLI

```
npm i -g @nestjs/cli
```

4. Levantar db

```
docker-compose up -d
```

5. Clonar el archivo **.env.template** y renombrarlo a **.env**

6. LLenar las variables de entorno definidas

7. Ejecutar la aplicación en dev:

```
npm run start:dev
```

8. Reconstruir DB

```
http://localhost:3000/api/seed
```

9. Producción

   a. crear archivo `.env.prod`

   b. llenar las variables de entorno

   c. Crear la imagen:

   ```
   docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
   ```

   d. Correr imagen

   ```
   docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
   ```
