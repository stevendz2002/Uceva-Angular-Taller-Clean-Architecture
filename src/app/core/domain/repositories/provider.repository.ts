import { Observable } from 'rxjs';
import { ProviderModel } from '../models/provider.model';

/**
 * Contrato del repositorio de proveedores.
 *
 * @description
 * Esta clase abstracta define el **contrato de acceso a datos**
 * para la entidad `ProviderModel` dentro del dominio.
 *
 * Forma parte de la **capa de dominio** y establece las operaciones
 * que cualquier implementación concreta debe cumplir, sin exponer
 * detalles de infraestructura (HTTP, base de datos, mocks, etc.).
 *
 * @remarks
 * Las implementaciones concretas de este repositorio residen
 * en la capa de infraestructura y son completamente intercambiables.
 *
 * @example
 * ```ts
 * // Inyección de dependencia por contrato
 * constructor(private providerRepository: ProviderRepository) {}
 * ```
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see ProviderModel
 */
export abstract class ProviderRepository {

  /**
   * Obtiene el listado completo de proveedores.
   *
   * @returns {Observable<ProviderModel[]>}
   * Observable que emite un arreglo de proveedores del dominio.
   *
   * @remarks
   * - No define la fuente de datos subyacente.
   * - No gestiona errores de presentación.
   * - Propaga los errores al caso de uso consumidor.
   */
  abstract getAll(): Observable<ProviderModel[]>;
}
