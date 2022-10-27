import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiServices } from '../services/api.services';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface employee {
  id: number;
  name: string;
  age: number;
  cell: number;
  email: string;
}

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  dtOptions: any = {};
  persons: employee[] = [];
  _searchTerm: any;
  validateForm!: FormGroup;
  itemdata = 'Search User';
  userdata: readonly employee[] = [];
  tabledata: readonly employee[] = [];
  constructor(
    private apiServices: ApiServices,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback: any) => {
        this.http
          .get('http://localhost:3000/employee')
          .subscribe((data: any) => {
            this.persons = data;
            this.userdata = data;
            this.tabledata = data;

            callback({
              recordsTotal: data.recordsTotal,
              recordsFiltered: data.recordsFiltered,
              data: [],
            });
          });
      },
      columns: [
        { data: 'id' },
        { data: 'name' },
        { data: 'email' },
        { data: 'age' },
        { data: 'contactNo' },
      ],
    };


  }

  filterEmployee(searchData: string) {
    console.log(
      ' the filtered data  ==> ',
      this.persons.filter(
        (employee) =>
          employee.name.toLowerCase().indexOf(searchData.toLowerCase()) !== -1
      )
    );
    return this.persons.filter(
      (employee) =>
        employee.name.toLowerCase().indexOf(searchData.toLowerCase()) !== -1
    );
  }

  checkData(event: any) {
    this.apiServices.get('employee').subscribe((data: any) => {
      this.persons = data;
    });
    console.log(' data', event);

    let searchValue = event;
    this._searchTerm = searchValue;
this.itemdata=this._searchTerm
    this.persons = this.filterEmployee(this._searchTerm);
    this.tabledata = this.persons;
  }

  Alldata() {
    this.apiServices.get('employee').subscribe((data: any) => {
      this.persons = data;
    });
    this.itemdata='All'
    this.tabledata=this.persons
  }
  onChange(event: any) {
    console.log(event);
  }
}
