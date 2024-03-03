import { Component } from '@angular/core';
interface DataItem {
  Level: "Junior-Secondary" | "Senior-Secondary" | "Miscelleneous" | "Pre-Secondary" | "Primary";
  Class: string;
  Subject: string;
  Tutor: string;
}
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent {
  listOfColumn = [
    {
      title: 'Level',
      compare: (a: DataItem, b: DataItem) => a.Level.localeCompare(b.Level),
      priority: false,
    },
    {
      title: 'Class',
      compare: (a: DataItem, b: DataItem) =>  a.Class.localeCompare(b.Class),
      priority: 3,
    },
    {
      title: 'Subject',
      compare: (a: DataItem, b: DataItem) =>  a.Subject.localeCompare(b.Subject),
      priority: 2,
    },
    {
      title: 'Tutor',
      compare: (a: DataItem, b: DataItem) =>  a.Tutor.localeCompare(b.Tutor),
      priority: 2,
    },
    // {
    //   title: 'Action',
    //   compare: (a: DataItem, b: DataItem) => a.english - b.english,
    //   priority: 1,
    // },
  ];
  listOfData: DataItem[] = [
    {
      Level: 'Junior-Secondary',
      Class: "Friction",
      Subject: "MATHS",
      Tutor: "70",
    },
    {
      Level: "Junior-Secondary",
      Class: "Forces",
      Subject: "MATHS",
      Tutor: "89",
    },
    {
      Level: "Junior-Secondary",
      Class: "Science - stuff",
      Subject: "90",
      Tutor: "SCIENCE",
    },
    {
      Level: "Junior-Secondary",
      Class: "Atoms, Molecules",
      Subject: "SCIENCE",
      Tutor: "89",
    },
  ];
}
