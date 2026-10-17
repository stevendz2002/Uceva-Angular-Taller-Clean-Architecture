import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { PROVIDERS_MOCK } from '../../../mocks/providers.mocks';
import { ProviderRepository } from '../../domain/repositories/provider.repository';
import { GetAllProvidersUseCase } from './get-all-providers.usecase';

describe('GetAllProvidersUseCase', () => {
  let useCase: GetAllProvidersUseCase;

  const ProviderRepositoryMock: jest.Mocked<ProviderRepository> = { getAll: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetAllProvidersUseCase,
        { provide: ProviderRepository, useValue: ProviderRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(GetAllProvidersUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllProvidersUseCase);
  });

  it('debería delegar la llamada al repositorio y retornar los proveedores', async () => {
    ProviderRepositoryMock.getAll.mockReturnValue(of(PROVIDERS_MOCK));
    const result = await firstValueFrom(useCase.execute());
    expect(ProviderRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(PROVIDERS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un fallo', async () => {
    const errorMessage = 'Fallo en la búsqueda de proveedores';
    ProviderRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    const result$ = useCase.execute();
    await expect(firstValueFrom(result$)).rejects.toThrow(errorMessage);
    expect(ProviderRepositoryMock.getAll).toHaveBeenCalledTimes(1);
  });
});
