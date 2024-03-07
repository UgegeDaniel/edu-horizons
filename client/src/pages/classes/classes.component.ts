import { Component } from '@angular/core';
interface DataItem {
  // Level: "Junior-Secondary" | "Senior-Secondary" | "Miscelleneous" | "Pre-Secondary" | "Primary";
  Class: string;
  Subject: string;
  Tutor: string;
  id: number;
}
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent {
  listOfColumn = [
    {
      title: 'Class-id',
      compare: (a: DataItem, b: DataItem) =>  a.id - b.id,
      priority: 3,
      width: "10%",
    },
    {
      title: 'Class',
      compare: (a: DataItem, b: DataItem) =>  a.Class.localeCompare(b.Class),
      priority: 3,
      width: "45%",
    },
    {
      title: 'Subject',
      compare: (a: DataItem, b: DataItem) =>  a.Subject.localeCompare(b.Subject),
      priority: 2,
      width: '15%'
    },
    {
      title: 'Tutor',
      compare: (a: DataItem, b: DataItem) =>  a.Tutor.localeCompare(b.Tutor),
      priority: 2,
      width: "15%"
    },
    // {
    //   title: 'Action',
    //   compare: (a: DataItem, b: DataItem) => a.english - b.english,
    //   priority: 1,
    // },
  ];
  listOfData: DataItem[] = [
    {
      Class: "Introduction to Algebraic Expressions and Equations and Their Practical Applications in Real-life Scenarios",
      Subject: "MATHS",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Trigonometry: Functions, Identities, and Their Role in Analyzing Geometric Patterns and Solving Complex Problems",
      Subject: "MATHS",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Chemical Reactions: Types, Balancing, Stoichiometry, and Their Importance in Understanding Chemical Processes",
      Subject: "CHEMISTRY",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Newton's Laws of Motion and Their Applications in Mechanics, Engineering, and Everyday Life Situations",
      Subject: "PHYSICS",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Introduction to Differential Calculus: Concepts, Techniques, and Applications in Calculating Rates of Change",
      Subject: "MATHS",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Cell Biology: Structure, Function, Processes, and Their Significance in Understanding Life Phenomena",
      Subject: "BIOLOGY",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "The Impact of Industrialization on Society: Historical Perspectives, Economic Effects, and Social Changes",
      Subject: "HISTORY",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Geographical Features and Climate Patterns: Study of Earth's Physical Landscape and Weather Conditions",
      Subject: "GEOGRAPHY",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Photosynthesis: Mechanisms, Processes, Significance, and Their Role in Sustaining Life on Earth",
      Subject: "BIOLOGY",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Advanced Algebraic Concepts and Problem Solving Strategies for Complex Mathematical Scenarios",
      Subject: "MATHS",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "The Universe: Origins, Structure, Future Predictions, and Theories Explaining Celestial Phenomena",
      Subject: "ASTRONOMY",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Functions and Graphs: Theory, Mathematical Representation, and Real-world Applications",
      Subject: "MATHS",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "The American Civil War: Causes, Battles, Outcomes, and Their Impact on American Society",
      Subject: "HISTORY",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Evolutionary Biology: Concepts, Evidence, Theories, and Their Role in Understanding Life's Diversity",
      Subject: "BIOLOGY",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "The Industrial Revolution: Impacts, Legacy, Economic Transformations, and Social Changes",
      Subject: "HISTORY",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Environmental Issues: Challenges, Solutions, Policy Interventions, and Sustainable Practices",
      Subject: "ENVIRONMENTAL SCIENCE",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Digestive System: Anatomy, Physiology, Disorders, and Their Role in Human Health",
      Subject: "BIOLOGY",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Quadratic Equations: Theory, Solutions, Applications, and Problem-solving Techniques",
      Subject: "MATHS",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "The French Revolution: Causes, Events, Outcomes, and Their Impact on European History",
      Subject: "HISTORY",
      Tutor: "Ugege Daniel",
    },
    {
      Class: "Ecosystems: Structure, Function, Conservation Measures, and Biodiversity Preservation",
      Subject: "ENVIRONMENTAL SCIENCE",
      Tutor: "Ugege Daniel",
    },
  ].map((item, index)=>({
    ...item,
    id: index
  }));
  
}
