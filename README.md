# Primeros pasos para correr la aplicación

## Scripts disponibles

El primer paso es instalar las dependencias
### `npm install`

luego de este paso crea los .env en este caso serian dos: .\
.env.development \
.env.production 

agregar en los .env el la siguiente variable:

### `REACT_APP_API_URL=https://62e9737b3a5f1572e86af311.mockapi.io/api/v1/`

\
En el directorio del proyecto, puede ejecutar:
### `npm start`

Ejecutara la aplicación en el modo de desarrollo.\
Abrir [http://localhost:3000](http://localhost:3000) para verlo en su navegador.

La página se volverá a cargar cuando realice cambios.\

### `npm test`

Ejecutara los test unitario de la aplicación.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.\
Empaqueta correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.
