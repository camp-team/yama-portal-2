import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  donationForm = this.fb.group({
    donationAmount: [
      '',
      [Validators.required, Validators.min(100), Validators.max(100000)],
    ],
  });

  get donationAmountControl() {
    return this.donationForm.get('donationAmount') as FormControl;
  }

  constructor(
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
}
