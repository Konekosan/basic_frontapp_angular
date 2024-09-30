import { Component } from '@angular/core';
import { MaterialModule } from '../../_module/Material.module';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsagerService } from '../../_service/usager/usager.service';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent {

  subscribeForm: FormGroup;
  showErrorMatchPassword: boolean = false;
  showErrorDateFormat: boolean = false;

  constructor(private usagerService: UsagerService,
              private router: Router
  ){
    this.subscribeForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      date_naissance: new FormControl('', [Validators.required, this.dateValidator]),
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
    });
  }

  passwordsMatch(): boolean {
    return this.subscribeForm.get('password')?.value === this.subscribeForm.get('confirm_password')?.value;
  }

  dateValidator(control: FormControl): { [key: string]: any } | null {
    const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY

    if (control.value && !dateFormat.test(control.value)) {
      this.showErrorDateFormat = true;
      //return { 'invalidDateFormat': true };

    }
    return null;
  }

  onSubmit() {
    if (!this.passwordsMatch()) {
      this.showErrorMatchPassword = true;
      return;
    }

    const datas = {
      parameter: {
        nom: this.subscribeForm.value.nom,
        prenom: this.subscribeForm.value.prenom,
        date_naissance: this.subscribeForm.value.date_naissance,
        username:this.subscribeForm.value.login,
        hashed_pwd:this.subscribeForm.value.password
      }
    };

    this.usagerService.subscribeUSager(datas).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      }
    )
  }

}
