import React from 'react'

const PaymentContext = React.createContext()

export const PaymentProvider = PaymentContext.Provider
export const PaymentConsumer = PaymentContext.Consumer

export default PaymentContext