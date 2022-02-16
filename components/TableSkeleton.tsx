import randomText from 'lib/randomText'
import { TableProps } from 'types/Table'

const TableSkeleton = ({ tableData }: TableProps) => {
  console.log(tableData)

  return (
    <table className='min-w-full divide-y divide-gray-200'>
      <thead className='bg-gray-50'>
        <tr>
          {tableData.headers.map((header) => (
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
              {header}
            </th>
          ))}

          {/* <th
          scope='col'
          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
        >
          Email
        </th>
        <th
          scope='col'
          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
        >
          Role
        </th> */}
          <th scope='col' className='relative px-6 py-3'>
            <span className='sr-only'>Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className='divide-y'>
        {[...Array(tableData?.rowData?.length || 3).keys()].map((idx) => (
          <tr key={idx} className={'bg-white transition duration-300 ease-in-out hover:bg-gray-50'}>
            {[...Array(tableData.headers.length).keys()].map((row) => (
              <td className={'whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 blur'}>{randomText(12)}</td>
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
  )
}
export default TableSkeleton
