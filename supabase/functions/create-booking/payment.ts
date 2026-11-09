export type PaymentMethod = 'cash' | 'card'

export const isPaymentMethod = (value: unknown): value is PaymentMethod =>
  value === 'cash' || value === 'card'

type CardEligibility = {
  priceEur: number
  /** The operator still has to quote or confirm this booking. */
  needsOperator: boolean
  /** Daily hire, COP31 and Land of Legends keep their own cash-only rules. */
  specialProduct: boolean
}

/** Only a one-way/round-trip transfer with a final server-side price can be prepaid. */
export const cardPaymentAllowed = ({ priceEur, needsOperator, specialProduct }: CardEligibility) =>
  !specialProduct && !needsOperator && Number.isFinite(priceEur) && priceEur > 0
