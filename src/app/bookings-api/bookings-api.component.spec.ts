import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsApiComponent } from './bookings-api.component';

describe('BookingsApiComponent', () => {
  let component: BookingsApiComponent;
  let fixture: ComponentFixture<BookingsApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
