import classNames from 'classnames'
import { TableProps, TableRow } from 'types/Table'

const Table = ({ tableData }: TableProps) => {
  console.log(tableData)

  return (
    <div className='mt-10'>
      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    {tableData.headers.map((header: string) => (
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                      >
                        {header}
                      </th>
                    ))}

                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y'>
                  {tableData?.rowData?.map((row: TableRow, rowIdx: number) => (
                    <tr
                      key={rowIdx}
                      onClick={() => (row?.rowAction ? row.rowAction() : null)}
                      className={'cursor-pointer bg-white transition duration-300 ease-in-out hover:bg-gray-50'}
                    >
                      {tableData.headers.map((rowItem: string, rowItemIdx: number) => (
                        <td
                          key={rowItemIdx}
                          className={classNames('whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900')}
                        >
                          {(row as any)[rowItem]}
                        </td>
                      ))}

                      <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                        <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
