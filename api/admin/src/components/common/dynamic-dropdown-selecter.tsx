import React, { ChangeEvent } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '../ui/label';

type Props = {
    placeholder: string;
    selectItemsData: { title: string }[]
    label?: string;
    onValueChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

const DynamicDropDownSelector = ({ placeholder, selectItemsData, label, }: Props) => {
    return (
        <div className='flex flex-col gap-3'>
            <Label>{label}</Label>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {label && <SelectLabel>{label || 'Select'}</SelectLabel>}
                        {selectItemsData?.map(({ title }, indx) => (
                            <SelectItem key={indx} value={title}>{title}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default DynamicDropDownSelector
