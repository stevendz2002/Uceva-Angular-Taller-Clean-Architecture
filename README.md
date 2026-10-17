# Clean Architecture en Angular - Taller 6

**UCEVA - Arquitectura de Software**  
**Docente:** Jesús David Mejía Vergara  
**Integrante 1:** Jhon Edward Steven Loaiza Diaz (Módulo: `categories`)  

---

## Estructura General del Proyecto

```
src/app
│
├── core
│   ├── domain
│   │   ├── models
│   │   │   ├── user.model.ts
│   │   │   ├── product.model.ts
│   │   │   └── category.model.ts
│   │   └── repositories
│   │       ├── user.repository.ts
│   │       ├── product.repository.ts
│   │       └── category.repository.ts
│   │
│   ├── application
│   │   └── usecases
│   │       ├── get-all-users.usecase.ts
│   │       ├── get-all-products.usecase.ts
│   │       └── get-all-categories.usecase.ts
│   │
│   └── infrastructure
│       ├── services
│       │   └── data.service.ts
│       └── repositories
│           ├── local-implementation
│           │   ├── user-local.repository.impl.ts
│           │   ├── product-local.repository.impl.ts
│           │   └── category-local.repository.impl.ts
│           ├── node-implementation
│           │   ├── user-node.repository.impl.ts
│           │   ├── product-node.repository.impl.ts
│           │   └── category-node.repository.impl.ts
│           └── springboot-implementation
│               ├── user-springboot.repository.impl.ts
│               ├── product-springboot.repository.impl.ts
│               └── category-springboot.repository.impl.ts
│
├── mocks
│   ├── users.mocks.ts
│   ├── products.mocks.ts
│   └── categories.mocks.ts
│
├── presentation
│   ├── components
│   │   ├── alert/
│   │   ├── users-table/
│   │   ├── products-table/
│   │   └── categories-table/
│   │       ├── categories-table.component.ts
│   │       ├── categories-table.component.html
│   │       └── categories-table.component.spec.ts
│   └── pages
│       ├── users/
│       ├── products/
│       └── categories/
│           ├── categories.page.ts
│           ├── categories.page.html
│           └── categories.page.spec.ts
│
├── app.config.ts
├── app.routes.ts
└── app.ts
```

---

## Implementación del Módulo `categories`

1. **Dominio:** `Category` (`CategoryModel`) y `CategoryRepository` (clase abstracta con `getAll(): Observable<Category[]>`).
2. **Aplicación:** `GetAllCategoriesUseCase` inyecta `CategoryRepository` por contrato y orquesta la consulta de datos.
3. **Infraestructura:**
   - `CategoryLocalRepositoryImpl`: consulta `DataService.getAllCategoriesLocal()`.
   - `CategoryNodeRepositoryImpl`: consulta `DataService.getAllCategoriesNode()` (`/api/categories`).
   - `CategorySpringBootRepositoryImpl`: consulta `DataService.getAllCategoriesSpringBoot()` (`/api/categories`).
4. **Presentación:**
   - `CategoriesTableComponent`: Dumb component con `@Input() categories` y badges visuales según `active`.
   - `CategoriesPage`: Smart component que inyecta únicamente `GetAllCategoriesUseCase` y maneja `State`.
5. **Configuración de Proveedores (`src/app/app.config.ts`):**
   ```ts
   // Intercambio declarativo del proveedor:
   { provide: CategoryRepository, useClass: CategoryNodeRepositoryImpl },
   //{ provide: CategoryRepository, useClass: CategorySpringBootRepositoryImpl },
   //{ provide: CategoryRepository, useClass: CategoryLocalRepositoryImpl },
   ```

---

## Comandos y Verificación

### Ejecución de Pruebas Unitarias (Jest)
```bash
npm test
npm run test:coverage
```
> **Cobertura obtenida:** 100% en Stmts, Branch, Funcs y Lines en todo el módulo `categories` (83 pruebas unitarias aprobadas en 21 suites).

### Generación de Documentación (Compodoc)
```bash
npm run compodoc
```
> Documentación HTML interactiva generada en `./documentation/` con 100% de bloques JSDoc en español.

### Ejecución de la Aplicación
```bash
npm start
```
- Frontend: `http://localhost:4200` (Rutas: `/users`, `/products`, `/categories`)