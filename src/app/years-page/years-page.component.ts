import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TestService} from "../service/test-service/test.service";
import {Test} from "../model/test.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-years-page',
  templateUrl: './years-page.component.html',
  styleUrls: ['./years-page.component.css']
})
export class YearsPageComponent {
  subCat: string | undefined;
  years: string[] | undefined;
  loading: boolean;

  constructor(private route: ActivatedRoute, private testService: TestService) {
    this.loading = true;
    this.route.params.subscribe(params => {
      if (params) {
        this.subCat = params['subCat'];
        this.fetchTestYears().subscribe(
          (data: string[]) => {
            this.years = data;
            console.log(this.years)
            this.loading=false;
          },
          (error) => {
            console.error('Error fetching tests:', error);
          }
        );
      }
    });
  }

  private fetchTestYears(): Observable<string[]> {
    if (this.subCat) {
      return this.testService.getTestsYears(this.subCat);
    } else {
      return new Observable<string[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }
  }
}
