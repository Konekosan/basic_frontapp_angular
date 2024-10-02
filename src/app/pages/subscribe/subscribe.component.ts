import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../_module/Material.module';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsagerService } from '../../_service/usager/usager.service';
import { MessageBarComponent } from '../../shared/message-bar/message-bar.component';
import { MessageBarService } from '../../_service/message-bar/message-bar.service';
import { MESSAGES } from '../../shared/message';


@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule, CommonModule, MessageBarComponent],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent implements OnInit{

  subscribeForm: FormGroup;
  public showErrorMatchPassword: boolean = false;
  showErrorDateFormat: boolean = false;
  compteur: number = 5;

  constructor(private usagerService: UsagerService,
              private router: Router,
              private messageBarService: MessageBarService
  ){}

  ngOnInit(): void {
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
    //console.log(this.showErrorMatchPassword);
    if (control.value && !dateFormat.test(control.value)) {
      //console.log(this.showErrorMatchPassword);
      // console.log('on passe la');
      // this.showErrorDateFormat = true;
      return { 'invalidDateFormat': true };

    }
    return null;
  }

  onDateInput(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length >= 3) {
      value = `${value.substring(0, 2)}/${value.substring(2)}`;
    }
    if (value.length >= 6) {
      value = `${value.substring(0, 5)}/${value.substring(5, 9)}`;
    }

    input.value = value;
  }

  onSubmit() {
    this.showErrorMatchPassword = false;
    if (!this.passwordsMatch() || !this.subscribeForm.valid) {
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
        const interval = setInterval(() => {
          if (this.compteur > 0) {
            this.compteur--;
            this.messageBarService.showMessage(MESSAGES.SUCCESS.SUBSCRIBTION + 
              ' Vous allez être redirigé à la page de connexion dans ' + 
              this.compteur + 'sec', 'success');
          } else {
            clearInterval(interval);
            this.router.navigate(['/login']);
          }
        }, 1000);
        
      },
      error => {
        console.log(error);
        this.messageBarService.showMessage(MESSAGES.ERROR.ERROR_GENERIC, 'error');
      }
    )
  }

}
