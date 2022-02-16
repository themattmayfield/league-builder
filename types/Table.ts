export interface TableDataInterface {
  headers: string[]
  rowData: Array<{ rowAction: any }>
}

export interface TableProps {
  tableData: { headers: string[]; rowData?: Array<{ rowAction: any }> }
}

export interface TableRow {
  rowAction: any
}
