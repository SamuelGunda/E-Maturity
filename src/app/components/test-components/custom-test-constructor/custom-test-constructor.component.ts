import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Test } from "../../../model/test-parts/test.model";
import { Section } from "../../../model/test-parts/section.model";
import { Question } from "../../../model/test-parts/question.model";
import { TestService } from "../../../service/test-service/test.service";

@Component({
  selector: 'app-custom-test-constructor',
  templateUrl: './custom-test-constructor.component.html',
  styleUrls: ['./custom-test-constructor.component.css']
})
export class CustomTestConstructorComponent implements OnInit {
  testForm = this.fb.group({
    year: ['', Validators.required],
    subCat: ['', Validators.required],
    level: ['', Validators.required],
    sections: this.fb.array([
      this.fb.group({
        sectionNumber: 1,
        articleUrls: this.fb.array([
          this.fb.group({
            url: ['', Validators.required],
          }),
        ]),
        questions: this.fb.array([
          this.fb.group({
            questionJson: ['', Validators.required],
          }),
        ]),
      }),
    ]),
  });

  constructor(private fb: FormBuilder, private testService: TestService) {}

  ngOnInit(): void {
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
      questions: this.fb.array([
        this.fb.group({
          questionJson: ['', Validators.required],
        }),
      ]),
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

  removeArticleUrl(sectionIndex: number, articleUrlIndex: number) {
    this.getArticleUrls(sectionIndex).removeAt(articleUrlIndex);
  }

  getQuestions(sectionIndex: number) {
    return (this.sections.at(sectionIndex) as FormGroup).get('questions') as FormArray;
  }

  addQuestion(sectionIndex: number) {
    const question = this.fb.group({

    });
    this.getQuestions(sectionIndex).push(question);
  }

  removeQuestion(sectionIndex: number, questionIndex: number) {
    this.getQuestions(sectionIndex).removeAt(questionIndex);
  }

  onSubmit() {
    console.log(this.testForm.value);
  }
}
