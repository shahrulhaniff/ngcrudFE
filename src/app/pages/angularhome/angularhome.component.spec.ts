import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularhomeComponent } from './angularhome.component';

describe('AngularhomeComponent', () => {
  let component: AngularhomeComponent;
  let fixture: ComponentFixture<AngularhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
