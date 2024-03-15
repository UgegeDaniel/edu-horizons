import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})


export class QuizComponent {
  currentIndex: number = 0;
  options = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
 @Input() quizDetails:  {
  questions: {
    question: string;
    options: string[];
    selectedOption: null | string;
  }[];
  timer: {
    show: boolean;
    hoursDisplay: number;
    minutesDisplay: number;
    secondsDisplay: number;
  };
} = {
  questions: [],
  timer: {
    show: false,
    hoursDisplay: 0,
    minutesDisplay: 0,
    secondsDisplay: 0,
  }
 }
 getButtonType(i: number) {
  return this.isCurrentQuestion(i)
    ? 'dashed'
    : this.isQuestionAnswered(i)
    ? 'primary'
    : 'default';
}
getButtonColor(question: any): string {
  return question.selectedOption !== null ? 'green' : 'red';
}

 goToPreviousQuestion(): void {
  if (this.currentIndex > 0) {
    this.currentIndex--;
  }
}

// Method to navigate to the next question
goToNextQuestion(): void {
  if (this.currentIndex < this.quizDetails.questions.length) {
    this.currentIndex++;
  }
}

onSelectOption(questionIndex: number, optionIndex: number): void {
  this.quizDetails.questions[questionIndex].selectedOption = this.options[optionIndex];
}
  // Method to check if the question is the current one
  isCurrentQuestion(index: number): boolean {
    return this.currentIndex === index;
  }

  // Method to check if the question has been answered
  isQuestionAnswered(index: number): boolean {
    return this.quizDetails.questions[index].selectedOption !== null;
  }
}
