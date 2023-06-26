'use client'

import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'

import { SearchForm } from './components/SearchForm'
import {
  ContainerButtonFooter,
  CustomFileUpload,
  PriceHightLight,
  TransactionContainer,
  TransactionsTable,
} from './styles'
import { ChangeEvent, useEffect, useState } from 'react'
import { ButtonContainer } from '../../components/Header/styles'

export interface ITransaction {
  id: string
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: Date
}

export function Transaction() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )

  const [monthAndYear, setMonthAndYear] = useState<string>()
  const [filteredSummary, setFilteredSummary] = useState<ITransaction[]>([])

  const receiveSelectedMonth = (data: string) => {
    setMonthAndYear(data)
  }

  useEffect(() => {
    const filterTransactions = () => {
      const filteredTransactions = transactions.filter((item) => {
        const data = String(item.createdAt).split('-')
        const year = data[0]
        const month = data[1]
        return `${year}-${month}` === monthAndYear
      })

      setFilteredSummary(filteredTransactions)
    }

    filterTransactions()
  }, [transactions, monthAndYear])

  function handleDownloadTransactions() {
    const jsonData = JSON.stringify(transactions)
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(jsonData)
    const downloadLink = document.createElement('a')
    downloadLink.href = dataUri
    downloadLink.download = 'transactions.json'
    downloadLink.click()
  }

  function handleImportFile(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const contents = e.target?.result
        if (contents) {
          const importedData: ITransaction[] = JSON.parse(contents as string)

          importedData.forEach(async (transaction) => {
            await createTransaction(transaction)
          })
        }
      }

      reader.readAsText(file)
    }
  }

  return (
    <div>
      <Header />
      <Summary filteredSummaryPerMonth={filteredSummary} />
      <TransactionContainer>
        <SearchForm selectedMonth={receiveSelectedMonth} />
        <TransactionsTable>
          <tbody>
            {filteredSummary.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHightLight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHightLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>

        <ContainerButtonFooter>
          <ButtonContainer onClick={handleDownloadTransactions}>
            Download Transactions
          </ButtonContainer>

          <CustomFileUpload htmlFor="custom-file-upload">
            Escolher arquivo
          </CustomFileUpload>

          <input
            id="custom-file-upload"
            type="file"
            onChange={handleImportFile}
            hidden
          />
        </ContainerButtonFooter>
      </TransactionContainer>
    </div>
  )
}
