import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableApp } from 'src/app/core/models/global';
import {AuthenticationService} from "../login/shared/authentication.service";
import { StorageService } from '../core/services/storage.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { HomeUpdateDialogComponent } from './home-update-dialog/home-update-dialog.component';
import { HomeCreateComponent } from './home-create/home-create.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  formDiscover:FormGroup;
  displayedColumns = ['name','type','store','amount','actions'];
  dataSource: MatTableDataSource<DataTableApp>;

  productType: any = [];
  countCant;

  constructor(
    private authenticationService: AuthenticationService,
    private _dialog: MatDialog
    ) {
    this.dataSource = new MatTableDataSource([]);
   }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct(){
    this.authenticationService.getAllProduct().subscribe(
      async (data:any) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;          
        },
        error => {
          console.log(error)
    })    
  }
  productDelete(row): void {
    this._dialog.open(ConfirmationDialogComponent, {
      data: '¿Está seguro que desea eliminar?'
    })
    .afterClosed().subscribe((confirmed: Boolean) => {
      if (confirmed) {
        this.deleteItem(row);
      }
    });
  }
  deleteItem = async(row) => {    
    await this.authenticationService.deleteItemProdct(row.id, this.dataSource.data).subscribe(
      async (data:any) => {
        this.dataSource.data = data;        
      },
      (error:any) => {
        console.log('Error:' + error);
      }
    )
  }
  productEdit(row){
    const dialogRef = this._dialog.open(HomeUpdateDialogComponent, {
      data: {
        id: row.id,
        name: row.name,
        store: row.store,
        type: row.type,
        amount: row.amount
      }      
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        
      }else {
        
      }
    });
  }
  createProducto(){
    const dialogRef = this._dialog.open(HomeCreateComponent, {           
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataSource.data = result.data;
        
      }else {
      }
    });
  }
}
