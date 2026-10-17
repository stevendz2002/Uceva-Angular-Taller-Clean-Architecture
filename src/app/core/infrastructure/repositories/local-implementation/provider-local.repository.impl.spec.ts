import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PROVIDERS_MOCK } from '../../../../mocks/providers.mocks';
import { ProviderModel } from '../../../domain/models/provider.model';
import { DataService } from '../../services/data.service';
import { ProviderLocalRepositoryImpl } from './provider-local.repository.impl';

describe('ProviderLocalRepositoryImpl (Infrastructure)', () => {
  let repository: ProviderLocalRepositoryImpl;

  const DataServiceMock = { getAllProvidersLocal: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProviderLocalRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    }).compileComponents();
    repository = TestBed.inject(ProviderLocalRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllProvidersLocal()', () => {
    const getAllSpy = DataServiceMock.getAllProvidersLocal.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de proveedores como Observable', (done) => {
    DataServiceMock.getAllProvidersLocal.mockReturnValue(of(PROVIDERS_MOCK));
    repository.getAll().subscribe((providers: ProviderModel[]) => {
      expect(providers).toEqual(PROVIDERS_MOCK);
      done();
    });
  });
});
