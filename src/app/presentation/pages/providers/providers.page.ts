import { Component, inject, OnInit } from '@angular/core';
import { GetAllProvidersUseCase } from '../../../core/application/usecases/get-all-providers.usecase';
import { ProviderModel } from '../../../core/domain/models/provider.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { ProvidersTableComponent } from '../../components/providers-table/providers-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Componente contenedor de proveedores (Smart Component).
 *
 * Se encarga de orquestar la obtención del listado de proveedores mediante
 * la invocación directa y exclusiva del caso de uso {@link GetAllProvidersUseCase},
 * gestionando el ciclo de vida asincrónico a través del estado {@link State}.
 *
 * @remarks
 * Este componente pertenece a la capa de presentación y administra:
 * - El estado de carga (`loading`), éxito (`success`) o fallo (`error`).
 * - El almacenamiento de los proveedores recuperados en memoria.
 * - La delegación de la visualización al componente tonto {@link ProvidersTableComponent}
 *   y las alertas al componente {@link AlertComponent}.
 */
@Component({
  selector: 'app-providers',
  templateUrl: './providers.page.html',
  imports: [ProvidersTableComponent, AlertComponent],
  providers: [GetAllProvidersUseCase],
})
export class ProvidersPage implements OnInit {
  /**
   * Listado de proveedores obtenidos desde el caso de uso.
   * @type {ProviderModel[]}
   */
  providers: ProviderModel[] = [];

  /**
   * Estado asincrónico actual de la página.
   * @type {State}
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Caso de uso para obtener los proveedores del sistema.
   * Inyectado mediante la función `inject()` de Angular.
   */
  private getAllProvidersUseCase = inject(GetAllProvidersUseCase);

  /**
   * Inicializa el componente solicitando los proveedores al caso de uso.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllProvidersUseCase.execute().subscribe({
      next: (providers) => {
        this.providers = providers;
        this.state = 'success';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }
}
