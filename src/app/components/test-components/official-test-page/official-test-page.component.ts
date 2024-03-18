import { Component } from '@angular/core';
import { Test } from "../../../model/new-models/test.model";
import { TestService} from "../../../service/test-service/test.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: 'app-official-test-page',
  templateUrl: './official-test-page.component.html',
  styleUrls: ['./official-test-page.component.css']
})
export class OfficialTestPageComponent {
  year: string | undefined;
  subCat: string | undefined;
  test: Test | undefined;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
  ) {
    this.route.params.subscribe((params) => {
      if (params) {
        this.subCat = params['subCat'];
        this.year = params['year'];
        this.fetchTest().subscribe(
          (data: Test) => {
            this.test = data;
            console.log(this.test);
          },
          (error) => {
            console.error('Error fetching test:', error);
          },
        );
      }
    });
  }

  // Fetch the test for the given subcategory and year
  private fetchTest(): Observable<Test> {
    if (this.subCat && this.year) {
      return this.testService.getTest(this.subCat, this.year);
    } else {
      return new Observable<Test>((observer) => {
        observer.next({} as Test);
        observer.complete();
      });
    }
  }
}
