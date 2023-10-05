/*
 * @Author: dianluyuanli-wp
 * @LastEditors: dianluyuanli-wp
 * @Date: 2022-01-03 21:17:11
 * @LastEditTime: 2022-08-22 17:12:00
 */

declare module '*.scss' {
    const s: { readonly [key: string]: string };
    export default s;
}

declare const API_DOMAIN: string;
declare module '*.png' {
    const s: string;
    export default s;
}

declare module '*.css' {
    const s: { readonly [key: string]: string };
    export default s;
}