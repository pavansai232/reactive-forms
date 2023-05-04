import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom.validators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm:FormGroup;
  forbiddenUsername=['pavan','sai'];
 constructor(private formbuilder:FormBuilder){
   this.formbuilder=formbuilder
}

  ngOnInit(): void {
      this.signupForm = new FormGroup({
        'userdata': new FormGroup({
          'username': new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
        'email': new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmails)
        }),
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
      });
      this.signupForm.valueChanges.subscribe(
        (value) => console.log(value)
      );
      this.signupForm.statusChanges.subscribe(
        (status) => console.log(status)
      );
      this.signupForm.setValue({
        'userdata': {
          'username': 'max',
          'email': 'max@test.com'
                },
                'gender': 'male',
               'hobbies':[]
      });
      this.signupForm.patchValue({
        'userdata': {
          'username': 'pavan',
        }
      });
  }
  onsubmit(){
    console.log(this.signupForm);
    this.signupForm.reset('username');
  }
  onaddhobby(){
    const control = new FormControl(null, Validators.required);
   (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  forbiddenNames(control: FormControl): {[s:string]: boolean}{
  if(this.forbiddenUsername.indexOf(control.value) !== -1){
      return{'nameIsForbidden':true};
    }
    return null;
  }
  forbiddenEmails(control:FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve,reject) => {
      setTimeout(()=>{
        if (control.value === 'test@test.com'){
          resolve({'emailIsForbidden':true})
        } else{
         resolve(null);
        }
      },1500);
   });
   return promise;
}
}
//projectForm: FormGroup;
//ngOnInit(): void {
  //  this.projectForm = new FormGroup({
    //  'projectName' :  new FormGroup(null,[Validators.required, CustomValidators.invalidprojectName],CustomValidators.asyncinvalidprojectName),
      //'email' :  new FormGroup(null,[Validators.required,Validators.email]),
      //'projectstatus' :  new FormGroup('critical')
    //});
//}
//onprojectsubmit(){
  //console.log(this.projectForm.value); 
//}

//}
 