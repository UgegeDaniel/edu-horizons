import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timerSubscription: Subscription | undefined;
  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}
  startTimer(
    hoursDisplay: number,
    minutesDisplay: number,
    secondsDisplay: number
  ) {
    let countdownSeconds =
      hoursDisplay * 3600 + minutesDisplay * 60 + secondsDisplay;
    let updatedDisplay: {
      hoursDisplay: number;
      minutesDisplay: number;
      secondsDisplay: number;
    } = {
      hoursDisplay: 0,
      minutesDisplay: 0,
      secondsDisplay: 0,
    };
    this.timerSubscription = interval(1000).subscribe(() => {
      if (countdownSeconds > 0) {
        countdownSeconds--;
        hoursDisplay = Math.floor(countdownSeconds / 3600);
        minutesDisplay = Math.floor((countdownSeconds % 3600) / 60);
        secondsDisplay = countdownSeconds % 60;
        updatedDisplay = {
          hoursDisplay,
          minutesDisplay,
          secondsDisplay,
        };
      } else {
        // Countdown finished, do something (e.g., show a message)
        this.modal.confirm({
          nzTitle: 'Time up',
          nzContent:
            'You ran out of time. The quiz will automatically be submitted',
          nzOkText: 'Ok',
          nzCancelText: 'Cancel',
          nzClosable: false,
          nzMaskClosable: false,
          nzOnOk: () => {
            this.notification.create(
              'success',
              'Quiz Submitted',
              'Go to Quiz Results to see your corrections.'
            );
            this.modal.closeAll();
          },
        });
        this.clearTimer(hoursDisplay, minutesDisplay, secondsDisplay);
      }
    });
    return updatedDisplay;
  }

  updateTimerDisplay(hoursDisplay: number, minutesDisplay: number, secondsDisplay: number){
    let countdownSeconds =
    hoursDisplay * 3600 +
    minutesDisplay * 60 +
    secondsDisplay;
  interval(1000).subscribe(() => {
    if (countdownSeconds > 0) {
      countdownSeconds--;
      hoursDisplay = Math.floor(
        countdownSeconds / 3600
      );
      minutesDisplay = Math.floor(
        (countdownSeconds % 3600) / 60
      );
      secondsDisplay = countdownSeconds % 60;
    } else {
      this.clearTimer(
        hoursDisplay,
        minutesDisplay,
        secondsDisplay
      );
    }
  });
  }
  private stopTimer(): void {
    if (this.timerSubscription && !this.timerSubscription.closed) {
      // Unsubscribe from the timer observable to stop the timer
      this.timerSubscription.unsubscribe();
    }
  }

   clearTimer(
    hoursDisplay: number,
    minutesDisplay: number,
    secondsDisplay: number
  ) {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
    // Reset timer display values
    hoursDisplay = 0;
    minutesDisplay = 0;
    secondsDisplay = 0;
  }
}
