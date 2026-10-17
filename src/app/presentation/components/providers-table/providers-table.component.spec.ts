import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PROVIDERS_MOCK } from '../../../mocks/providers.mocks';
import { ProvidersTableComponent } from './providers-table.component';

describe('ProvidersTableComponent', () => {
  let component: ProvidersTableComponent;
  let fixture: ComponentFixture<ProvidersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvidersTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProvidersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('debería renderizar una fila por cada proveedor', () => {
    component.providers = PROVIDERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.providers.length);
  });

  it('debería mostrar los datos del proveedor en cada columna', () => {
    component.providers = PROVIDERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const provider = component.providers[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(provider.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(provider.name);
      expect(columns[2].nativeElement.textContent.trim()).toBe(provider.email);
      expect(columns[3].nativeElement.textContent.trim()).toBe(provider.phone);
      expect(columns[4].nativeElement.textContent.trim()).toBe(provider.city);
    });
  });

  it('debería mapear cada ciudad a su BadgeType correcto', () => {
    expect(component.cityMap['Cali']).toBe('primary');
    expect(component.cityMap['Tuluá']).toBe('success');
    expect(component.cityMap['Buga']).toBe('warning');
    expect(component.cityMap['Palmira']).toBe('info');
    expect(component.cityMap['Armenia']).toBe('secondary');
  });
});
