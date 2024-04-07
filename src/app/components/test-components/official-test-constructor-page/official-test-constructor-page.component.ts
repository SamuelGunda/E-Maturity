import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Test } from "../../../model/test-parts/test.model";
import { Section } from "../../../model/test-parts/section.model";
import { Question } from "../../../model/test-parts/question.model";

@Component({
  selector: 'app-official-test-constructor-page',
  templateUrl: './official-test-constructor-page.component.html',
  styleUrls: ['./official-test-constructor-page.component.css'],
})
export class OfficialTestConstructorPageComponent implements OnInit {
  year: string | undefined;
  subCat: string | undefined;
  testForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.testForm = this.fb.group({
      sections: this.fb.array([
        this.fb.group({
          sectionNumber: 1,
          articleUrls: this.fb.array([
            this.fb.group({
              url: ['', Validators.required],
            }),
          ]),
          questions: this.fb.array([]),
        }),
      ]),
    });
  }

  get sections() {
    return this.testForm.get('sections') as FormArray;
  }

  addSection() {
    const sectionNumber = this.sections.length + 1;
    this.sections.push(this.fb.group({
      sectionNumber,
      articleUrls: this.fb.array([
        this.fb.group({
          url: ['', Validators.required],
        }),
      ]),
      questions: this.fb.array([]),
    }));
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }


  getArticleUrls(sectionIndex: number) {
    return (this.sections.at(sectionIndex) as FormGroup).get('articleUrls') as FormArray;
  }

  addArticleUrl(sectionIndex: number) {
    const articleUrl = this.fb.group({
      url: ['', Validators.required],
    });
    this.getArticleUrls(sectionIndex).push(articleUrl);
  }
}
