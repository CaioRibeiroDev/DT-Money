'use client'

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/global'
import { Transaction } from './Transactions/page'
import { defaultTheme } from '../styles/themes/default'
import { TransactionsProvider } from '../contexts/TransactionsContext'

export default function Page() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsProvider>
        <Transaction />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
