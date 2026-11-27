export interface CalculableCartItem {
  price: number;
  quantity: number;
}

export interface CalculableIngredient {
  amount: number;
  unitCost: number;
}

/**
 * Computes POS cart subtotal and final total in integer Rupiah.
 */
export function calculateCartTotals(
  items: CalculableCartItem[],
  discount = 0
): { subtotal: number; discount: number; total: number } {
  const subtotal = items.reduce((sum, item) => {
    const qty = Math.max(0, Math.floor(item.quantity));
    const unitPrice = Math.max(0, Math.round(item.price));
    return sum + unitPrice * qty;
  }, 0);

  const safeDiscount = Math.max(0, Math.round(discount));
  const total = Math.max(0, subtotal - safeDiscount);
  return { subtotal, discount: safeDiscount, total };
}

/**
 * Validates payment amount and calculates change for POS checkout.
 */
export function calculatePaymentChange(
  total: number,
  paymentMethod: 'tunai' | 'qris' | 'transfer',
  amountPaid: number
): { valid: boolean; amountPaid: number; change: number; error?: string } {
  const safeTotal = Math.max(0, Math.round(total));
  const safePaid = Math.round(amountPaid);

  if (paymentMethod === 'tunai') {
    if (safePaid < safeTotal) {
      return {
        valid: false,
        amountPaid: safePaid,
        change: 0,
        error: 'Nominal uang tunai kurang dari total pembayaran',
      };
    }
    return {
      valid: true,
      amountPaid: safePaid,
      change: safePaid - safeTotal,
    };
  }

  return {
    valid: true,
    amountPaid: safeTotal,
    change: 0,
  };
}

/**
 * Computes expected cash drawer balance at shift close:
 * Expected Cash = Opening Cash + Cash Sales - Cash Expenses - Cash Refunds
 */
export function calculateExpectedShiftCash(
  openingCash: number,
  cashSales: number,
  cashExpenses: number,
  cashRefunds = 0
): number {
  return (
    Math.round(openingCash) +
    Math.round(cashSales) -
    Math.round(cashExpenses) -
    Math.round(cashRefunds)
  );
}

/**
 * Computes cash variance (actual - expected). Positive = surplus, negative = shortage.
 */
export function calculateShiftDifference(actualCash: number, expectedCash: number): number {
  return Math.round(actualCash) - Math.round(expectedCash);
}

/**
 * Computes recipe batch material cost and estimated HPP per portion.
 */
export function calculateRecipeBatchCost(
  ingredients: CalculableIngredient[],
  yieldPortions: number,
  targetPortions?: number
): { totalBatchCost: number; hppPerPortion: number; scaledTotalCost: number } {
  const safeYield = yieldPortions > 0 ? yieldPortions : 1;
  const rawBatchCost = ingredients.reduce(
    (sum, ing) => sum + Math.max(0, ing.amount) * Math.max(0, ing.unitCost),
    0
  );
  const totalBatchCost = Math.round(rawBatchCost);
  const hppPerPortion = Math.round(rawBatchCost / safeYield);
  const scale = targetPortions !== undefined ? Math.max(0, targetPortions) / safeYield : 1;
  const scaledTotalCost = Math.round(rawBatchCost * scale);

  return { totalBatchCost, hppPerPortion, scaledTotalCost };
}

/**
 * Formats sequential invoice/batch numbers without truncating when sequence exceeds minDigits.
 */
export function formatSequentialCode(
  prefix: 'INV' | 'BATCH',
  dateYYYYMMDD: string,
  sequenceNumber: number,
  minDigits: number
): string {
  const seqStr = String(sequenceNumber).padStart(minDigits, '0');
  return `${prefix}-${dateYYYYMMDD}-${seqStr}`;
}
