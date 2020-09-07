import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StripeCardElement, Stripe as StripeClient } from '@stripe/stripe-js';
import Stripe from 'stripe';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {
  @ViewChild('cardElement') private cardElementRef: ElementRef;
  loading = true;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(254)],
    ],
  });
  isComplete: boolean;
  cardElement: StripeCardElement;
  methods: Stripe.PaymentMethod[];
  inProgress: boolean;
  stripeClient: StripeClient;

  constructor(
    private fb: FormBuilder,
    public paymentService: PaymentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  get formNameControl() {
    return this.form.get('name') as FormControl;
  }
  get formEmailControl() {
    return this.form.get('email') as FormControl;
  }

  getCard() {
    this.paymentService.getPaymentMethods().then((methods) => {
      if (methods) {
        this.methods = methods.data;
      }
    });
  }

  async buildForm() {
    this.stripeClient = await this.paymentService.getStripeClient();
    const elements = this.stripeClient.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount(this.cardElementRef.nativeElement);
    this.cardElement.on(
      'change',
      (event) => (this.isComplete = event.complete)
    );
  }

  createCard() {
    if (this.form.valid) {
      this.inProgress = true;
      this.snackBar.open('カードを登録しています', null, {
        duration: null,
      });
      this.paymentService
        .setPaymemtMethod(
          this.stripeClient,
          this.cardElement,
          this.form.value.name,
          this.form.value.email
        )
        .then(() => {
          this.snackBar.open('カードを登録しました');
        })
        .catch((error: Error) => {
          console.error(error.message);
          switch (error.message) {
            case 'expired_card':
              this.snackBar.open('カードの有効期限が切れています');
              break;
            default:
              this.snackBar.open('登録に失敗しました');
          }
        })
        .finally(() => {
          this.loading = false;
          this.cardElement.clear();
        });
    }
  }

  setCardToForm(paymentMethod: Stripe.PaymentMethod) {
    this.form.patchValue({
      name: paymentMethod.billing_details.name,
      email: paymentMethod.billing_details.email,
    });
    this.cardElement.clear();
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
      })
      .catch(() => {
        this.snackBar.open('カードの削除に失敗しました');
      })
      .finally(() => {
        progress.dismiss();
        this.loading = false;
      });
  }
}
