import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { formatCapitalizeFirstWord } from 'utils/formatters';
import { separateCamelCaseString } from 'utils/formatters';

import Button from './Button';

interface Props {
  data: any[] | undefined;
  hasButtons?: boolean;
  setActive?: (active: any) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Table = ({
  data = [],
  hasButtons = false,
  setActive = () => undefined,
  onDelete = () => undefined,
  onEdit = () => undefined,
}: Props) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {data.length &&
                    Object.keys(data[0]).map((key, index) => {
                      return (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {separateCamelCaseString(
                            key.includes('_') ? key.replace('_', ' ') : key,
                          )}
                        </th>
                      );
                    })}
                  {hasButtons && (
                    <>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Edit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delete
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((obj, index) => (
                  <tr key={index}>
                    {Object.keys(obj).map((key: any) => (
                      <td
                        key={key}
                        className="py-4 px-10 text-center truncate max-w-[22ch]">
                        {formatCapitalizeFirstWord(obj[key]) ?? 'N/A'}
                      </td>
                    ))}
                    {hasButtons && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <Button
                            color="blue"
                            shape="circle"
                            size="l"
                            icon={<EditOutlined />}
                            onClick={() => {
                              onEdit();
                              setActive(obj.id);
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <Button
                            shape="circle"
                            color="red"
                            size="l"
                            icon={<DeleteOutlined />}
                            onClick={() => {
                              onDelete();
                              setActive(obj.id);
                            }}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
