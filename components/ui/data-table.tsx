type Props = {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
};

export default function DataTable({ caption, columns, rows }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[color:var(--border)]">
      <table className="w-full border-collapse text-[14px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-[color:var(--surface)]">
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="text-left font-mono text-[11px] uppercase tracking-wide text-[color:var(--text-faint)] px-4 py-3 border-b border-[color:var(--border)]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[color:var(--border)] last:border-b-0"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-[color:var(--text)] align-top"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
