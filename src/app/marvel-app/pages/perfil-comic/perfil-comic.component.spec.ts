import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilComicComponent } from './perfil-comic.component';

describe('PerfilComicComponent', () => {
  let component: PerfilComicComponent;
  let fixture: ComponentFixture<PerfilComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilComicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
