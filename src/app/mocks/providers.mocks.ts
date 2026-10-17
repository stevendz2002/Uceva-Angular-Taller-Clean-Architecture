import { ProviderModel } from "../core/domain/models/provider.model";

/**
 * Listado de proveedores simulados para pruebas y desarrollo en memoria.
 *
 * @remarks
 * Contiene 5 proveedores con datos realistas para verificar
 * la presentación y la lógica de la aplicación sin backend.
 */
export const PROVIDERS_MOCK: ProviderModel[] = [
  {
    id: 1,
    name: 'Distribuidora Andina S.A.S.',
    email: 'contacto@distribuidoraandina.com',
    phone: '+57 315 789 4512',
    city: 'Cali'
  },
  {
    id: 2,
    name: 'Lácteos del Valle Ltda.',
    email: 'ventas@lacteosdelvalle.co',
    phone: '+57 310 456 7890',
    city: 'Tuluá'
  },
  {
    id: 3,
    name: 'Avícola y Carnes Santa Cruz',
    email: 'pedidos@carnessantacruz.com',
    phone: '+57 320 654 9871',
    city: 'Buga'
  },
  {
    id: 4,
    name: 'Agrícola San Fernando E.U.',
    email: 'comercial@sanfernandoagricola.com',
    phone: '+57 318 234 5678',
    city: 'Palmira'
  },
  {
    id: 5,
    name: 'Logística y Suministros del Café',
    email: 'servicio@suministroscafe.com',
    phone: '+57 312 987 6543',
    city: 'Armenia'
  }
];
