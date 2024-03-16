import { Component } from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { interval } from 'rxjs';
import { TimerService } from 'src/services/timer.service';
import { assignments } from 'src/utils/dummyData/assignments';
import {
  mathsQuestions,
  scienceQuestions,
} from 'src/utils/dummyData/dummyData';

@Component({
  selector: 'app-assigned-assignments',
  templateUrl: './assigned-assignments.component.html',
  styleUrls: ['./assigned-assignments.component.css'],
})
export class AssignedAssignmentsComponent {
  quizModalButtons = [
    {
      label: 'Submit',
      type: 'primary' as NzButtonType,
      autoLoading: true,
      show: true,
      onClick: () =>
        this.modal.confirm({
          nzTitle: 'Are you sure you want submit this test?',
          nzContent: 'Confirm to proceed',
          nzOkText: 'Ok',
          nzCancelText: 'Cancel',
          nzClosable: false,
          nzMaskClosable: false,
          nzOnOk: () => {
            this.notification.create(
              'success',
              'Notification Title',
              'This is the content of notification.'
            );
            this.modal.closeAll();
          },
        }),
    },
  ];
  assignments = assignments;
  quizDetails: {
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
      show: true,
      hoursDisplay: 0,
      minutesDisplay: 0,
      secondsDisplay: 5,
    },
  };

  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService,
    private timerService: TimerService
  ) {
    this.timerService.clearTimer(
      this.quizDetails.timer.hoursDisplay,
      this.quizDetails.timer.minutesDisplay,
      this.quizDetails.timer.secondsDisplay
    );
  }

  startAssignment(assignment: any): void {
    if (assignment.subject === 'Maths') {
      this.quizDetails.questions = mathsQuestions;
    } else if (assignment.subject === 'Science') {
      this.quizDetails.questions = scienceQuestions;
    }
    this.timerService.startTimer(
      this.quizDetails.timer.hoursDisplay,
      this.quizDetails.timer.minutesDisplay,
      this.quizDetails.timer.secondsDisplay
    );

    // Update the tmer display every second
    let countdownSeconds =
      this.quizDetails.timer.hoursDisplay * 3600 +
      this.quizDetails.timer.minutesDisplay * 60 +
      this.quizDetails.timer.secondsDisplay;
    interval(1000).subscribe(() => {
      if (countdownSeconds > 0) {
        countdownSeconds--;
        this.quizDetails.timer.hoursDisplay = Math.floor(
          countdownSeconds / 3600
        );
        this.quizDetails.timer.minutesDisplay = Math.floor(
          (countdownSeconds % 3600) / 60
        );
        this.quizDetails.timer.secondsDisplay = countdownSeconds % 60;
      } else {
        this.timerService.clearTimer(
          this.quizDetails.timer.hoursDisplay,
          this.quizDetails.timer.minutesDisplay,
          this.quizDetails.timer.secondsDisplay
        );
      }
    });
  }
}
