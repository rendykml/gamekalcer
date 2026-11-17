import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import './data.css';

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  /** Kolom angka: rata kanan, font data, lebar angka sama. */
  numeric?: boolean;
}

interface DataTableProps<T> {
  caption: string;
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
}

/** Tabel data. Di layar sempit tabel digulir mendatar, tidak dipecah jadi kartu. */
export function DataTable<T>({ caption, columns, rows, getRowKey }: DataTableProps<T>) {
  return (
    <div className="table-wrap" role="region" aria-label={caption} tabIndex={0}>
      <table className="table">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={cx(c.numeric && 'is-num')}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((c) => (
                <td key={c.key} className={cx(c.numeric && 'is-num num')}>
                  {c.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
