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
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit, OnDestroy {
  public paymentMethod: Stripe.PaymentMethod;
  public paymentMethods: Stripe.PaymentMethod[];

  private subscriptions: Subscription = new Subscription();
  loading = true;

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
    public paymentService: PaymentService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getCards();
  }

  openCreditCardDialog() {
    const dialogRef = this.dialog.open(CreditCardComponent);
    this.subscriptions = dialogRef.afterClosed().subscribe(() => {
      this.getCards();
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

  getCards() {
    this.paymentService.getPaymentMethods().then((methods) => {
      if (methods) {
        this.paymentMethods = methods.data;
        this.loading = false;
      }
    });
  }

  deleteStripePaymentMethod(id: string) {
    const progress = this.snackBar.open('カードを削除しています', null, {
      duration: null,
    });
    this.loading = true;
    this.paymentService
      .deleteStripePaymentMethod(id)
      .then(() => {
        this.snackBar.open('カードを削除しました');
        this.getCards();
      })
      .catch(() => {
        this.snackBar.open('カードの削除に失敗しました');
      })
      .finally(() => {
        progress.dismiss();
        this.loading = false;
      });
  }

  private donate() {
    this.paymentService.donate(this.donationForm.value.donationAmount);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
