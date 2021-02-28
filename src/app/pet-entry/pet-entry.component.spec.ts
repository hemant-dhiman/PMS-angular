import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetEntryComponent } from './pet-entry.component';

describe('PetEntryComponent', () => {
  let component: PetEntryComponent;
  let fixture: ComponentFixture<PetEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
