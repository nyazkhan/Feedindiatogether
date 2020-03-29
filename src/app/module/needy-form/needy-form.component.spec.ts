import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedyFormComponent } from './needy-form.component';

describe('NeedyFormComponent', () => {
  let component: NeedyFormComponent;
  let fixture: ComponentFixture<NeedyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
