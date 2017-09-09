import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;

  formErrors = {
    'message':''
  }
  validationMessages = {
    'message': {
      'required':      'Message is required.',
      'minlength':     'Message must be at least 2 characters long.',
      'maxlength':     'Message cannot be more than 25 characters long.'
    }
  }

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }
  createForm(): void {
    this.feedbackForm = this.fb.group({
      message: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
    });
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?:any) {
    if (!this.feedbackForm) { return; }
    const form=this.feedbackForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key]+' ';
        }
      }
    }
  }
  onSubmit() {
    console.log(this.feedbackForm)
    this.feedbackForm.reset({
      message: ''
    });
  }
}
