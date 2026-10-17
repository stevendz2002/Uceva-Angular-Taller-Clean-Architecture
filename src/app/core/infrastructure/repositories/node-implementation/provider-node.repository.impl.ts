import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProviderModel } from '../../../domain/models/provider.model';
import { ProviderRepository } from '../../../domain/repositories/provider.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementación de Node.js del repositorio de proveedores.
 *
 * @remarks
 * Este repositorio pertenece a la **capa de Infrastructure**
 * y actúa como un **Adapter** entre:
 *
 * - El contrato del dominio {@link ProviderRepository}
 * - La API REST de Node.js provista por {@link DataService}
 *
 * Responsabilidades:
 * - Implementar el contrato definido por el dominio
 * - Consumir el endpoint `/providers` del backend Node.js
 *
 * ❗ Este repositorio NO contiene lógica de negocio.
 * ❗ No expone detalles de infraestructura al dominio.
 *
 * @see {@link ProviderRepository}
 * @see {@link DataService}
 */
@Injectable()
export class ProviderNodeRepositoryImpl extends ProviderRepository {

  /**
   * Datasource encargado de obtener los datos de proveedores desde Node.js.
   */
  private dataService = inject(DataService);

  /**
   * Obtiene el listado completo de proveedores desde el backend Node.js.
   *
   * @returns {Observable<ProviderModel[]>}
   * Observable que emite un arreglo de {@link ProviderModel}
   */
  getAll(): Observable<ProviderModel[]> {
    return this.dataService.getAllProvidersNode();
  }
}
