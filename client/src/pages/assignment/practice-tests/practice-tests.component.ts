import { Component } from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';
import { interval, Subscription } from 'rxjs';

const userList = ['Lucy', 'U', 'Tom'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

@Component({
  selector: 'app-practice-tests',
  templateUrl: './practice-tests.component.html',
  styleUrls: ['./practice-tests.component.css'],
})


export class PracticeTestsComponent {
  practiceTests = [
    {
      title: {
        subject: 'Maths',
        topic: 'Quadratic Equations',
      },
      description: 'Test your math skills',
      avatar: 'tag',
    },
    {
      title: {
        subject: 'Science',
        topic: 'Atoms and Molecules',
      },
      description: 'Test your science knowledge',
      avatar: 'tag',
    },
    // Add more practice tests as needed
  ];
  
  currentPage = 1;
  itemsPerPage = 1;


testModalButtons =[
  {
    label: 'Submit',
    type: 'primary'as NzButtonType,
    autoLoading: true,
    show: true,
    // loading: true,
    onClick: () => {
      console.log('submitted');
    }
  }
]

  isVisible = false;
  isCancelModalVisible = false;
  isSubmissionModalVisible: boolean = false;
  currentQuestions: any[] = [];
  currentIndex: number = 0;
  options =['a', 'b', 'c', 'd', 'e', 'f', 'g',]
  buttonType: NzButtonType | undefined;
  modalTitle: string = "";
  submissionSubText: string = "";
  timerSubscription: Subscription | undefined;
  hoursDisplay: number = 1;
  minutesDisplay: number = 0;
  secondsDisplay: number = 0;
  
  color: string = colorList[1];
  gap = 4;
  
  constructor() { }
  getButtonType(i: number){
    return this.isCurrentQuestion(i) ? 'dashed' : (this.isQuestionAnswered(i) ? 'primary' : 'default');
  }
  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
questions: any[] = [];
mathsQuestions = [
  { question: 'What is 7 multiplied by 8?', options: ['48', '56', '64', '72'], selectedOption: null },
  { question: 'If a triangle has angles of 90°, 45°, and x°, what is the value of x?', options: ['30°', '45°', '60°', '75°'], selectedOption: null },
  { question: 'Simplify: 4 + 6 × (9 - 3)', options: ['28', '34', '40', '46'], selectedOption: null },
  { question: 'Calculate the area of a rectangle with length 12 cm and width 8 cm.', options: ['64 cm²', '80 cm²', '96 cm²', '112 cm²'], selectedOption: null },
  { question: 'What is the next number in the sequence: 2, 5, 10, 17, ___?', options: ['26', '27', '28', '29'], selectedOption: null },
  { question: 'What is the decimal equivalent of 3/4?', options: ['0.25', '0.5', '0.75', '1.0'], selectedOption: null },
  { question: 'What is the value of 3² + 4²?', options: ['25', '49', '81', '144'], selectedOption: null },
  { question: 'If an item costs £15.75 and is reduced by 20%, what is the new price?', options: ['£12.60', '£12.80', '£13.00', '£14.00'], selectedOption: null },
  { question: 'What is the perimeter of a square with side length 10 cm?', options: ['30 cm', '35 cm', '40 cm', '45 cm'], selectedOption: null },
  { question: 'If a car travels at 60 km/h for 2.5 hours, how far does it travel?', options: ['150 km', '160 km', '170 km', '180 km'], selectedOption: null },
  // Add more maths questions as needed
];

scienceQuestions = [
  { question: 'What is the process by which plants make their own food?', options: ['Photosynthesis', 'Respiration', 'Transpiration', 'Fermentation'], selectedOption: null },
  { question: 'Which planet is known as the Red Planet?', options: ['Mars', 'Venus', 'Jupiter', 'Saturn'], selectedOption: null },
  { question: 'What is the boiling point of water in Celsius?', options: ['100°C', '0°C', '50°C', '-100°C'], selectedOption: null },
  { question: 'What is the chemical symbol for Oxygen?', options: ['O', 'H', 'N', 'C'], selectedOption: null },
  { question: 'Which organ pumps blood around the body?', options: ['Heart', 'Lungs', 'Liver', 'Kidneys'], selectedOption: null },
  { question: 'What is the smallest bone in the human body?', options: ['Stapes (in the ear)', 'Femur (in the leg)', 'Tibia (in the leg)', 'Humerus (in the arm)'], selectedOption: null },
  { question: 'What is the main function of the lungs?', options: ['To exchange gases (oxygen and carbon dioxide)', 'To pump blood', 'To digest food', 'To filter waste'], selectedOption: null },
  { question: 'Which gas do plants release during photosynthesis?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], selectedOption: null },
  { question: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'NaCl', 'O2'], selectedOption: null },
  { question: 'Which force keeps objects on the Earth’s surface?', options: ['Gravity', 'Magnetism', 'Friction', 'Tension'], selectedOption: null },
  // Add more science questions as needed
];
  showModal(subject: string): void {
    console.log(subject);
    if (subject === 'Maths') {
      this.questions = this.mathsQuestions;
      this.modalTitle = 'Practice Tests --- Maths';  
    } else if (subject === 'Science') {
      this.modalTitle = 'Practice Tests --- Science';
      this.questions = this.scienceQuestions;
    }
    this.startTimer();
    this.isVisible = true;
  }

  private startTimer() {
    let countdownSeconds = this.hoursDisplay * 3600 + this.minutesDisplay * 60 + this.secondsDisplay;
    this.timerSubscription = interval(1000).subscribe(() => {
      if (countdownSeconds > 0) {
        countdownSeconds--;
        this.hoursDisplay = Math.floor(countdownSeconds / 3600);
        this.minutesDisplay = Math.floor((countdownSeconds % 3600) / 60);
        this.secondsDisplay = countdownSeconds % 60;
      } else {
        // Countdown finished, do something (e.g., show a message)
        this.isSubmissionModalVisible = true
        this.submissionSubText = "You ran out of time"
        this.clearTimer();
      }
    });
  }

  private stopTimer(): void {
    if (this.timerSubscription && !this.timerSubscription.closed) {
      // Unsubscribe from the timer observable to stop the timer
      this.timerSubscription.unsubscribe();
    }
  }

  private clearTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
    // Reset timer display values
    this.hoursDisplay = 0;
    this.minutesDisplay = 0;
    this.secondsDisplay = 0;
  }

  onSelectOption(questionIndex: number, optionIndex: number): void {
    this.questions[questionIndex].selectedOption = this.options[optionIndex];
  }
  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getButtonColor(question: any): string {
    return question.selectedOption !== null ? 'green' : 'red';
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isCancelModalVisible = false;
    this.stopTimer();
  }
  handleTestCancel(): void {
    console.log('Button cancel clicked!');
    this.isCancelModalVisible = true;
    this.stopTimer();
  }
  goToPreviousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Method to navigate to the next question
  goToNextQuestion(): void {
    if (this.currentIndex < this.questions.length) {
      this.currentIndex++;
    }
  }

    // Method to check if the question is the current one
    isCurrentQuestion(index: number): boolean {
      return this.currentIndex === index;
    }
  
    // Method to check if the question has been answered
    isQuestionAnswered(index: number): boolean {
      return this.questions[index].selectedOption !== null;
    }
}
