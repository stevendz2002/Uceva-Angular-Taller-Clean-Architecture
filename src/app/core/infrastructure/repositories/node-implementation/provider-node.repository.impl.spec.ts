import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PROVIDERS_MOCK } from '../../../../mocks/providers.mocks';
import { ProviderModel } from '../../../domain/models/provider.model';
import { DataService } from '../../services/data.service';
import { ProviderNodeRepositoryImpl } from './provider-node.repository.impl';

describe('ProviderNodeRepositoryImpl (Infrastructure)', () => {
  let repository: ProviderNodeRepositoryImpl;

  const DataServiceMock = { getAllProvidersNode: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProviderNodeRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock }
      ]
    }).compileComponents();
    repository = TestBed.inject(ProviderNodeRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllProvidersNode()', () => {
    const getAllSpy = DataServiceMock.getAllProvidersNode.mockReturnValue(of([]));
    repository.getAll().subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('debe devolver el listado de proveedores como Observable', (done) => {
    DataServiceMock.getAllProvidersNode.mockReturnValue(of(PROVIDERS_MOCK));
    repository.getAll().subscribe((providers: ProviderModel[]) => {
      expect(providers).toEqual(PROVIDERS_MOCK);
      done();
    });
  });
});
