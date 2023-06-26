'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { v4 as uuidv4 } from 'uuid'

export interface Transaction {
  id: string
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: Date
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  isSummarySelectedMonth: boolean
  setIsSummarySelectedMonth: (state: boolean) => void
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isSummarySelectedMonth, setIsSummarySelectedMonth] = useState(true)

  const fetchTransactions = useCallback(async (query?: string) => {
    // Verifique se existem transações armazenadas no Local Storage
    const storedTransactions = localStorage.getItem('transactions')
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    }

    // Faça a requisição para o backend caso não haja transações armazenadas
    // const response = await api.get('transactions', {
    //   params: {
    //     _sort: 'createdAt',
    //     _order: 'desc',
    //     q: query,
    //   },
    // })

    // const fetchedTransactions = response.data

    // Armazene as transações no Local Storage
    // localStorage.setItem('transactions', JSON.stringify(fetchedTransactions))

    // setTransactions(fetchedTransactions)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      // Crie uma nova transação com a data atual
      const newTransaction: Transaction = {
        id: uuidv4(),
        ...data,
        createdAt: new Date(),
      }

      // Adicione a nova transação à lista existente no Local Storage
      const storedTransactions = localStorage.getItem('transactions')
      if (storedTransactions) {
        const transactions = JSON.parse(storedTransactions)
        localStorage.setItem(
          'transactions',
          JSON.stringify([newTransaction, ...transactions]),
        )
      } else {
        localStorage.setItem('transactions', JSON.stringify([newTransaction]))
      }

      // Atualize o estado com as transações atualizadas
      setTransactions((state) => [newTransaction, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        isSummarySelectedMonth,
        setIsSummarySelectedMonth,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
