import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProductSuccessDialogComponent } from './buy-product-success-dialog.component';

describe('BuyProductSuccessDialogComponent', () => {
  let component: BuyProductSuccessDialogComponent;
  let fixture: ComponentFixture<BuyProductSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyProductSuccessDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyProductSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
