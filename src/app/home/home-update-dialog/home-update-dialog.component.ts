import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import { GlobalService } from 'src/app/core/services/global.service';


@Component({
  selector: 'app-home-update-dialog',
  templateUrl: './home-update-dialog.component.html',
  styleUrls: ['./home-update-dialog.component.css']
})
export class HomeUpdateDialogComponent implements OnInit {

  formGroup: FormGroup;

  constructor(    
    public _dialog: MatDialogRef<HomeUpdateDialogComponent>,
    public fb: FormBuilder,        
    @Inject(MAT_DIALOG_DATA) public data: any,
    private globalService: GlobalService,
    ) {
    
   }

  ngOnInit() {
    this.loadForm();
  }
  loadForm(){
    this.formGroup = this.fb.group({
      name: [this.data.name, Validators.required],
      type: [this.data.type, Validators.required],
      store: [this.data.store, [Validators.required, Validators.min(0)]],
      amount:[this.data.amount, Validators.required],
    });
  }
  closeDialog(): void {
    this._dialog.close(false);
  }
  onSubmit(): void {
    let idProduct = this.data.id;
    let valor = this.data.valor
    var body = {
      'id':this.data.id,
      'name':this.formGroup.get('name').value,
      'type':this.formGroup.get('type').value,
      'store':this.formGroup.get('store').value,
      'amount':this.formGroup.get('amount').value
    }
    this.updateProduct(idProduct, body,valor);
  }
  updateProduct  = async(id: number, request: any, valor) => {
    await this.globalService.updateItemProduct(id, request, valor).subscribe(
      async (data:any) => {        
        this._dialog.close({event:true,data:data});
      },
      (error:any) => {
        this._dialog.close(true);
      }
    )
  }
}
