import { FormControl } from "@angular/forms";
import { Observable } from "rxjs-compat";

export class CustomValidators{
    static invalidprojectName(control: FormControl): {[s:string]:boolean}{
        if(control.value==='test'){
            return{'invalidprojectName': true};
        }
        return(null);
    }
    static asyncinvalidprojectName(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'testproject'){
                    resolve({'invalidprojectName': true});
                } else {
                    resolve(null);
                }
            },2000);
        })
        return promise;
    }
}