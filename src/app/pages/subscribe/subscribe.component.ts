import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../_module/Material.module';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Validators  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsagerService } from '../../_service/usager/usager.service';
import { MessageBarComponent } from '../../shared/message-bar/message-bar.component';
import { MessageBarService } from '../../_service/message-bar/message-bar.service';
import { MESSAGES } from '../../shared/message';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { LoaderService } from '../../_service/loader/loader.service';


@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule, 
            CommonModule, MessageBarComponent, LoaderComponent
           ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent implements OnInit{

  subscribeForm: FormGroup;
  public showErrorMatchPassword: boolean = false;
  showErrorDateFormat: boolean = false;
  showErrorDateValue: boolean = false;
  compteur: number = 5;

  constructor(private usagerService: UsagerService,
              private router: Router,
              private messageBarService: MessageBarService,
              private loaderService: LoaderService){}

  ngOnInit(): void {
    
    this.subscribeForm = new FormGroup({
      nom: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        this.noSpecialCharactersValidator()
      ]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        this.noSpecialCharactersValidator()
      ]),
      date_naissance: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        this.dateValidator
      ]),
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
    });
  }

  noSpecialCharactersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = /[<>;'"\\\/]/.test(control.value);
      return forbidden ? { 'forbiddenCharacters': { value: control.value } } : null;
    };
  }

  passwordsMatch(): boolean {
    return this.subscribeForm.get('password')?.value === this.subscribeForm.get('confirm_password')?.value;
  }

  dateValidator(control: FormControl): { [key: string]: any } | null {
    const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY

    const currentYear = new Date().getFullYear();
    const minYear = 1900;

    if (control.value && !dateFormat.test(control.value)) {
      return { 'invalidDateFormat': true };
    }

    const [day, month, year] = control.value.split('/').map(Number);

    if ((year < minYear || year > currentYear) ||
        (month < 0 || month > 12) ||
        (day < 0 || day > 31)
       ) {
      console.log('erreur de format de date');
      return { 'dateTooOldOrFuture': true };
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
    const datas = {
      parameter: {
        nom: this.subscribeForm.value.nom,
        prenom: this.subscribeForm.value.prenom,
        date_naissance: this.subscribeForm.value.date_naissance,
        username:this.subscribeForm.value.login,
        hashed_pwd:this.subscribeForm.value.password
      }
    };
    if (this.passwordsMatch() && this.subscribeForm.valid) {
      this.loaderService.show();
      this.usagerService.subscribeUSager(datas).subscribe(
        response => {
          const interval = setInterval(() => {
            if (this.compteur > 0) {
              this.compteur--;
              this.messageBarService.showMessage(MESSAGES.SUCCESS.SUBSCRIBTION + 
                ' Vous allez être redirigé à la page de connexion dans ' + 
                this.compteur + 'sec', 'success');
                this.loaderService.hide();
            } else {
              clearInterval(interval);
              this.router.navigate(['/login']);
            }
          }, 1000);
        },
        error => {
          this.loaderService.hide();
          console.log(error);
          this.messageBarService.showMessage(MESSAGES.ERROR.ERROR_GENERIC, 'error');
        }
      );
    } else {
      this.showErrorMatchPassword = true;
    }
  }
}
