import type { BrowserWindow } from "electron";

import type {
    LiteralUnion,
    TrueCondition,
    ElectronRouterOutput,
} from "./shared/types";

import {
    type RouteDef,
    type RouterProps,
    Router as RendererRouter,
} from "./renderer";

import { createFileRoute } from "./main/create-file";
import { createURLRoute } from "./main/create-url";
import { isDev } from "./shared/utils/is-dev";

export type { Query } from "./shared/types";

const defaults = { devServerUrl: "http://localhost:3000", windowId: "main" } as const;

export function createElectronRouter<
    const T extends {
        devServerUrl?: string;
        types?: {
            ids?: string[];
            queryKeys?: string[];
            strict?: boolean;
        };
    }
>(options: ElectronRouterOutput<T>) {

    type Types = NonNullable<T["types"]>;
    type IsStrictMode = Types["strict"] extends boolean ? Types["strict"] : true;

    function registerRoute<const S extends {
        id: Types['ids'] extends string[]
            ? TrueCondition<
                IsStrictMode,
                Types['ids'][number],
                LiteralUnion<Types['ids'][number], string>
            > : string;
        query?: Types['queryKeys'] extends string[]
            ? TrueCondition<
                IsStrictMode,
                Partial<Record<Types['queryKeys'][number], unknown>>,
                Partial<Record<LiteralUnion<Types['queryKeys'][number], string>, unknown>>
            > : Record<string, unknown>;
        devServerUrl?: string;
        htmlFile: string;
        browserWindow: BrowserWindow;
    },>(props: S) {
        const devServerUrl = props.devServerUrl || options.devServerUrl || defaults.devServerUrl;
        const windowId = props.id || defaults.windowId;

        if (isDev()) {
            const URLRoute = createURLRoute(devServerUrl, windowId, { query: props.query as Record<string, string> });
            props.browserWindow.loadURL(URLRoute);
        } else {
            const fileRoute = createFileRoute(props.htmlFile, windowId, { query: props.query as Record<string, string> });
            props.browserWindow.loadFile(...fileRoute);
        }
    }

    function Router(
        props: Partial<RouterProps<Types['ids'] extends string[]
            ? (IsStrictMode extends true
                ? Record<Types['ids'][number], JSX.Element>
                : Record<LiteralUnion<Types['ids'][number], string>, JSX.Element>)
            : Record<string, JSX.Element>>
        >,
    ) {
        return RendererRouter(props as RouteDef);
    }

    const settings = {
        devServerUrl: options.devServerUrl || defaults.devServerUrl,
        types: {
            strict: options.types?.strict ?? true,
            ids: options.types?.ids || [],
            queryKeys: options.types?.queryKeys || [],
        },
    } as {
        devServerUrl: T['devServerUrl'] extends string ? T['devServerUrl'] : typeof defaults.devServerUrl;
        types: {
            strict: Types['strict'] extends boolean ? Types['strict'] : true;
            ids: Types['ids'] extends string[] ? Types['ids'] : [];
            queryKeys: Types['queryKeys'] extends string[] ? Types['queryKeys'] : [];
        };
    };

    return {
        Router,
        settings,
        registerRoute,
    } as const;
}