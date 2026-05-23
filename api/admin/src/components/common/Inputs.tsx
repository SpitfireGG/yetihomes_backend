import { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { Input } from '../ui/input'
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface Props {
    label: string;
    placeholder?: string
}

interface NumberInputProps {
    label: string;
    placeholder?: string;
    name: string;
    value?: number
    onChange?: (value: number, name: string) => void
}

interface TextInutProps {
    label?: string;
    name?: string
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    isRequired?: boolean
}

interface TextAreaProps {
    label: string;
    row?: number,
    placeholder?: string;
    name: string
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextInput = ({ label, placeholder, type, name, value, onChange, isRequired = false }: TextInutProps) => {
    return (
        <div className="space-y-3">
            <Label className=' capitalize' htmlFor={name}>{label}</Label>
            <Input id={name} name={name} required={isRequired} placeholder={placeholder} type={type} value={value ?? ''} onChange={onChange} accept='image/*' />
        </div>
    )
}

const TextAreaInput = ({ label, placeholder, value, onChange, name, row }: TextAreaProps) => {
    return (
        <div className="space-y-3">
            <Label className=' capitalize' htmlFor={name} >{label}</Label>
            <Textarea id={name} name={name} placeholder={placeholder} value={value} onChange={onChange} rows={row} />
        </div>
    )
}


const NumberInput = ({ label, name, value, onChange }: NumberInputProps) => {
    return (
        <div className="space-y-3">
            <Label className=' capitalize' htmlFor={name}>{label}</Label>
            <Input id={name} name={name} value={value || 0} onChange={(e) => onChange?.(Number(e.target.value), name)} inputMode='numeric' type='number' className='overflow-hidden w-20' />
        </div>
    )
}

export { TextInput, NumberInput, TextAreaInput }
