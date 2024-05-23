export interface Question {
    // The id of the question.
    id: string;
    // The text of the question.
    text?: string;
    // The url of the image for the question.
    imageUrl?: string;
    // The correct answer to the question.
    answer: string | string[];

    /* Question types:
     * select - radio buttons,
     * select_twice - 2 sets of radio buttons,
     * input - type-out answer,
     * input_twice - type-out 2 different values,
     * cancelled - question was cancelled by NUCEM,
     */
    questionType: string;
    // The options for the question.
    options?: string[];
    // The options for the question, if it has 2 sets of options.
    options_2?: string[];
    // The answer the user gave to the question.
    userAnswer?: any;
    // The answer the user gave to the question, if it has 2 values to input.
    userAnswer_2?: string;
}
