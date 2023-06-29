import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
      ],
    });
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new row when addRow is executed', () => {
    component.addRow();
    expect(component.orderForm.length).toBe(1);
  });

  it('should remove a row by indicating it indexes and confirm the deleting', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.addRow();
    component.deleteRow(0);

    expect(component.orderForm.length).toBe(0);
  });

  it('should not remove a row if confirm no button is clicked', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.addRow();
    component.deleteRow(0);

    expect(component.orderForm.length).not.toBe(0);
  });

  it('should populate FormArray with mockData', () => {
    component.prepopulateForm();

    expect(component.orderForm.length).toBe(4);
  });

  it('should run the prepopulate once', () => {
    spyOn(component.orderForm, 'push')

    component.prepopulateForm();
    component.prepopulateForm();

    expect(component.orderForm.push).toHaveBeenCalledTimes(4)
  })
});
