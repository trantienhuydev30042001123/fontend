import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-buy-product-success-dialog',
  templateUrl: './buy-product-success-dialog.component.html',
  styleUrls: ['./buy-product-success-dialog.component.css']
})
export class BuyProductSuccessDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { isSuccess: boolean },
              public dialogRef: MatDialogRef<BuyProductSuccessDialogComponent>
  ) {}
  
  closeDialog(): void {
    this.dialogRef.close();
  }
}
