import React, { useContext } from 'react'
import { TransactionContext } from '../contexts/TransactionContext'

function TransactionHook() {
  return useContext(TransactionContext)
}

export default TransactionHook