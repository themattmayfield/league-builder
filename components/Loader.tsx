import classNames from 'classnames'
import React, { FC, useRef, useState } from 'react'

type LoaderProps = {
  className?: string
}
const Loader: FC<LoaderProps> = ({ className }) => {
  return (
    <div className='grid h-screen place-items-center'>
      <div className={classNames('h-32 w-32 animate-spin rounded-full border-b-2 border-blue-400', className)} />
    </div>
  )
}

export default Loader

// interface Person {
//   firstName: string
//   lastName: string
// }

// interface Props {
//   text?: string
//   ok?: boolean
//   i?: number
//   fn?: (bob: string) => string
//   person?: Person
//   handleChange: React.ChangeEventHandler<HTMLInputElement>
// }

// interface TextNode {
//   text: string
// }

// export const Test: FC<Props> = ({ handleChange }) => {
//   const [count, setCount] = useState<TextNode>({ text: 'hello' })
//   const inputRef = useRef<HTMLInputElement>(null)

//   return (
//     <div>
//       <input ref={inputRef} onChange={handleChange} />
//     </div>
//   )
// }
