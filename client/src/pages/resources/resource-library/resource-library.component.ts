import { Component } from '@angular/core';
import { ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-resource-library',
  templateUrl: './resource-library.component.html',
  styleUrls: ['./resource-library.component.css']
})
export class ResourceLibraryComponent {
  @ViewChild('headerTemplate')
  headerTemplate!: TemplateRef<any>;
  expandIconPosition: 'left' | 'right' = 'left';
 data = [
  {
    subject: "Mathematics",
    topic: "Advanced Algebraic Equations and Inequalities with Quadratic Functions",
    note: `In this topic, students will delve into advanced algebraic equations and inequalities, focusing particularly on quadratic functions. They will learn various methods to solve quadratic equations and inequalities, including factoring, completing the square, and using the quadratic formula. Additionally, students will explore the graphical representations of quadratic functions, analyzing their properties such as vertex, axis of symmetry, and intercepts. The topic will also cover applications of quadratic functions in real-life scenarios, such as projectile motion and optimization problems.`,
  },
  {
    subject: "Physics",
    topic: "Electromagnetism and Maxwell's Equations",
    note: `This topic covers the fundamentals of electromagnetism, including Maxwell's equations, which describe the behavior of electric and magnetic fields. Students will learn about the four fundamental laws of electromagnetism: Gauss's law for electricity, Gauss's law for magnetism, Faraday's law of electromagnetic induction, and Ampère's law with Maxwell's addition. They will explore the relationship between electric and magnetic fields, as well as the propagation of electromagnetic waves. The topic will also delve into applications of electromagnetism in various fields, such as electronics, telecommunications, and particle physics.`,
  },
  {
    subject: "Chemistry",
    topic: "Organic Synthesis: Strategies and Techniques",
    note: `Organic synthesis is a central part of organic chemistry, involving the construction of organic compounds from simpler starting materials through chemical reactions. In this topic, students will learn about various strategies and techniques used in organic synthesis, including retrosynthetic analysis, functional group transformations, and protecting group chemistry. They will explore different synthetic routes to access complex organic molecules, with an emphasis on efficiency, selectivity, and sustainability. The topic will also cover modern methods and technologies in organic synthesis, such as catalysis, green chemistry principles, and automation.`,
  },
  {
    subject: "Biology",
    topic: "Genetics and Molecular Biology: From DNA to Protein Synthesis",
    note: `Genetics and molecular biology are fundamental fields in biology, focusing on the study of genes, heredity, and the molecular mechanisms underlying biological processes. In this topic, students will explore the structure and function of DNA, RNA, and proteins, as well as the processes of DNA replication, transcription, and translation. They will learn about the central dogma of molecular biology, which describes the flow of genetic information from DNA to RNA to protein. The topic will also cover key concepts in genetics, including inheritance patterns, gene expression regulation, and genetic engineering techniques such as recombinant DNA technology and CRISPR-Cas9.`,
  },
  {
    subject: "Computer Science",
    topic: "Machine Learning and Artificial Intelligence: Algorithms and Applications",
    note: `Machine learning and artificial intelligence (AI) have become increasingly important fields in computer science, with applications ranging from autonomous vehicles to natural language processing. In this topic, students will explore various machine learning algorithms and techniques, including supervised learning, unsupervised learning, and reinforcement learning. They will learn how to design and implement machine learning models to solve real-world problems, such as classification, regression, clustering, and reinforcement learning tasks. The topic will also cover ethical considerations and societal impacts of AI technologies, as well as current trends and future directions in the field.`,
  },
  {
    subject: "History",
    topic: "World War II: Causes, Events, and Consequences",
    note: `World War II was one of the most significant events in human history, shaping the course of the 20th century and beyond. In this topic, students will study the causes, events, and consequences of World War II, including the rise of totalitarian regimes, the outbreak of war, major battles and campaigns, and the Holocaust. They will explore the political, economic, social, and cultural factors that contributed to the war, as well as the impact of the conflict on countries and societies around the world. The topic will also examine post-war developments, such as the establishment of international organizations like the United Nations and the beginning of the Cold War.`,
  },
  {
    subject: "Literature",
    topic: "Shakespearean Tragedies: Themes, Characters, and Dramatic Techniques",
    note: `William Shakespeare is widely regarded as one of the greatest playwrights in the English language, known for his profound insights into human nature and the human condition. In this topic, students will explore Shakespearean tragedies, including plays such as Hamlet, Macbeth, Othello, and King Lear. They will analyze the themes, characters, and dramatic techniques employed by Shakespeare, as well as the historical and cultural contexts in which the plays were written and performed. The topic will also examine the enduring relevance and impact of Shakespeare's tragedies on literature, theater, and society.`,
  },
  {
    subject: "Geography",
    topic: "Climate Change and Global Environmental Challenges",
    note: `Climate change is one of the most pressing global challenges of our time, with far-reaching impacts on ecosystems, societies, and economies. In this topic, students will study the science of climate change, including the causes, effects, and potential solutions to the problem. They will learn about the role of greenhouse gases, deforestation, and other human activities in driving climate change, as well as the impacts on weather patterns, sea levels, and biodiversity. The topic will also explore strategies for mitigating and adapting to climate change at local, national, and international levels, as well as the importance of global cooperation and policy action.`,
  },
  {
    subject: "Art",
    topic: "Renaissance Art: Masterpieces and Cultural Context",
    note: `The Renaissance was a period of cultural and artistic flourishing in Europe, characterized by a renewed interest in classical learning, humanism, and artistic innovation. In this topic, students will explore Renaissance art, including works by renowned artists such as Leonardo da Vinci, Michelangelo, and Raphael. They will analyze the techniques, styles, and themes of Renaissance art, as well as the cultural and historical contexts in which the artworks were created. The topic will also examine the impact of Renaissance art on the development of Western art and culture, as well as its enduring legacy and influence.`,
  },
  {
    subject: "Music",
    topic: "Classical Music: Composers, Forms, and Performances",
    note: `Classical music is a rich and diverse genre that encompasses a wide range of styles, composers, and forms. In this topic, students will explore the history and development of classical music, from the Baroque period to the Romantic era and beyond. They will study the works of prominent composers such as Bach, Mozart, Beethoven, and Tchaikovsky, as well as the characteristics and structures of different musical forms such as symphonies, concertos, sonatas, and operas. The topic will also cover key concepts in music theory and analysis, as well as the performance and interpretation of classical music.`,
  },
].map((dataItem) => 
({...dataItem,
  disabled: false,
  active: false,
  })
);

  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      disabled: false
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 3'
    }
  ];
  trackByFn(index: number, item: any): any {
    return index; // Or return a unique identifier property of the item
  }
}
