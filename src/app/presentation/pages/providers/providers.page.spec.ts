import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllProvidersUseCase } from '../../../core/application/usecases/get-all-providers.usecase';
import { PROVIDERS_MOCK } from '../../../mocks/providers.mocks';
import { ProvidersTableComponent } from '../../components/providers-table/providers-table.component';
import { ProvidersPage } from './providers.page';

describe('ProvidersPage', () => {
  let component: ProvidersPage;
  let fixture: ComponentFixture<ProvidersPage>;

  const GetAllProvidersUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvidersPage, ProvidersTableComponent],
    })
      .overrideComponent(ProvidersPage, {
        set: {
          providers: [
            { provide: GetAllProvidersUseCase, useValue: GetAllProvidersUseCaseMock }
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProvidersPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente en su estado inicial', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.providers).toEqual([]);
  });

  it('debe cargar los proveedores y cambiar el estado a success', () => {
    GetAllProvidersUseCaseMock.execute.mockReturnValue(of(PROVIDERS_MOCK));
    fixture.detectChanges();
    expect(component.providers).toEqual(PROVIDERS_MOCK);
    expect(component.state).toBe('success');
  });

  it('no debería cargar los proveedores y cambiar el estado a error cuando falle el caso de uso', () => {
    GetAllProvidersUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('Error de conexión'))
    );
    fixture.detectChanges();
    expect(component.providers).toEqual([]);
    expect(component.state).toBe('error');
  });
});
