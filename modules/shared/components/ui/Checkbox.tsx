import { useState, useEffect } from 'react';

type Props = {
    label: React.ReactNode;
    value: string;
    onChange: (values: any) => void;
    id: string;
    name?: string;
    block?: boolean;
    className?: string;
    checked?: boolean;
}

const Checkbox: React.FC<Props> = props => {

    const [checked, setChecked] = useState<boolean>(props.checked || false)

    useEffect(() => {
        props.onChange(checked);
    }, [checked]);

    useEffect(() => {
        setChecked(props.checked || false);
    }, [props.checked]);


    return (
        <div className={`relative py-1 ${props.className || ""}`}>
            <input
                type="checkbox"
                id={props.id || undefined}
                onChange={e => { setChecked(e.target.checked) }}
                className="peer absolute opacity-0"
                checked={checked}
            />
            <label
                htmlFor={props.id || undefined}
                className={`text-sm cursor-pointer ${props.block ? "flex" : "inline-flex"} items-center select-none rtl:before:ml-2 ltr:before:mr-2 before:leading-5 before:px-0.5 before:align-middle before:text-white before:inline-block before:w-4.5 before:h-4.5 before:border before:border-neutral-300 before:text-xs before:rounded-sm peer-checked:before:content-['✔'] peer-checked:before:bg-blue-600`}
            >
                {props.label}
            </label>
        </div>
    )
}

export default Checkbox;