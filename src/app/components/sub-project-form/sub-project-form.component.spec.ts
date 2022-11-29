import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProjectFormComponent } from './sub-project-form.component';

describe('SubProjectFormComponent', () => {
  let component: SubProjectFormComponent;
  let fixture: ComponentFixture<SubProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubProjectFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
