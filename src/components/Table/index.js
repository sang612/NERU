import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { css, cx } from '@emotion/css';
import { useEffect, useState } from 'react';

const Table = ({ columns, data }) => {
  const [indexSort, setIndexSort] = useState();
  const [isAscending, setIsAscending] = useState();
  const [tableDate, setTableDate] = useState([]);

  useEffect(() => {
    if (indexSort) {
      const newData = data.sort((a, b) => {
        if (isAscending) {
          return columns[indexSort - 1].sorter(a[columns[indexSort - 1].index], b[columns[indexSort - 1].index]);
        } else {
          return columns[indexSort - 1].sorter(b[columns[indexSort - 1].index], a[columns[indexSort - 1].index]);
        }
      });
      setTableDate([...newData]);
    } else {
      setTableDate(data);
    }
  }, [indexSort, data, columns, isAscending]);
  return (
    <table
      className={cx(
        'w-full border-collapse text-sm',
        css`
          td,
          th {
            border: 1px solid #dddddd;
            padding: 8px;
          }
          tr:nth-child(even) {
            background-color: #eeeeee;
          }
          td {
            word-wrap: break-word;
          }
        `
      )}
    >
      <thead className="w-full">
        <tr className="w-full">
          {columns.map((d, index) => (
            <th className={`${d.className} bg-[#eeeeee]`} key={index}>
              <div className={`flex items-center ${!d.sorter ? 'justify-center' : 'justify-between'}`}>
                {d.title}
                {d.sorter && (
                  <div className="h-full flex flex-col">
                    <CaretUpOutlined
                      className={`w-4 cursor-pointer ${!isAscending && indexSort === index + 1 && 'text-primary'}`}
                      onClick={() => {
                        if (!isAscending && indexSort === index + 1) {
                          setIndexSort();
                        } else {
                          setIndexSort(index + 1);
                          setIsAscending(false);
                        }
                      }}
                    />
                    <CaretDownOutlined
                      className={`w-4 cursor-pointer ${isAscending && indexSort === index + 1 && 'text-primary'}`}
                      onClick={() => {
                        if (isAscending && indexSort === index + 1) {
                          setIndexSort();
                        } else {
                          setIndexSort(index + 1);
                          setIsAscending(true);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="w-full">
        {tableDate?.map((d, index) => (
          <tr className="w-full" key={index}>
            {columns.map((_d, _index) => (
              <td className={_d.className} key={_index}>
                {_d.render ? _d.render(d[_d.index], d) : d[_d.index]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
