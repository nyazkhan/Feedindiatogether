import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IWantToHelpComponent } from './i-want-to-help.component';

describe('IWantToHelpComponent', () => {
  let component: IWantToHelpComponent;
  let fixture: ComponentFixture<IWantToHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IWantToHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IWantToHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
