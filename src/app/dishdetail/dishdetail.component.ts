import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visibility, expand } from '../animations/app.animation';

@Component(
  {
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss'],
    animations: [visibility(), expand()]
  }
)

export class DishdetailComponent implements OnInit {

  @ViewChild('fform', {static: false}) feedbackFormDirective;

  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'comment': {
      'required': 'Please tell us why you gave this rating.',
      'maxlength': 'Comment cannot be more than 140 characters.'
    },
    'author': {
      'required': 'Please tell us who you are.',
      'minlength': 'Author name must be at least 2 characters long.',
      'maxlength': 'Author name cannot be more than 25 characters.'
    }
  }

  scale: number[] = Array(5);
  dish: Dish;
  dishcopy: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  av: string;
  errMess: string;

  initial = 'shown';

  feedbackForm: FormGroup;
  feedback: Comment;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL
  )
  {
    this.createForm();
  }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe((x) => this.dishIds = x);
    this.route.params
      .pipe(switchMap((params: Params) => {
        this.initial = 'hidden';
        return this.dishService.getDish(params['id']);
      }))
      // if you have only one thing you can eliminate the ; and the "return"
      .subscribe((z) => {
          this.dish = z;
          this.dishcopy = z;
          this.setPrevNext(z.id);
          console.log(this.scale.length);
          console.log(z.id);
          this.initial = 'shown';
      });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    console.log(this.dishIds);
  }

  goBack():void {
    this.location.back();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      rating: [this.scale.length, Validators.required],
      comment: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(140)] ],
      avatar: [ '/images/alberto.png' ],
      date: ['']
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any){
    if (!this.feedbackForm) {return;}
    const form = this.feedbackForm;
    for (const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)) {
        //clear previous error message
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for (const key in control.errors){
            if (control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    {
      this.feedback = this.feedbackForm.value;
      let date = new Date();
      this.feedback.date = date.toISOString();
      this.dishcopy.comments.push(this.feedback);
      this.dishService.putDish(this.dishcopy)
        .subscribe(dish => {
          this.dish = dish;
          this.dishcopy = dish;
        },
        errmess => {this.dish = null; this.dishcopy = null; this.errMess = <any>errmess;}
      );
      this.feedbackFormDirective.resetForm(
        {
          rating: this.scale.length,
          author: '',
          comment: '',
          avatar: ['/images/alberto.png'] ,
          date: ''
        }
      );
    }
  }

}
