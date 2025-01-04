export function removeUrlExtraDoubleSlashes(url: string): string {
    return url.replace(/([^:]\/)\/+/g, '$1');
}