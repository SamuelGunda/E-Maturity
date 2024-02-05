import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TestService} from "../service/test-service/test.service";
import {Test} from "../model/test.model";
import {Observable} from "rxjs";
import { DarkModeService } from '../dark-mode.service';


@Component({
  selector: 'app-years-page',
  templateUrl: './years-page.component.html',
  styleUrls: ['./years-page.component.css']
})
export class YearsPageComponent implements OnInit{
  subCat: string | undefined;
  years: string[] | undefined;
  loading: boolean;
  isDarkMode: boolean = false;

  constructor(private route: ActivatedRoute, private testService: TestService, private darkModeService: DarkModeService) {
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
  ngOnInit() {
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
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
