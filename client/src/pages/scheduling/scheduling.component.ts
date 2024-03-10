import { Component } from '@angular/core';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent {
  scheduleData = [
    { tutor: 'John Doe', time: '9:00 AM - 10:30 AM', state: 'Upcoming' },
    { tutor: 'Jane Smith', time: '11:00 AM - 12:30 PM', state: 'Ongoing' },
    { tutor: 'Michael Johnson', time: '2:00 PM - 3:30 PM', state: 'Past' },
    { tutor: 'Emily Brown', time: '4:00 PM - 5:30 PM', state: 'Rescheduled' },
    { tutor: 'John Doe', time: '9:00 AM - 10:30 AM', state: 'Upcoming' },
    { tutor: 'Jane Smith', time: '11:00 AM - 12:30 PM', state: 'Ongoing' },
    { tutor: 'Michael Johnson', time: '2:00 PM - 3:30 PM', state: 'Past' },
    { tutor: 'Emily Brown', time: '4:00 PM - 5:30 PM', state: 'Rescheduled' },
    { tutor: 'John Doe', time: '9:00 AM - 10:30 AM', state: 'Upcoming' },
    { tutor: 'Jane Smith', time: '11:00 AM - 12:30 PM', state: 'Ongoing' },
    { tutor: 'Michael Johnson', time: '2:00 PM - 3:30 PM', state: 'Past' },
    { tutor: 'Emily Brown', time: '4:00 PM - 5:30 PM', state: 'Rescheduled' },
    { tutor: 'John Doe', time: '9:00 AM - 10:30 AM', state: 'Upcoming' },
    { tutor: 'Jane Smith', time: '11:00 AM - 12:30 PM', state: 'Ongoing' },
    { tutor: 'Michael Johnson', time: '2:00 PM - 3:30 PM', state: 'Past' },
    { tutor: 'Emily Brown', time: '4:00 PM - 5:30 PM', state: 'Rescheduled' }
    // Add more scheduling data as needed
  ];

  reschedule(item: any) {
    // Implement rescheduling logic here
    console.log('Rescheduling:', item);
  }

  attend(item: any) {
    // Implement attendance logic here
    console.log('Attending:', item);
  }

  canAttend(item: any){
    return item.state === 'Ongoing';
  }
  canReschedule(item: any){
    return item.state !== 'Past';
  }
}
