import { Customer } from './../interfaces/customer';
import { db } from '../util.ts/db';
import { stripe } from './client';
import * as functions from 'firebase-functions';
import Stripe from 'stripe';

export const donation = functions.region('asia-northeast1').https.onCall(
  async (
    data: {
      donationAmount: number;
    },
    context
  ) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        '認証が必要です'
      );
    }

    const customer: Customer = (
      await db.doc(`customers/${context.auth.uid}`).get()
    ).data() as Customer;

    try {
      await stripe.invoiceItems.create({
        customer: customer.customerId,
        description: '寄付',
        currency: 'jpy',
        amount: data.donationAmount,
        tax_rates: [functions.config().stripe.tax],
      });

      const params: Stripe.InvoiceCreateParams = {
        customer: customer.customerId,
      };

      const invoice = await stripe.invoices.create(params);

      return stripe.invoices.pay(invoice.id);
    } catch (error) {
      throw new functions.https.HttpsError('unauthenticated', error.code);
    }
  }
);
