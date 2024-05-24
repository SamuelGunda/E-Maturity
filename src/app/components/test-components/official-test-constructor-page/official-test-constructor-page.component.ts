import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Test } from "../../../model/test-parts/test.model";
import { Section } from "../../../model/test-parts/section.model";
import { Question } from "../../../model/test-parts/question.model";
import { TestService } from "../../../service/test-service/test.service";

@Component({
  selector: 'app-official-test-constructor-page',
  templateUrl: './official-test-constructor-page.component.html',
  styleUrls: ['./official-test-constructor-page.component.css'],
})

export class OfficialTestConstructorPageComponent implements OnInit {
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

  ngOnInit() {}

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
      questionJson: ['', Validators.required],
    });
    this.getQuestions(sectionIndex).push(question);
  }

  removeQuestion(sectionIndex: number, questionIndex: number) {
    this.getQuestions(sectionIndex).removeAt(questionIndex);
  }

  onSubmit() {
    console.log(this.testForm.value);
    this.testFromIntoTestModel();
  }

  async testFromIntoTestModel() {
    const sections = this.testForm.get('sections') as FormArray;

    const test: Test = {
      sections: [],
      // @ts-ignore
      subCat: this.testForm.get('subCat').value,
      // @ts-ignore
      year: this.testForm.get('year').value,
    };

    if (test.subCat === 'anj') {
      // @ts-ignore
      test.year += '-' + this.testForm.get('level').value
    }

    for (let i = 0; i < sections.length; i++) {
      const section = sections.at(i) as FormGroup;
      const articleUrls = section.get('articleUrls') as FormArray;
      const questions = section.get('questions') as FormArray;
      const newSection: Section = {
        sectionId: "{{i + 1}}",
        questions: [],
        articleUrl: [],
      };

      if (i + 1 < 10 ) {
        newSection.sectionId = '0' + (i + 1);
      }

      for (let j = 0; j < articleUrls.length; j++) {
        const articleUrl = articleUrls.at(j) as FormGroup;
        // @ts-ignore
        newSection.articleUrl.push(articleUrl.get('url').value);
      }

      for (let j = 0; j < questions.length; j++) {
        const question = questions.at(j) as FormGroup;
        // @ts-ignore
        newSection.questions = (this.parseJson(JSON.parse(question.get('questionJson').value)));
      }
      test.sections.push(newSection);
    }
    console.log(test);
    await this.testService.addOfficialTestToFirestore(test);
  }

  parseJson(json: any): Question[] {
    const questions: Question[] = [];
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        const questionJson = json[key];
        const question: Question = {
          id: key,
          text: questionJson.text || undefined,
          options: questionJson.options || undefined,
          answer: questionJson.answer || undefined,
          questionType: questionJson.questionType,
          imageUrl: questionJson.imageUrl || undefined,
          options_2: questionJson.options_2 || undefined,
          userAnswer: '',
          userAnswer_2: ''
        };
        const jsonString = JSON.stringify(question, (key, value) => value === undefined ? undefined : value);

        const cleanedQuestion = JSON.parse(jsonString);

        questions.push(cleanedQuestion);
      }
    }
    return questions;
  }
}
