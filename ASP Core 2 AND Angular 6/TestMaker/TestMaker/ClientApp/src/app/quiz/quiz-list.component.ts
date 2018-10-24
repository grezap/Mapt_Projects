import { Component, Inject, Input, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: "quiz-list",
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})

export class QuizListComponent implements OnInit {

  @Input() class: string;
  title: string;
  selectedQuiz: Quiz;
  quizzes: Quiz[];

  constructor(private http: HttpClient, private router: Router,
    @Inject('BASE_URL') private baseUrl: string) {

  }

  ngOnInit(): void {
    //this.title = "Latest Quizzes";
    var url = this.baseUrl + "api/quiz/";

    switch (this.class) {
      case "latest":
      default:
        this.title = "Latest Quizzes";
        url += "latest/"
        break;
      case "byTitle":
        this.title = "Quizzes By Title";
        url += "ByTitle/"
        break;
      case "random":
        this.title = "Random Quizzes";
        url += "random/"
        break;
    }

    this.http.get<Quiz[]>(url).subscribe(result => {
      this.quizzes = result;
      console.log(this.quizzes);
    }, error => console.error(error));
  }

  onSelect(quiz: Quiz) {
    this.selectedQuiz = quiz;
    console.log("quiz with Id "
      + this.selectedQuiz.Id
      + " has been selected.");
    this.router.navigate(["quiz", this.selectedQuiz.Id]);
  }
}
