import { Component, OnInit } from '@angular/core';

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
  }

}
