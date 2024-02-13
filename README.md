# Development
Pasos para levantar base de datos

1. levantar base de datos
```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. ejecutar el SEED para [crear la base de datos local](https://localhost:3000/api/seed)


# Prisma comands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
