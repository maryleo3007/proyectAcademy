import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ventana',
  templateUrl: './ventana.component.html',
  styleUrls: ['./ventana.component.scss']
})
export class VentanaComponent implements OnInit {
  asitencia: any;

  constructor(
    public dialogRef: MatDialogRef<VentanaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.asitencia = data.asitencia;
        
   }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();   
}
}
