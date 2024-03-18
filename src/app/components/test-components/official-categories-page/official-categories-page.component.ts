import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TestService } from "src/app/service/test-service/test.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-official-categories-page',
  templateUrl: './official-categories-page.component.html',
  styleUrls: ['./official-categories-page.component.css']
})
export class OfficialCategoriesPageComponent {
  subCat: string | undefined;
  years: string[] | undefined;
  loading: boolean;
  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
  ) {
    this.loading = true;
    this.route.params.subscribe((params) => {
      if (params) {
        this.subCat = params['subCat'];
        this.fetchTestYears().subscribe(
          (data: string[]) => {
            this.years = data;
            console.log(this.years);
            this.loading = false;
          },
          (error) => {
            console.error('Error fetching tests:', error);
          },
        );
      }
    });
  }

  // Fetch the years of the tests for the given subcategory
  private fetchTestYears(): Observable<string[]> {
    if (this.subCat) {
      return this.testService.getTestsYears(this.subCat);
    } else {
      return new Observable<string[]>((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
  }
}

