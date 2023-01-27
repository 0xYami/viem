import type { ByteArray, Hex } from '../../types'

type TrimOptions = {
  dir?: 'left' | 'right'
}
type TrimResult<TValue extends ByteArray | Hex> = TValue extends Hex
  ? Hex
  : ByteArray

export function trim<TValue extends ByteArray | Hex>(
  hexOrBytes: TValue,
  { dir = 'left' }: TrimOptions = {},
): TrimResult<TValue> {
  let data: any =
    typeof hexOrBytes === 'string' ? hexOrBytes.replace('0x', '') : hexOrBytes

  let sliceLength = 0
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === 'left' ? i : data.length - i - 1].toString() === '0')
      sliceLength++
    else break
  }
  data =
    dir === 'left'
      ? data.slice(sliceLength)
      : data.slice(0, data.length - sliceLength)

  if (typeof hexOrBytes === 'string') {
    if (data.length === 1 && dir === 'right') data = `${data}0`
    return `0x${data}` as TrimResult<TValue>
  }
  return data as TrimResult<TValue>
}