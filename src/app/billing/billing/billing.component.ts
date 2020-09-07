import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CreditCardComponent } from 'src/app/shared/dialogs/credit-card/credit-card.component';
import Stripe from 'stripe';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit, OnDestroy {
  public paymentMethod: Stripe.PaymentMethod;

  private subscriptions: Subscription = new Subscription();

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

  ngOnInit(): void {
    this.getCard();
  }

  openCreditCardDialog() {
    const dialogRef = this.dialog.open(CreditCardComponent);
    this.subscriptions = dialogRef.afterClosed().subscribe(() => {
      this.getCard();
    });
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    this.subscriptions = dialogRef
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.donate();
        }
      });
  }

  getCard() {
    console.log('test');
    this.paymentService.getPaymentMethod().then((methods) => {
      console.log(methods);
      if (methods) {
        this.paymentMethod = methods.data[0];
        console.log(this.paymentMethod);
      }
    });
  }

  private donate() {
    this.paymentService.donate(this.donationForm.value.donationAmount);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
