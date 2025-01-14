import type {
  Chain,
  Formatter,
  Formatters,
  RpcTransactionRequest,
  TransactionRequest,
} from '../../types'
import { defineFormatter, ExtractFormatter, Formatted } from './format'
import { numberToHex } from '../encoding'

export type TransactionRequestFormatter<TChain extends Chain = Chain> =
  ExtractFormatter<
    TChain,
    'transactionRequest',
    NonNullable<Formatters['transactionRequest']>
  >

export type FormattedTransactionRequest<
  TFormatter extends Formatter | undefined = Formatter,
> = Formatted<TFormatter, RpcTransactionRequest>

export function formatTransactionRequest(
  transactionRequest: Partial<TransactionRequest>,
) {
  return {
    ...transactionRequest,
    gas:
      typeof transactionRequest.gas !== 'undefined'
        ? numberToHex(transactionRequest.gas)
        : undefined,
    gasPrice:
      typeof transactionRequest.gasPrice !== 'undefined'
        ? numberToHex(transactionRequest.gasPrice)
        : undefined,
    maxFeePerGas:
      typeof transactionRequest.maxFeePerGas !== 'undefined'
        ? numberToHex(transactionRequest.maxFeePerGas)
        : undefined,
    maxPriorityFeePerGas:
      typeof transactionRequest.maxPriorityFeePerGas !== 'undefined'
        ? numberToHex(transactionRequest.maxPriorityFeePerGas)
        : undefined,
    nonce:
      typeof transactionRequest.nonce !== 'undefined'
        ? numberToHex(transactionRequest.nonce)
        : undefined,
    value:
      typeof transactionRequest.value !== 'undefined'
        ? numberToHex(transactionRequest.value)
        : undefined,
  } as RpcTransactionRequest
}

export const defineTransactionRequest = defineFormatter({
  format: formatTransactionRequest,
})
