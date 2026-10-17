import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { ProviderModel } from '../../../core/domain/models/provider.model';

/**
 * Componente de tabla de proveedores (Dumb Component).
 *
 * Se utiliza para presentar un listado visual de proveedores en una tabla,
 * exponiendo datos como identificador, nombre de empresa, correo electrónico,
 * teléfono de contacto y un badge visual representativo de la ciudad.
 *
 * @remarks
 * Este componente recibe los proveedores desde su componente contenedor
 * mediante el Input `providers` y asigna tipos de badges con `cityMap`.
 *
 * Forma parte de la capa de presentación de la aplicación.
 *
 * @example
 * ```html
 * <app-providers-table [providers]="providersList"></app-providers-table>
 * ```
 */
@Component({
  selector: 'app-providers-table',
  templateUrl: './providers-table.component.html',
  imports: [CommonModule, BadgeAtom],
})
export class ProvidersTableComponent {
  /**
   * Listado de proveedores que se renderizan en la tabla.
   * @type {ProviderModel[]}
   */
  @Input() providers: ProviderModel[] = [];

  /**
   * Mapeo de ciudades a variantes de Badge de Bootstrap.
   * @type {Record<string, BadgeType>}
   * @remarks
   * Asocia ciudades con colores visuales para una mejor presentación:
   * - 'Cali' → 'primary' (azul)
   * - 'Tuluá' → 'success' (verde)
   * - 'Buga' → 'warning' (amarillo)
   * - 'Palmira' → 'info' (cian)
   * - 'Armenia' → 'secondary' (gris)
   */
  cityMap: Record<string, BadgeType> = {
    'Cali': 'primary',
    'Tuluá': 'success',
    'Buga': 'warning',
    'Palmira': 'info',
    'Armenia': 'secondary',
  };
}
