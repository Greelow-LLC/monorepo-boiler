interface Props {
  note?: string;
  id: string;
  checked?: boolean;
  otherClassNames?: string;
  containerStyles?: string;
  label?: string;
  onChange?: (e: any) => void;
}

const CustomCheckbox = ({
  note,
  otherClassNames = '',
  containerStyles = '',
  id,
  label = null,
  onChange = () => undefined,
  ...props
}: Props) => {
  return (
    <div className={`flex items-start ${containerStyles}`}>
      <div className="flex items-center h-5">
        <input
          {...props}
          onChange={onChange}
          type="checkbox"
          className={`focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded ${otherClassNames}`}
        />
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label htmlFor={id} className="font-medium text-gray-700">
            {label}
          </label>
        )}
        {note && <p className="text-gray-500">{note}</p>}
      </div>
    </div>
  );
};

export default CustomCheckbox;
