import * as Dialog from '@radix-ui/react-dialog'
import {
  ButtonContainer,
  HeaderContainer,
  HeaderContent,
  NewTransactionButton,
} from './styles'

import { NewTransactionModal } from '../NewTransactionModal'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'

export function Header() {
  const summaryIsToggle = useContextSelector(TransactionsContext, (context) => {
    return context.isSummarySelectedMonth
  })

  const summarySetToggle = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.setIsSummarySelectedMonth
    },
  )

  function handleChangeToggle() {
    summarySetToggle(!summaryIsToggle)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <ButtonContainer onClick={handleChangeToggle}>
          {summaryIsToggle
            ? 'Todas as transações'
            : 'Total de transações do mês'}
        </ButtonContainer>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            {/* asChild ele nao cria um novo botão mas sim utiliza o NewTransactionButton como o botão */}
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
