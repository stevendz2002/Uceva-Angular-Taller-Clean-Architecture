/**
 * Interfaz que representa el modelo de un proveedor en el dominio.
 *
 * Contiene la información esencial para representar y manipular proveedores
 * dentro del sistema de acuerdo con las reglas de negocio.
 *
 * @remarks
 * Cada proveedor incluye un identificador único numérico `id`, un nombre de empresa
 * o razón social `name`, un correo electrónico de contacto `email`, un teléfono `phone`
 * y la ciudad principal de ubicación `city`.
 *
 * @example
 * ```ts
 * const proveedor: ProviderModel = {
 *   id: 1,
 *   name: 'Distribuidora Andina S.A.S.',
 *   email: 'contacto@distribuidoraandina.com',
 *   phone: '+57 315 789 4512',
 *   city: 'Cali'
 * };
 * ```
 */
export interface ProviderModel {
  /**
   * Identificador único del proveedor.
   * @type {number}
   */
  id: number;

  /**
   * Nombre de la empresa o razón social del proveedor.
   * @type {string}
   */
  name: string;

  /**
   * Correo electrónico de contacto del proveedor.
   * @type {string}
   */
  email: string;

  /**
   * Número de teléfono o contacto del proveedor.
   * @type {string}
   */
  phone: string;

  /**
   * Ciudad de origen o ubicación del proveedor.
   * @type {string}
   */
  city: string;
}

/**
 * Alias de compatibilidad para el modelo de proveedor.
 */
export type Provider = ProviderModel;
