# Clean Architecture en Angular - Taller 6

**UCEVA - Arquitectura de Software**  
**Docente:** Jesús David Mejía Vergara  
**Integrante 1:** Jhon Edward Steven Loaiza Diaz (Módulo: `categories`)  
**Integrante 2:** Jose Sebastian Arenas Moncada (Módulo: `providers`)  
**Integrante 3:** Andrés Felipe Saavedra (Módulo: `orders`)  

---

## 🏛️ Estructura General del Proyecto

El proyecto sigue rigurosamente los principios de separación de responsabilidades y la regla de dependencia de **Clean Architecture**, estructurado en cuatro capas con soporte para componentes Standalone en Angular 19+:

```
src/app
│
├── core
│   ├── domain                                # Capa de Dominio (Entidades, Modelos y Contratos)
│   │   ├── models
│   │   │   ├── user.model.ts
│   │   │   ├── product.model.ts
│   │   │   ├── category.model.ts
│   │   │   ├── order.model.ts
│   │   │   └── provider.model.ts
│   │   └── repositories
│   │       ├── user.repository.ts
│   │       ├── product.repository.ts
│   │       ├── category.repository.ts
│   │       ├── order.repository.ts
│   │       └── provider.repository.ts
│   │
│   ├── application                           # Capa de Aplicación (Casos de Uso)
│   │   └── usecases
│   │       ├── get-all-users.usecase.ts
│   │       ├── get-all-products.usecase.ts
│   │       ├── get-all-categories.usecase.ts
│   │       ├── get-all-orders.usecase.ts
│   │       ├── get-all-providers.usecase.ts
│   │       └── get-all-providers.usecase.spec.ts
│   │
│   └── infrastructure                        # Capa de Infraestructura (Servicios HTTP y Repositorios Concretos)
│       ├── services
│       │   ├── data.service.ts
│       │   └── data.service.spec.ts
│       └── repositories
│           ├── local-implementation
│           │   ├── user-local.repository.impl.ts
│           │   ├── product-local.repository.impl.ts
│           │   ├── category-local.repository.impl.ts
│           │   ├── order-local.repository.impl.ts
│           │   ├── provider-local.repository.impl.ts
│           │   └── provider-local.repository.impl.spec.ts
│           ├── node-implementation
│           │   ├── user-node.repository.impl.ts
│           │   ├── product-node.repository.impl.ts
│           │   ├── category-node.repository.impl.ts
│           │   ├── order-node.repository.impl.ts
│           │   ├── provider-node.repository.impl.ts
│           │   └── provider-node.repository.impl.spec.ts
│           └── springboot-implementation
│               ├── user-springboot.repository.impl.ts
│               ├── product-springboot.repository.impl.ts
│               ├── category-springboot.repository.impl.ts
│               ├── order-springboot.repository.impl.ts
│               ├── provider-springboot.repository.impl.ts
│               └── provider-springboot.repository.impl.spec.ts
│
├── presentation                              # Capa de Presentación (UI, Páginas y Componentes)
│   ├── components
│   │   ├── alert/
│   │   ├── users-table/
│   │   ├── products-table/
│   │   ├── categories-table/
│   │   ├── orders-table/
│   │   └── providers-table/
│   │       ├── providers-table.component.ts
│   │       ├── providers-table.component.html
│   │       └── providers-table.component.spec.ts
│   └── pages
│       ├── users/
│       ├── products/
│       ├── categories/
│       ├── orders/
│       └── providers/
│           ├── providers.page.ts
│           ├── providers.page.html
│           └── providers.page.spec.ts
│
├── mocks                                     # Datos simulados y fixtures
│   ├── users.mocks.ts
│   ├── products.mocks.ts
│   ├── categories.mocks.ts
│   ├── orders.mocks.ts
│   └── providers.mocks.ts
│
├── app.config.ts                             # Inyección de dependencias y proveedores
├── app.routes.ts                             # Enrutamiento de la aplicación (/providers, etc.)
└── app.ts                                    # Componente raíz con barra de navegación
```

---

## 🚀 Guía de Arquitectura e Implementación de los Módulos

### 1. Modelos de Dominio (`core/domain/models`)
Definen las entidades del negocio e interfaces fundamentales:
- **`User`**: Información de usuarios e ingeniería asociada.
- **`Product`**: Detalle de productos, categorías y precios.
- **`Category`**: Modelo de categorías con descripción y estado (`active`).
- **`OrderModel`**: Modelo de órdenes de compra con usuario, producto, cantidad, total y estado (`PENDING`, `COMPLETED`, `CANCELLED`).
- **`ProviderModel`**: Modelo de proveedores con `{ id: number, name: string, email: string, phone: string, city: string }`.

### 2. Repositorios Abstractos (`core/domain/repositories`)
Contratos que especifican las operaciones disponibles sin acoplarse a tecnologías externas:
- `UserRepository`
- `ProductRepository`
- `CategoryRepository`
- `OrderRepository`
- `ProviderRepository` (`abstract getAll(): Observable<ProviderModel[]>`)

### 3. Casos de Uso (`core/application/usecases`)
Encapsulan la lógica de negocio y orquestan la interacción con los repositorios:
- `GetAllUsersUseCase`
- `GetAllProductsUseCase`
- `GetAllCategoriesUseCase`
- `GetAllOrdersUseCase`
- `GetAllProvidersUseCase`

### 4. Capa de Infraestructura (`core/infrastructure`)
Provee las implementaciones concretas para diferentes fuentes de datos con triple implementación:
- **Local (`local-implementation`)**: Generación y consumo de datos simulados mediante mocks y Faker (`ProviderLocalRepositoryImpl`).
- **Node.js (`node-implementation`)**: Consumo de microservicios REST en Node.js (`ProviderNodeRepositoryImpl`).
- **Spring Boot (`springboot-implementation`)**: Consumo de microservicios REST en Java Spring Boot (`ProviderSpringBootRepositoryImpl`).

### 5. Capa de Presentación (`presentation`)
Diseño desacoplado siguiendo el patrón **Smart & Dumb Components**:
- **Dumb Component (`ProvidersTableComponent`)**: Componente puramente presentacional. Recibe `@Input({ required: true }) providers: ProviderModel[] = [];` y renderiza una tabla Bootstrap responsiva.
- **Smart Component (`ProvidersPage`)**: Componente contenedor de página. Inyecta `GetAllProvidersUseCase`, maneja el ciclo de vida, estado de carga (`loading`), mensajes de error y lista de proveedores mediante el modelo reactivo `State<ProviderModel[]>`.

### 6. Inyección de Dependencias (`app.config.ts`)
Permite intercambiar dinámicamente la fuente de datos modificando el proveedor:
```typescript
{
  provide: ProviderRepository,
  useClass: ProviderNodeRepositoryImpl // o ProviderLocalRepositoryImpl, ProviderSpringBootRepositoryImpl
},
{
  provide: OrderRepository,
  useClass: OrderNodeRepositoryImpl
},
{
  provide: CategoryRepository,
  useClass: CategoryNodeRepositoryImpl
}
```

---

## 🛠️ Comandos y Scripts

### Instalación de dependencias
```bash
npm ci
```

### Ejecutar Servidor de Desarrollo
```bash
npm start
# o
ng serve
```
La aplicación estará accesible en: `http://localhost:4200`  
Rutas de navegación disponibles:
- `/users` - Módulo base de usuarios
- `/products` - Módulo base de productos
- `/categories` - Módulo de categorías (Integrante 1)
- `/orders` - Módulo de órdenes (Integrante 3)
- `/providers` - Módulo de proveedores (Integrante 2)

### 🧪 Pruebas Unitarias y Cobertura (Jest)
El proyecto utiliza **Jest** con `jest-preset-angular` y mocks globales para Faker:

```bash
# Ejecutar todas las pruebas unitarias
npm test

# Modo observador (watch)
npm run test:watch

# Generar reporte de cobertura de código
npm run test:coverage
```
> **Métricas de Calidad Alcanzadas:**  
> - Cobertura superior al 90% requerida (100% alcanzado en el módulo de proveedores).  
> - El reporte interactivo HTML se genera automáticamente en `coverage/index.html`.

### 📚 Documentación con Compodoc
El módulo cuenta con **100% de bloques JSDoc en español** en clases, métodos, propiedades e interfaces:

```bash
# Generar documentación estática
npm run compodoc

# Servir documentación localmente
npx compodoc -s
```
Por defecto, la documentación generada se almacena en `./documentation/` y puede visualizarse en el navegador en `http://localhost:8080`.

---

## 🌐 Endpoints y Fuentes de Datos

### Microservicios Node.js (`http://localhost:3000`)
- **Documentación Swagger**: `http://localhost:3000/api/docs`
- **Usuarios**: `GET /api/users/{countUsers}`
- **Productos**: `GET /api/products/{countProducts}`
- **Categorías**: `GET /api/categories`
- **Órdenes**: `GET /api/orders`
- **Proveedores**: `GET /api/providers`

### Microservicios Spring Boot (`http://localhost:8080`)
- **Swagger UI**: `http://localhost:8080/api/swagger-ui/index.html`
- **Usuarios**: `GET /api/users/{countUsers}`
- **Productos**: `GET /api/products/{countProducts}`
- **Categorías**: `GET /api/categories`
- **Órdenes**: `GET /api/orders`
- **Proveedores**: `GET /api/providers`
