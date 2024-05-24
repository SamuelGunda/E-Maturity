import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Test } from '../../../model/test-parts/test.model';
import { Section } from '../../../model/test-parts/section.model';
import { Question } from '../../../model/test-parts/question.model';
import { TestService } from '../../../service/test-service/test.service';

@Component({
    selector: 'app-official-test-constructor-page',
    templateUrl: './official-test-constructor-page.component.html',
    styleUrls: ['./official-test-constructor-page.component.css'],
})
export class OfficialTestConstructorPageComponent implements OnInit {
    testForm = this.fb.group({
        year: ['', Validators.required],
        subCat: ['', Validators.required],
        level: '',
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

    constructor(
        private fb: FormBuilder,
        private testService: TestService,
    ) {}

    ngOnInit() {}

    get sections() {
        return this.testForm.get('sections') as FormArray;
    }

    addSection() {
        const sectionNumber = this.sections.length + 1;
        this.sections.push(
            this.fb.group({
                sectionNumber,
                articleUrls: this.fb.array([
                    this.fb.group({
                        url: ['', Validators.required],
                    }),
                ]),
                questions: this.fb.array([]),
            }),
        );
    }

    removeSection(index: number) {
        this.sections.removeAt(index);
    }

    getArticleUrls(sectionIndex: number) {
        return (this.sections.at(sectionIndex) as FormGroup).get(
            'articleUrls',
        ) as FormArray;
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
        return (this.sections.at(sectionIndex) as FormGroup).get(
            'questions',
        ) as FormArray;
    }

    addQuestion(sectionIndex: number) {
        const question = this.fb.group({
            questionType: ['', Validators.required],
            question: ['', Validators.required],
        });
        this.getQuestions(sectionIndex).push(question);
    }

    removeQuestion(sectionIndex: number, questionIndex: number) {
        this.getQuestions(sectionIndex).removeAt(questionIndex);
    }

    addQuestionType(sectionIndex: number, questionIndex: number, type: string) {
        const questions = this.getQuestions(sectionIndex);
        questions.removeAt(questionIndex);

        let questionGroup;
        if (type === 'select') {
            questionGroup = this.fb.group({
                questionType: [type, Validators.required],
                text: ['', Validators.required],
                options: this.fb.array([
                    this.fb.group({ option: ['', Validators.required] }),
                ]),
                [`answer${questionIndex}`]: '',
            });
        } else if (type === 'select_twice') {
            questionGroup = this.fb.group({
                questionType: [type, Validators.required],
                text: ['', Validators.required],
                options: this.fb.array([
                    this.fb.group({ option: ['', Validators.required] }),
                ]),
                options2: this.fb.array([
                    this.fb.group({ option2: ['', Validators.required] }),
                ]),
                [`answer${questionIndex}`]: '',
                [`answer2${questionIndex}`]: '',
            });
        } else if (type === 'input') {
            questionGroup = this.fb.group({
                questionType: [type, Validators.required],
                text: ['', Validators.required],
                [`answer${questionIndex}`]: ['', Validators.required],
            });
        } else if (type === 'input_twice') {
            questionGroup = this.fb.group({
                questionType: [type, Validators.required],
                text: ['', Validators.required],
                [`answer${questionIndex}`]: ['', Validators.required],
                [`answer2${questionIndex}`]: ['', Validators.required],
            });
        }
        questions.insert(questionIndex, questionGroup); // Add the new question
    }

    getOptions(sectionIndex: number, questionIndex: number) {
        return (
            this.getQuestions(sectionIndex).at(questionIndex) as FormGroup
        ).get('options') as FormArray;
    }

    addOption(sectionIndex: number, questionIndex: number) {
        const options = this.getOptions(sectionIndex, questionIndex);
        options.push(this.fb.group({ option: ['', Validators.required] }));
    }

    removeOption(
        sectionIndex: number,
        questionIndex: number,
        optionIndex: number,
    ) {
        const options = this.getOptions(sectionIndex, questionIndex);
        options.removeAt(optionIndex);
    }

    getOptions2(sectionIndex: number, questionIndex: number) {
        return (
            this.getQuestions(sectionIndex).at(questionIndex) as FormGroup
        ).get('options2') as FormArray;
    }

    addOption2(sectionIndex: number, questionIndex: number) {
        const options2 = this.getOptions2(sectionIndex, questionIndex);
        options2.push(this.fb.group({ option2: ['', Validators.required] }));
    }

    removeOption2(
        sectionIndex: number,
        questionIndex: number,
        optionIndex: number,
    ) {
        const options2 = this.getOptions2(sectionIndex, questionIndex);
        options2.removeAt(optionIndex);
    }

    onSubmit() {
        this.testFromIntoTestModel().then((r) => console.log('done'));
    }

    async testFromIntoTestModel() {
        const test: Test = {
            sections: [],
            subCat: '',
            year: '',
        };

        const sections = this.testForm.get('sections') as FormArray;
        const subCat = this.testForm.get('subCat')?.value;
        const year = this.testForm.get('year')?.value;
        let questionCounter = 1;

        if (subCat != null) {
            test.subCat = subCat;
        }

        if (year != null) {
            test.year = year;
        }

        if (subCat === 'anj') {
            const level = this.testForm.get('level')?.value;
            if (!level) {
                console.error(
                    'Level value is null. Stopping function execution.',
                );
                return;
            }
            test.year += '-' + level;
            console.log(test.year);
        }

        for (
            let sectionIndex = 0;
            sectionIndex < sections.length;
            sectionIndex++
        ) {
            const newSection: Section = {
                sectionId: '',
                questions: [],
                articleUrl: [],
            };

            if (sectionIndex + 1 < 10) {
                newSection.sectionId = '0' + (sectionIndex + 1);
            } else {
                newSection.sectionId = (sectionIndex + 1).toString();
            }

            const section = sections.at(sectionIndex) as FormGroup;
            const articleUrls = section.get('articleUrls') as FormArray;
            const questions = section.get('questions') as FormArray;

            for (
                let questionIndex = 0;
                questionIndex < questions.length;
                questionIndex++
            ) {
                const newQuestion: Question = {
                    id: '',
                    questionType: '',
                    text: '',
                    answer: [],
                    options: [],
                    options_2: [],
                };

                if (questionCounter < 10) {
                    newQuestion.id = '0' + questionCounter;
                } else {
                    newQuestion.id = questionCounter.toString();
                }

                const question = questions.at(questionIndex) as FormGroup;
                const questionType = question.get('questionType')?.value;
                newQuestion.questionType = questionType;
                newQuestion.text = question.get('text')?.value;

                switch (questionType) {
                    case 'select': {
                        const options = question.get('options') as FormArray;
                        for (
                            let optionIndex = 0;
                            optionIndex < options.length;
                            optionIndex++
                        ) {
                            const option = question.get('options') as FormArray;
                            const optionValue = option.at(
                                optionIndex,
                            ) as FormGroup;
                            newQuestion.options!.push(
                                optionValue.get('option')?.value,
                            );
                            let answer = question.get(
                                `answer${questionIndex}`,
                            )?.value;
                            if (answer == optionIndex) {
                                newQuestion.answer =
                                    optionValue.get('option')?.value;
                            }
                        }
                        break;
                    }

                    case 'select_twice': {
                        const options = question.get('options') as FormArray;
                        const options2 = question.get('options2') as FormArray;
                        let answer = '';
                        let answer2 = '';
                        for (
                            let optionIndex = 0;
                            optionIndex < options.length;
                            optionIndex++
                        ) {
                            const option = question.get('options') as FormArray;
                            const optionValue = option.at(
                                optionIndex,
                            ) as FormGroup;
                            newQuestion.options!.push(
                                optionValue.get('option')?.value,
                            );

                            // If the answer is the index of the option, then the answer is the value of the option
                            let answer = question.get(
                                `answer${questionIndex}`,
                            )?.value;
                            if (answer == optionIndex) {
                                answer = optionValue.get('option')?.value;
                            }
                        }
                        for (
                            let option2Index = 0;
                            option2Index < options2.length;
                            option2Index++
                        ) {
                            const option = question.get(
                                'options2',
                            ) as FormArray;
                            const optionValue = option.at(
                                option2Index,
                            ) as FormGroup;
                            newQuestion.options_2!.push(
                                optionValue.get('option2')?.value,
                            );
                            // If the answer is the index of the option, then the answer is the value of the option
                            let answer2 = question.get(
                                `answer2${questionIndex}`,
                            )?.value;
                            if (answer2 == option2Index) {
                                answer2 = optionValue.get('option2')?.value;
                            }
                        }
                        newQuestion.answer = answer + '-' + answer2;
                        break;
                    }

                    case 'input': {
                        newQuestion.answer = question.get(
                            `answer${questionIndex}`,
                        )?.value;
                        break;
                    }

                    case 'input_twice': {
                        if (typeof newQuestion.answer !== 'string') {
                            newQuestion.answer.push(
                                question.get(`answer${questionIndex}`)?.value,
                                question.get(`answer2${questionIndex}`)?.value,
                            );
                        }
                        break;
                    }
                }
                questionCounter++;
                newSection.questions.push(newQuestion);
            }

            for (
                let articleIndex = 0;
                articleIndex < articleUrls.length;
                articleIndex++
            ) {
                const articleUrl = articleUrls.at(articleIndex) as FormGroup;
                newSection.articleUrl!.push(articleUrl.get('url')?.value);
            }

            test.sections.push(newSection);
        }

        console.log(test);
        await this.testService.addOfficialTestToFirestore(test);
    }
}
