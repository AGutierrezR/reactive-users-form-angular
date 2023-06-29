import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { mockData } from 'src/app/shared/form/mockData';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  preloaded = false;

  rowNumber = 0;

  get orderForm() {
    return this.form.get('orders') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  addRow() {
    const orderRow = this.fb.group({
      order: new FormControl({
        value: ++this.rowNumber,
        disabled: true,
      }),
      role: ['', Validators.required],
      authEmployee: [''],
    });

    this.orderForm.push(orderRow);
  }

  deleteRow(i: number) {
    if (confirm('Seguro quieres eliminar esta fila')) {
      this.orderForm.removeAt(i);
    }
  }

  submitForm() {
    console.log(this.form.value);
  }

  prepopulateForm() {
    if (this.preloaded) {
      return;
    }

    for (const data of mockData) {
      this.orderForm.push(
        this.fb.group({
          order: new FormControl({
            value: data.order,
            disabled: true,
          }),
          role: [data.role, Validators.required],
          authEmployee: data.authEmployee,
        })
      );
      this.rowNumber++;
    }

    this.preloaded = true;
  }

  private initForm(): void {
    this.form = this.fb.group({
      orders: this.fb.array([]),
    });
  }
}
