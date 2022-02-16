import { FC } from 'react'

export const Container: FC = ({ children }) => (
  <div className='mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8 2xl:px-0'>{children}</div>
)

export const Header: FC<{ title: string; subtitle?: string; rightSlot: any }> = ({ title, subtitle, rightSlot }) => (
  <div className='flex items-start justify-between'>
    <div>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>{title}</h3>
      <p className='mt-1 text-sm text-gray-500'>{subtitle}</p>
    </div>
    {rightSlot}
  </div>
)
