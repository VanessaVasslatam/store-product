import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import { GlobalService } from 'src/app/core/services/global.service';


@Component({
  selector: 'app-home-create',
  templateUrl: './home-create.component.html',
  styleUrls: ['./home-create.component.css']
})
export class HomeCreateComponent implements OnInit {

  formGroup: FormGroup;

  constructor(    
    public _dialog: MatDialogRef<HomeCreateComponent>,
    public fb: FormBuilder,        
    @Inject(MAT_DIALOG_DATA) public data: any,
    private globalService: GlobalService
    ) {
    
   }

  ngOnInit() {
    this.loadForm();
  }
  loadForm(){
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      store: ['', [Validators.required, Validators.min(0)]],
      amount:['', Validators.required],
    });
  }
  closeDialog(): void {
    this._dialog.close(false);
  }
  onSubmit(): void {
    var body = {
      'name':this.formGroup.get('name').value,
      'type':this.formGroup.get('type').value,
      'store':this.formGroup.get('store').value,
      'amount':this.formGroup.get('amount').value
    }
    this.createProduct(body);
  }
  createProduct  = async(request: any) => {
    await this.globalService.createItemProduct(request).subscribe(
      async (data:any) => {
        this._dialog.close({event:true,data:data});
      },
      (error:any) => {
        console.log("Error");
      }
    )
  }
}
