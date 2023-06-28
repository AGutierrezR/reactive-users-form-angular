import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

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
    this.form = this.fb.group({
      orders: this.fb.array([]),
    });
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
    const mockData = [
      {
        order: 1,
        role: 'Administración General del Sistema - 1',
        authEmployee: 'John Doe',
      },
      {
        order: 2,
        role: 'Administración General del Sistema - 1',
        authEmployee: 'John Doe',
      },
      {
        order: 3,
        role: 'Administración General del Sistema - 1',
        authEmployee: 'John Doe',
      },
      {
        order: 4,
        role: 'Administración General del Sistema - 1',
        authEmployee: 'John Doe',
      },
    ];

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
}
