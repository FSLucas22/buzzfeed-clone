import { Component, OnInit } from '@angular/core';
import quizz_question from '../../../assets/data/quizz_questions.json'

type Alias = keyof typeof quizz_question.results;

type QuestionOption = {
  id: number,
  name: string,
  alias: string
}

type Question = {
  id: number,
  question: string,
  options: Array<QuestionOption>
};

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title: string = "Title";

  selectedQuestion: Question = {id: 1, question: "Selected question", options: []};
  questions: Array<Question> = [];
  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  answers: Array<string> = [];
  selectedAnswer: string = "Selected answer";
  optionName: string = "Option name";

  finished: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (quizz_question.questions.length == 0) {
      return;
    }

    this.finished = false;
    this.title = quizz_question.title;
    this.questions = quizz_question.questions;
    this.selectedQuestion = this.questions[this.questionIndex];

    this.questionIndex = 0;
    this.questionMaxIndex = this.questions.length;
  }

  playerChoice(alias: string) {
    this.answers.push(alias);
    this.nextStep();
  }

  nextStep() {
    this.questionIndex++;

    if (this.questionIndex == this.questionMaxIndex) {
      this.finished = true;
      this.setResult();
    } else {
      this.selectedQuestion = this.questions[this.questionIndex];
    }
  }

  async setResult() {
    const result = this.answers.reduce((prev, curr, i, arr) => {
      if(
        arr.filter(item => item === prev).length >
        arr.filter(item => item == curr).length
      ) {

        return prev;
      }
      return curr;
    }) as Alias;

    this.selectedAnswer = quizz_question.results[result]
  }
}
