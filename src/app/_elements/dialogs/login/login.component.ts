import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthorityService } from 'src/app/_services/authority.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tokenControl = new FormControl('', Validators.required);

  constructor(
    private authorityService: AuthorityService,
    private matDialogRef: MatDialogRef<LoginComponent>,
  ) { }

  ngOnInit(): void { }

  submit = () => {
    this.tokenControl.markAllAsTouched();
    if (this.tokenControl.valid) {
      const token = this.tokenControl.value;
      this.authorityService.login(token).then(() => {
        this.matDialogRef.close(true);
      }).catch(() => {
        this.tokenControl.setErrors({accessFail: true});
      });
    }
  }
}
