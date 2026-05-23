export type CustomerTypeProps = {
    id: string;
    title: string;
    email: string;
    phone: string;
    totalRepairs: number;
    lastRepair: string;
    status: string;
    avatar: string
}

export type TableHeading = {
    title: string;
    href: string;
    buttonTitle: string
}

export type Column<T> = {
    key: keyof T;
    label: string;
    searchable?: boolean;
}

export type TableData<T> = {
    value: keyof [T]
}

export type Filter<T> = {
    key: keyof T
    value: string;
    label: string
}

export type DynamicTableProps<T> = {
    data: T[]
    columns: Column<T>[]
    filters?: Filter<T>[]
    heading: TableHeading
}