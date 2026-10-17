import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PROVIDERS_MOCK } from '../../../../mocks/providers.mocks';
import { ProviderModel } from '../../../domain/models/provider.model';
import { DataService } from '../../services/data.service';
import { ProviderSpringBootRepositoryImpl } from './provider-springboot.repository.impl';

describe('ProviderSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: ProviderSpringBootRepositoryImpl;

  const DataServiceMock = { getAllProvidersSpringBoot: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProviderSpringBootRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    }).compileComponents();
    repository = TestBed.inject(ProviderSpringBootRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllProvidersSpringBoot()', () => {
    const getAllSpy = DataServiceMock.getAllProvidersSpringBoot.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de proveedores como Observable', (done) => {
    DataServiceMock.getAllProvidersSpringBoot.mockReturnValue(of(PROVIDERS_MOCK));
    repository.getAll().subscribe((providers: ProviderModel[]) => {
      expect(providers).toEqual(PROVIDERS_MOCK);
      done();
    });
  });
});
