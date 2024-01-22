import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TestService} from "../service/test-service/test.service";
import {Test} from "../model/test.model";

@Component({
  selector: 'app-years-page',
  templateUrl: './years-page.component.html',
  styleUrls: ['./years-page.component.css']
})
export class YearsPageComponent {
  subCat: string | undefined;

  constructor(private route: ActivatedRoute, private testService: TestService) {
    this.route.params.subscribe(params => {
      if (params) {
        this.subCat = params['subCat'];
      }
    });
  }

  ngOnInit(): void {
    this.testService.getTests().subscribe(
      (tests: Test[]) => {
        console.log('Tests:', tests);
      },
      (error) => {
        console.error('Error fetching tests:', error);
      }
    );
  }

}
