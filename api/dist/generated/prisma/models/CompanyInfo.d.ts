import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CompanyInfoModel = runtime.Types.Result.DefaultSelection<Prisma.$CompanyInfoPayload>;
export type AggregateCompanyInfo = {
    _count: CompanyInfoCountAggregateOutputType | null;
    _min: CompanyInfoMinAggregateOutputType | null;
    _max: CompanyInfoMaxAggregateOutputType | null;
};
export type CompanyInfoMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    mission: string | null;
    vision: string | null;
    contactEmail: string | null;
    phone: string | null;
    address: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CompanyInfoMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    mission: string | null;
    vision: string | null;
    contactEmail: string | null;
    phone: string | null;
    address: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CompanyInfoCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    mission: number;
    vision: number;
    contactEmail: number;
    phone: number;
    address: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CompanyInfoMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    mission?: true;
    vision?: true;
    contactEmail?: true;
    phone?: true;
    address?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CompanyInfoMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    mission?: true;
    vision?: true;
    contactEmail?: true;
    phone?: true;
    address?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CompanyInfoCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    mission?: true;
    vision?: true;
    contactEmail?: true;
    phone?: true;
    address?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CompanyInfoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CompanyInfoWhereInput;
    orderBy?: Prisma.CompanyInfoOrderByWithRelationInput | Prisma.CompanyInfoOrderByWithRelationInput[];
    cursor?: Prisma.CompanyInfoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CompanyInfoCountAggregateInputType;
    _min?: CompanyInfoMinAggregateInputType;
    _max?: CompanyInfoMaxAggregateInputType;
};
export type GetCompanyInfoAggregateType<T extends CompanyInfoAggregateArgs> = {
    [P in keyof T & keyof AggregateCompanyInfo]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCompanyInfo[P]> : Prisma.GetScalarType<T[P], AggregateCompanyInfo[P]>;
};
export type CompanyInfoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CompanyInfoWhereInput;
    orderBy?: Prisma.CompanyInfoOrderByWithAggregationInput | Prisma.CompanyInfoOrderByWithAggregationInput[];
    by: Prisma.CompanyInfoScalarFieldEnum[] | Prisma.CompanyInfoScalarFieldEnum;
    having?: Prisma.CompanyInfoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CompanyInfoCountAggregateInputType | true;
    _min?: CompanyInfoMinAggregateInputType;
    _max?: CompanyInfoMaxAggregateInputType;
};
export type CompanyInfoGroupByOutputType = {
    id: string;
    name: string;
    description: string;
    mission: string | null;
    vision: string | null;
    contactEmail: string | null;
    phone: string | null;
    address: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CompanyInfoCountAggregateOutputType | null;
    _min: CompanyInfoMinAggregateOutputType | null;
    _max: CompanyInfoMaxAggregateOutputType | null;
};
export type GetCompanyInfoGroupByPayload<T extends CompanyInfoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CompanyInfoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CompanyInfoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CompanyInfoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CompanyInfoGroupByOutputType[P]>;
}>>;
export type CompanyInfoWhereInput = {
    AND?: Prisma.CompanyInfoWhereInput | Prisma.CompanyInfoWhereInput[];
    OR?: Prisma.CompanyInfoWhereInput[];
    NOT?: Prisma.CompanyInfoWhereInput | Prisma.CompanyInfoWhereInput[];
    id?: Prisma.StringFilter<"CompanyInfo"> | string;
    name?: Prisma.StringFilter<"CompanyInfo"> | string;
    description?: Prisma.StringFilter<"CompanyInfo"> | string;
    mission?: Prisma.StringNullableFilter<"CompanyInfo"> | string | null;
    vision?: Prisma.StringNullableFilter<"CompanyInfo"> | string | null;
    contactEmail?: Prisma.StringNullableFilter<"CompanyInfo"> | string | null;
    phone?: Prisma.StringNullableFilter<"CompanyInfo"> | string | null;
    address?: Prisma.StringNullableFilter<"CompanyInfo"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CompanyInfo"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CompanyInfo"> | Date | string;
};
export type CompanyInfoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    mission?: Prisma.SortOrderInput | Prisma.SortOrder;
    vision?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CompanyInfoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CompanyInfoWhereInput | Prisma.CompanyInfoWhereInput[];
    OR?: Prisma.CompanyInfoWhereInput[];
    NOT?: Prisma.CompanyInfoWhereInput | Prisma.CompanyInfoWhereInput[];
    name?: Prisma.StringFilter<"CompanyInfo"> | string;
    description?: Prisma.StringFilter<"CompanyInfo"> | string;
    mission?: Prisma.StringNullableFilter<"CompanyInfo"> | string | null;
    vision?: Prisma.StringNullableFilter<"CompanyInfo"> | string | null;
    contactEmail?: Prisma.StringNullableFilter<"CompanyInfo"> | string | null;
    phone?: Prisma.StringNullableFilter<"CompanyInfo"> | string | null;
    address?: Prisma.StringNullableFilter<"CompanyInfo"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CompanyInfo"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CompanyInfo"> | Date | string;
}, "id">;
export type CompanyInfoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    mission?: Prisma.SortOrderInput | Prisma.SortOrder;
    vision?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CompanyInfoCountOrderByAggregateInput;
    _max?: Prisma.CompanyInfoMaxOrderByAggregateInput;
    _min?: Prisma.CompanyInfoMinOrderByAggregateInput;
};
export type CompanyInfoScalarWhereWithAggregatesInput = {
    AND?: Prisma.CompanyInfoScalarWhereWithAggregatesInput | Prisma.CompanyInfoScalarWhereWithAggregatesInput[];
    OR?: Prisma.CompanyInfoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CompanyInfoScalarWhereWithAggregatesInput | Prisma.CompanyInfoScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CompanyInfo"> | string;
    name?: Prisma.StringWithAggregatesFilter<"CompanyInfo"> | string;
    description?: Prisma.StringWithAggregatesFilter<"CompanyInfo"> | string;
    mission?: Prisma.StringNullableWithAggregatesFilter<"CompanyInfo"> | string | null;
    vision?: Prisma.StringNullableWithAggregatesFilter<"CompanyInfo"> | string | null;
    contactEmail?: Prisma.StringNullableWithAggregatesFilter<"CompanyInfo"> | string | null;
    phone?: Prisma.StringNullableWithAggregatesFilter<"CompanyInfo"> | string | null;
    address?: Prisma.StringNullableWithAggregatesFilter<"CompanyInfo"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CompanyInfo"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CompanyInfo"> | Date | string;
};
export type CompanyInfoCreateInput = {
    id?: string;
    name: string;
    description: string;
    mission?: string | null;
    vision?: string | null;
    contactEmail?: string | null;
    phone?: string | null;
    address?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CompanyInfoUncheckedCreateInput = {
    id?: string;
    name: string;
    description: string;
    mission?: string | null;
    vision?: string | null;
    contactEmail?: string | null;
    phone?: string | null;
    address?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CompanyInfoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    mission?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vision?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyInfoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    mission?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vision?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyInfoCreateManyInput = {
    id?: string;
    name: string;
    description: string;
    mission?: string | null;
    vision?: string | null;
    contactEmail?: string | null;
    phone?: string | null;
    address?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CompanyInfoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    mission?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vision?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyInfoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    mission?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vision?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyInfoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    mission?: Prisma.SortOrder;
    vision?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CompanyInfoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    mission?: Prisma.SortOrder;
    vision?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CompanyInfoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    mission?: Prisma.SortOrder;
    vision?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type CompanyInfoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    mission?: boolean;
    vision?: boolean;
    contactEmail?: boolean;
    phone?: boolean;
    address?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["companyInfo"]>;
export type CompanyInfoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    mission?: boolean;
    vision?: boolean;
    contactEmail?: boolean;
    phone?: boolean;
    address?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["companyInfo"]>;
export type CompanyInfoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    mission?: boolean;
    vision?: boolean;
    contactEmail?: boolean;
    phone?: boolean;
    address?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["companyInfo"]>;
export type CompanyInfoSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    mission?: boolean;
    vision?: boolean;
    contactEmail?: boolean;
    phone?: boolean;
    address?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CompanyInfoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "mission" | "vision" | "contactEmail" | "phone" | "address" | "createdAt" | "updatedAt", ExtArgs["result"]["companyInfo"]>;
export type $CompanyInfoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CompanyInfo";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string;
        mission: string | null;
        vision: string | null;
        contactEmail: string | null;
        phone: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["companyInfo"]>;
    composites: {};
};
export type CompanyInfoGetPayload<S extends boolean | null | undefined | CompanyInfoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CompanyInfoPayload, S>;
export type CompanyInfoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CompanyInfoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CompanyInfoCountAggregateInputType | true;
};
export interface CompanyInfoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CompanyInfo'];
        meta: {
            name: 'CompanyInfo';
        };
    };
    findUnique<T extends CompanyInfoFindUniqueArgs>(args: Prisma.SelectSubset<T, CompanyInfoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CompanyInfoClient<runtime.Types.Result.GetResult<Prisma.$CompanyInfoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CompanyInfoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CompanyInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CompanyInfoClient<runtime.Types.Result.GetResult<Prisma.$CompanyInfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CompanyInfoFindFirstArgs>(args?: Prisma.SelectSubset<T, CompanyInfoFindFirstArgs<ExtArgs>>): Prisma.Prisma__CompanyInfoClient<runtime.Types.Result.GetResult<Prisma.$CompanyInfoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CompanyInfoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CompanyInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CompanyInfoClient<runtime.Types.Result.GetResult<Prisma.$CompanyInfoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CompanyInfoFindManyArgs>(args?: Prisma.SelectSubset<T, CompanyInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CompanyInfoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CompanyInfoCreateArgs>(args: Prisma.SelectSubset<T, CompanyInfoCreateArgs<ExtArgs>>): Prisma.Prisma__CompanyInfoClient<runtime.Types.Result.GetResult<Prisma.$CompanyInfoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CompanyInfoCreateManyArgs>(args?: Prisma.SelectSubset<T, CompanyInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CompanyInfoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CompanyInfoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CompanyInfoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CompanyInfoDeleteArgs>(args: Prisma.SelectSubset<T, CompanyInfoDeleteArgs<ExtArgs>>): Prisma.Prisma__CompanyInfoClient<runtime.Types.Result.GetResult<Prisma.$CompanyInfoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CompanyInfoUpdateArgs>(args: Prisma.SelectSubset<T, CompanyInfoUpdateArgs<ExtArgs>>): Prisma.Prisma__CompanyInfoClient<runtime.Types.Result.GetResult<Prisma.$CompanyInfoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CompanyInfoDeleteManyArgs>(args?: Prisma.SelectSubset<T, CompanyInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CompanyInfoUpdateManyArgs>(args: Prisma.SelectSubset<T, CompanyInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CompanyInfoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CompanyInfoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CompanyInfoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CompanyInfoUpsertArgs>(args: Prisma.SelectSubset<T, CompanyInfoUpsertArgs<ExtArgs>>): Prisma.Prisma__CompanyInfoClient<runtime.Types.Result.GetResult<Prisma.$CompanyInfoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CompanyInfoCountArgs>(args?: Prisma.Subset<T, CompanyInfoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CompanyInfoCountAggregateOutputType> : number>;
    aggregate<T extends CompanyInfoAggregateArgs>(args: Prisma.Subset<T, CompanyInfoAggregateArgs>): Prisma.PrismaPromise<GetCompanyInfoAggregateType<T>>;
    groupBy<T extends CompanyInfoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CompanyInfoGroupByArgs['orderBy'];
    } : {
        orderBy?: CompanyInfoGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CompanyInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CompanyInfoFieldRefs;
}
export interface Prisma__CompanyInfoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CompanyInfoFieldRefs {
    readonly id: Prisma.FieldRef<"CompanyInfo", 'String'>;
    readonly name: Prisma.FieldRef<"CompanyInfo", 'String'>;
    readonly description: Prisma.FieldRef<"CompanyInfo", 'String'>;
    readonly mission: Prisma.FieldRef<"CompanyInfo", 'String'>;
    readonly vision: Prisma.FieldRef<"CompanyInfo", 'String'>;
    readonly contactEmail: Prisma.FieldRef<"CompanyInfo", 'String'>;
    readonly phone: Prisma.FieldRef<"CompanyInfo", 'String'>;
    readonly address: Prisma.FieldRef<"CompanyInfo", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CompanyInfo", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CompanyInfo", 'DateTime'>;
}
export type CompanyInfoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyInfoSelect<ExtArgs> | null;
    omit?: Prisma.CompanyInfoOmit<ExtArgs> | null;
    where: Prisma.CompanyInfoWhereUniqueInput;
};
export type CompanyInfoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyInfoSelect<ExtArgs> | null;
    omit?: Prisma.CompanyInfoOmit<ExtArgs> | null;
    where: Prisma.CompanyInfoWhereUniqueInput;
};
export type CompanyInfoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyInfoSelect<ExtArgs> | null;
    omit?: Prisma.CompanyInfoOmit<ExtArgs> | null;
    where?: Prisma.CompanyInfoWhereInput;
    orderBy?: Prisma.CompanyInfoOrderByWithRelationInput | Prisma.CompanyInfoOrderByWithRelationInput[];
    cursor?: Prisma.CompanyInfoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompanyInfoScalarFieldEnum | Prisma.CompanyInfoScalarFieldEnum[];
};
export type CompanyInfoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyInfoSelect<ExtArgs> | null;
    omit?: Prisma.CompanyInfoOmit<ExtArgs> | null;
    where?: Prisma.CompanyInfoWhereInput;
    orderBy?: Prisma.CompanyInfoOrderByWithRelationInput | Prisma.CompanyInfoOrderByWithRelationInput[];
    cursor?: Prisma.CompanyInfoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompanyInfoScalarFieldEnum | Prisma.CompanyInfoScalarFieldEnum[];
};
export type CompanyInfoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyInfoSelect<ExtArgs> | null;
    omit?: Prisma.CompanyInfoOmit<ExtArgs> | null;
    where?: Prisma.CompanyInfoWhereInput;
    orderBy?: Prisma.CompanyInfoOrderByWithRelationInput | Prisma.CompanyInfoOrderByWithRelationInput[];
    cursor?: Prisma.CompanyInfoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompanyInfoScalarFieldEnum | Prisma.CompanyInfoScalarFieldEnum[];
};
export type CompanyInfoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyInfoSelect<ExtArgs> | null;
    omit?: Prisma.CompanyInfoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CompanyInfoCreateInput, Prisma.CompanyInfoUncheckedCreateInput>;
};
export type CompanyInfoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CompanyInfoCreateManyInput | Prisma.CompanyInfoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CompanyInfoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyInfoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CompanyInfoOmit<ExtArgs> | null;
    data: Prisma.CompanyInfoCreateManyInput | Prisma.CompanyInfoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CompanyInfoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyInfoSelect<ExtArgs> | null;
    omit?: Prisma.CompanyInfoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CompanyInfoUpdateInput, Prisma.CompanyInfoUncheckedUpdateInput>;
    where: Prisma.CompanyInfoWhereUniqueInput;
};
export type CompanyInfoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CompanyInfoUpdateManyMutationInput, Prisma.CompanyInfoUncheckedUpdateManyInput>;
    where?: Prisma.CompanyInfoWhereInput;
    limit?: number;
};
export type CompanyInfoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyInfoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CompanyInfoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CompanyInfoUpdateManyMutationInput, Prisma.CompanyInfoUncheckedUpdateManyInput>;
    where?: Prisma.CompanyInfoWhereInput;
    limit?: number;
};
export type CompanyInfoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyInfoSelect<ExtArgs> | null;
    omit?: Prisma.CompanyInfoOmit<ExtArgs> | null;
    where: Prisma.CompanyInfoWhereUniqueInput;
    create: Prisma.XOR<Prisma.CompanyInfoCreateInput, Prisma.CompanyInfoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CompanyInfoUpdateInput, Prisma.CompanyInfoUncheckedUpdateInput>;
};
export type CompanyInfoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyInfoSelect<ExtArgs> | null;
    omit?: Prisma.CompanyInfoOmit<ExtArgs> | null;
    where: Prisma.CompanyInfoWhereUniqueInput;
};
export type CompanyInfoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CompanyInfoWhereInput;
    limit?: number;
};
export type CompanyInfoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyInfoSelect<ExtArgs> | null;
    omit?: Prisma.CompanyInfoOmit<ExtArgs> | null;
};
