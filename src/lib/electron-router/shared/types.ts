type AllowedKeys<T, P> = { [K in keyof T]: K extends P? T[K] : never };
type Primitive = null | undefined | string | number | boolean | symbol | bigint;
export type TrueCondition<T, S, F> = T extends true ? S : F;

export type LiteralUnion<LiteralType extends string, BaseType extends Primitive> = LiteralType | (BaseType & Record<never, never>);

type RawTypes = {
    devServerUrl?: string;
    types?: {
        ids?: string[];
        queryKeys?: string[];
        strict?: boolean;
    };
};

type _QueryKeys<T extends string[]> = T[number];

export namespace Query {
    export type Keys<T extends NonNullable<RawTypes>> = _QueryKeys<NonNullable<NonNullable<T['types']>['queryKeys']>>;
    export type Return = string | null;
}

export type ElectronRouterOutput<T extends {
    devServerUrl?: string;
    types?: {
        ids?: string[];
        queryKeys?: string[];
        strict?: boolean;
    };
}> = Partial<AllowedKeys<T, 'types' | 'devServerUrl'> & {
    types?: AllowedKeys<T['types'], 'ids' | 'queryKeys' | 'strict'>;
}>;