import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProviderModel } from '../../domain/models/provider.model';
import { ProviderRepository } from '../../domain/repositories/provider.repository';

/**
 * Caso de uso para obtener el listado completo de proveedores.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y representa
 * una acción del sistema orientada al negocio: recuperar todos los
 * proveedores registrados.
 *
 * Actúa como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `ProviderRepository`.
 *
 * @remarks
 * - No conoce detalles de infraestructura.
 * - No transforma los datos para la interfaz de usuario.
 * - Propaga los resultados y errores al consumidor.
 *
 * La dependencia se resuelve mediante **inyección por contrato**
 * utilizando la función `inject()` de Angular.
 *
 * @example
 * ```ts
 * this.getAllProvidersUseCase.execute().subscribe(providers => {
 *   // manejo de proveedores
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see ProviderModel
 * @see ProviderRepository
 */
@Injectable()
export class GetAllProvidersUseCase {

  /**
   * Repositorio de proveedores inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private providerRepository = inject(ProviderRepository);

  /**
   * Ejecuta el caso de uso para obtener los proveedores.
   *
   * @returns {Observable<ProviderModel[]>}
   * Observable que emite el listado de proveedores del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - No contiene lógica de presentación.
   * - Cumple con el principio de responsabilidad única (SRP).
   */
  execute(): Observable<ProviderModel[]> {
    return this.providerRepository.getAll();
  }
}
