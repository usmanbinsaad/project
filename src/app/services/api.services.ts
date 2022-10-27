import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class ApiServices {

  private urlPath = 'http://localhost:3000/';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  public get(path: string) {
    return this.http.get(this.urlPath + path);
  }

  public post(path: string, body: any) {
    let data = this.http.post(this.urlPath + path, body);

    console.log('Data ==>', data);
    return data;
  }

  public put(path: string, body: any) {
    return this.http.put(this.urlPath + path, body);
  }

  public delete(path: string, id: number) {
    return this.http.delete(this.urlPath + path + '/' + id);
  }

  successNotification(message: string, title: string) {
    this.toastr.success(message, title, {
      timeOut: 2000,
    });
  }

  errorNotification(message: string, title: string) {
    this.toastr.error(message, title, {
      timeOut: 2000,
    });
  }

  infoNotification(message: string, title: string) {
    this.toastr.info(message, title, {
      timeOut: 2000,
    });
  }

  warningNotification(message: string, title: string) {
    this.toastr.warning(message, title, {
      timeOut: 5000,
    });
  }
}
