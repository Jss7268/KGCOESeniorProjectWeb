import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../app.settings';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SignupService {
  constructor(@Inject(DOCUMENT) private document: any, private appSettings: AppSettings,
    private http: HttpClient) {

  }

  getPostEndpoint() {
    return AppSettings.API_ENDPOINT + "user/signup";
  }

  submit(contactInfo: string, requestElevated: boolean) {

    this.http.post(this.getPostEndpoint(), {
      contact_info: contactInfo,
      request_elevatedd: JSON.stringify(requestElevated),
    }, { withCredentials: true }).subscribe((data: any) => {
      console.log(data);
      this.document.location.href = "./";

    });

  }
}