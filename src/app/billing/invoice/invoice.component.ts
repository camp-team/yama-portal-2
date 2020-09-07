import { Component, OnInit } from '@angular/core';
import { ChargeWithInvoice } from '@interfaces/charge';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  charges: ChargeWithInvoice[];
  startingAfter: string;
  endingBefore: string;
  page = 0;
  hasNext: boolean;
  loading: boolean;

  constructor(private customerService: PaymentService) {
    this.getCharges();
  }

  ngOnInit(): void {}

  getCharges(params?: { startingAfter?: string; endingBefore?: string }) {
    this.loading = true;
    this.customerService.getInvoices(params).then((result) => {
      this.hasNext = !!params?.endingBefore || result?.has_more;
      this.charges = result?.data;
      this.loading = false;
    });
  }

  nextPage() {
    this.page++;
    this.getCharges({
      startingAfter: this.charges[this.charges.length - 1].id,
    });
  }

  prevPage() {
    this.page--;
    this.getCharges({
      endingBefore: this.charges[0].id,
    });
  }
}
