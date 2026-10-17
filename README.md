# Clean Architecture en Angular - Uceva

Este proyecto es una aplicación desarrollada en **Angular** implementando **Arquitectura Limpia (Clean Architecture)** con componentes Standalone y soporte para múltiples fuentes de datos (Local con Faker, Backend Node.js y Backend Spring Boot). Incluye tres módulos principales: **Users**, **Products** y **Orders**.

---

## 🏛️ Estructura del Proyecto

El proyecto sigue estrictamente los principios de separación de responsabilidades de Clean Architecture:

```
src/app
│
├── core
│   ├── domain                         # Capa de Dominio (Entidades y Contratos)
│   │   ├── models
│   │   │   ├── user.model.ts
│   │   │   ├── product.model.ts
│   │   │   └── order.model.ts
│   │   └── repositories
│   │       ├── user.repository.ts
│   │       ├── product.repository.ts
│   │       └── order.repository.ts
│   │
│   ├── application                    # Capa de Aplicación (Casos de Uso)
│   │   └── usecases
│   │       ├── get-all-users.usecase.ts
│   │       ├── get-all-products.usecase.ts
│   │       └── get-all-orders.usecase.ts
│   │
│   └── infrastructure                 # Capa de Infraestructura (Implementaciones de repositorios y servicios externos)
│       ├── services
│       │   └── data.service.ts
│       └── repositories
│           ├── local-implementation
│           │   ├── user-local.repository.impl.ts
│           │   ├── product-local.repository.impl.ts
│           │   └── order-local.repository.impl.ts
│           ├── node-implementation
│           │   ├── user-node.repository.impl.ts
│           │   ├── product-node.repository.impl.ts
│           │   └── order-node.repository.impl.ts
│           └── springboot-implementation
│               ├── user-springboot.repository.impl.ts
│               ├── product-springboot.repository.impl.ts
│               └── order-springboot.repository.impl.ts
│
├── presentation                       # Capa de Presentación (UI, Páginas y Componentes)
│   ├── components
│   │   ├── alert
│   │   ├── users-table
│   │   ├── products-table
│   │   └── orders-table
│   └── pages
│       ├── users
│       ├── products
│       └── orders
│
├── mocks                              # Datos simulados y fixtures
│   ├── users.mocks.ts
│   ├── products.mocks.ts
│   └── orders.mocks.ts
│
├── app.config.ts                      # Inyección de dependencias y proveedores
├── app.routes.ts                      # Enrutamiento de la aplicación
└── app.ts                             # Componente raíz
```

---

## 🚀 Guía de Arquitectura e Implementación

### 1. Modelos de Dominio (`core/domain/models`)
Definen las entidades del negocio e interfaces fundamentales:
- **`User`**: Información de usuarios e ingeniería asociada.
- **`Product`**: Detalle de productos, categorías y precios.
- **`OrderModel`**: Modelo de órdenes de compra con usuario, producto, cantidad, total y estado (`PENDING`, `COMPLETED`, `CANCELLED`).

### 2. Repositorios Abstractos (`core/domain/repositories`)
Contratos que especifican las operaciones disponibles sin acoplarse a tecnologías externas:
- `UserRepository`
- `ProductRepository`
- `OrderRepository`

### 3. Casos de Uso (`core/application/usecases`)
Encapsulan la lógica de negocio y orquestan la interacción con los repositorios:
- `GetAllUsersUseCase`
- `GetAllProductsUseCase`
- `GetAllOrdersUseCase`

### 4. Capa de Infraestructura (`core/infrastructure`)
Provee las implementaciones concretas para diferentes fuentes de datos:
- **Local (`local-implementation`)**: Generación y consumo de datos simulados mediante mocks y Faker.
- **Node.js (`node-implementation`)**: Consumo de microservicios REST en Node.js.
- **Spring Boot (`springboot-implementation`)**: Consumo de microservicios REST en Java Spring Boot.

### 5. Inyección de Dependencias (`app.config.ts`)
Permite intercambiar dinámicamente la fuente de datos modificando el proveedor:
```typescript
{
  provide: OrderRepository,
  useClass: OrderNodeRepositoryImpl // o OrderLocalRepositoryImpl, OrderSpringBootRepositoryImpl
}
```

---

## 🛠️ Comandos y Scripts

### Instalación de dependencias
```bash
npm install
```

### Ejecutar Servidor de Desarrollo
```bash
npm start
# o
ng serve
```
La aplicación estará accesible en: `http://localhost:4200`

### 🧪 Pruebas Unitarias y Cobertura (Jest)
El proyecto utiliza **Jest** con `jest-preset-angular` para garantizar pruebas rápidas y completas:

```bash
# Ejecutar todas las pruebas unitarias
npm test

# Modo observador (watch)
npm run test:watch

# Generar reporte de cobertura de código
npm run test:coverage
```
El reporte HTML interactivo de cobertura se genera en `coverage/index.html`.

### 📚 Documentación con Compodoc
Compodoc genera la documentación técnica completa del código y arquitectura:

```bash
# Generar documentación estática
npm run compodoc

# Servir documentación localmente
npx compodoc -s
```
Por defecto, la documentación generada se almacena en la carpeta `./documentation/` y puede visualizarse en el navegador en `http://localhost:8080`.

---

## 🌐 Endpoints y Fuentes de Datos

### Microservicios Node.js (`http://localhost:3000`)
- **Documentación Swagger**: `http://localhost:3000/api/docs`
- **Usuarios**: `GET /api/users/{countUsers}`
- **Productos**: `GET /api/products/{countProducts}`
- **Órdenes**: `GET /api/orders/{countOrders}`

### Microservicios Spring Boot (`http://localhost:3000`)
- **Swagger UI**: `http://localhost:3000/api/swagger-ui/index.html`
- **Usuarios**: `GET /api/users/{countUsers}`
- **Productos**: `GET /api/products/{countProducts}`
- **Órdenes**: `GET /api/orders/{countOrders}`