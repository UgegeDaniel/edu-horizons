import { Component } from '@angular/core';
interface ItemData {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}
@Component({
  selector: 'app-recommended-books',
  templateUrl: './recommended-books.component.html',
  styleUrls: ['./recommended-books.component.css']
})
export class RecommendedBooksComponent {
  data: ItemData[] = [];
  books = [
    { 
      title: 'Book 1', 
      author: 'Author 1', 
      class: 'Class 1', 
      subject: 'Subject 1', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' 
    },
    { 
      title: 'Book 2', 
      author: 'Author 2', 
      class: 'Class 2', 
      subject: 'Subject 2', 
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
    },
    // Add more books as needed
  ];


  ngOnInit(): void {
    this.loadData(1);
  }

  loadData(pi: number): void {
    this.data = new Array(5).fill({}).map((_, index) => ({
      href: 'http://ant.design',
      title: `ant design part ${index} (page: ${pi})`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources ' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    }));
  }
}
