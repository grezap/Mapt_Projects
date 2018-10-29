import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "answer-edit",
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.less']
})

export class AnswerEditComponent {
  title: string;
  answer: Answer;
  form: FormGroup;

  // this will be TRUE when editing an existing answer, 
  // FALSE when creating a new one.
  editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject('BASE_URL') private baseUrl: string) {

    // create an empty object from the Answer interface
    this.answer = <Answer>{};

    this.createForm();

    var id = +this.activatedRoute.snapshot.params["id"];

    // check if we're in edit mode or not
    this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");

    if (this.editMode) {

      // fetch the quiz from the server
      var url = this.baseUrl + "api/answer/" + id;
      this.http.get<Answer>(url).subscribe(res => {
        this.answer = res;
        this.title = "Edit - " + this.answer.Text;

        this.updateForm();

      }, error => console.error(error));
    }
    else {
      this.answer.QuestionId = id;
      this.title = "Create a new Answer";
    }
  }

  onSubmit() {

    var tempAnswer = <Answer>{};
    tempAnswer.Text = this.answer.Text;
    tempAnswer.Value = this.answer.Value;
    tempAnswer.QuestionId = this.answer.QuestionId;

    var url = this.baseUrl + "api/answer";

    if (this.editMode) {
      this.http
        .post<Answer>(url, tempAnswer)
        .subscribe(res => {
          var v = res;
          console.log("Answer " + v.Id + " has been updated.");
          this.router.navigate(["question/edit", v.QuestionId]);
        }, error => console.log(error));
    }
    else {
      this.http
        .put<Answer>(url, tempAnswer)
        .subscribe(res => {
          var v = res;
          console.log("Answer " + v.Id + " has been created.");
          this.router.navigate(["question/edit", v.QuestionId]);
        }, error => console.log(error));
    }
  }

  onBack() {
    this.router.navigate(["question/edit", this.answer.QuestionId]);
  }

  createForm() {
    this.form = this.fb.group({
      Text: ['', Validators.required],
      Value: ['',
        [Validators.required,
          Validators.min(-5),
          Validators.max(5)]
      ]
    });
  }

  updateForm() {
    this.form.setValue({
      Text: this.answer.Text,
      Value: this.answer.Value
    });
  }

  // retrieve a FormControl
  getFormControl(name: string) {
    return this.form.get(name);
  }

  // returns TRUE if the FormControl is valid
  isValid(name: string) {
    var e = this.getFormControl(name);
    return e && e.valid;
  }

  // returns TRUE if the FormControl has been changed
  isChanged(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }

  // returns TRUE if the FormControl is invalid after user changes
  hasError(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }

}
