import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilHeroeComponent } from './perfil-heroe.component';

describe('PerfilHeroeComponent', () => {
  let component: PerfilHeroeComponent;
  let fixture: ComponentFixture<PerfilHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilHeroeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
