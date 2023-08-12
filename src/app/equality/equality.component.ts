import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, AbstractControl } from '@angular/forms';
import { EqualityValidators } from '../equality-validators';
import { delay, filter, scan } from 'rxjs';

@Component({
  selector: 'app-equality',
  templateUrl: './equality.component.html',
  styleUrls: ['./equality.component.css']
})

export class EqualityComponent implements OnInit {
  seconds = 0;

  mathForm = new FormGroup(
  {
    firstNumber: new FormControl(this.generateNumber()),
    secondNumber: new FormControl(this.generateNumber()),
    answer: new FormControl('')
  },
  [EqualityValidators.addition('answer','firstNumber','secondNumber')]
 
  )
  get FirstNumber(){
    return this.mathForm.value.firstNumber;
  }
  get SecondNumber(){
    return this.mathForm.value.secondNumber;
  }

  ngOnInit() {
    const startTime = new Date();
    let numberSolved = 0;
    
    this.mathForm.statusChanges.pipe(
      filter(value => value === 'VALID'),
      delay(800),
      
    )
    .subscribe((value) => {
      numberSolved ++;
      this.seconds = (new Date().getTime()-startTime.getTime())/numberSolved/1000;
      this.mathForm.setValue({
        firstNumber: this.generateNumber(),
        secondNumber: this.generateNumber(),
        answer: ''
      })
   })
  }

  generateNumber() {
    return Math.floor(Math.random()*10);
  }

}
