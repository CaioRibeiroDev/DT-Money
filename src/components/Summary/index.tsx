import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { useSummary } from '../../hooks/useSummary'
import { priceFormatter } from '../../utils/formatter'
import { SummaryCard, SummaryContainer } from './styles'
import {
  Transaction,
  TransactionsContext,
} from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

type SummaryProps = {
  filteredSummaryPerMonth: Transaction[]
}

export function Summary({ filteredSummaryPerMonth }: SummaryProps) {
  const summary = useSummary()

  const summaryPerMonth = filteredSummaryPerMonth.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price
        acc.total += transaction.price
      } else {
        acc.outcome += transaction.price
        acc.total -= transaction.price
      }

      return acc
    },
    { income: 0, outcome: 0, total: 0 },
  )

  const summaryIsToggle = useContextSelector(TransactionsContext, (context) => {
    return context.isSummarySelectedMonth
  })

  return (
    <SummaryContainer>
      <SummaryCard visibility="show">
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        {!summaryIsToggle ? (
          <strong>{priceFormatter.format(summaryPerMonth.income)}</strong>
        ) : (
          <strong>{priceFormatter.format(summary.income)}</strong>
        )}
      </SummaryCard>

      <SummaryCard visibility="show">
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        {!summaryIsToggle ? (
          <strong>{priceFormatter.format(summaryPerMonth.outcome)}</strong>
        ) : (
          <strong>{priceFormatter.format(summary.outcome)}</strong>
        )}
      </SummaryCard>

      <SummaryCard variant="green" visibility="show">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        {!summaryIsToggle ? (
          <strong>{priceFormatter.format(summaryPerMonth.total)}</strong>
        ) : (
          <strong>{priceFormatter.format(summary.total)}</strong>
        )}
      </SummaryCard>
    </SummaryContainer>
  )
}
