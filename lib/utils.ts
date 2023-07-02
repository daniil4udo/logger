import type { LogMessage } from './types';

export function noop() {}

export function detectMode() {
    try {
        return import.meta.env?.MODE;
    }
    catch {
        return process.env?.NODE_ENV;
    }
}

export function getMessage(message: LogMessage): string | undefined {
    if (Array.isArray(message))
        return message.join(' | ');
    if (message instanceof Error)
        return message.message;
    if (typeof message === 'object')
        return JSON.stringify(message, null, 1);

    return message as string ?? '';
}

export const detectNode: boolean = Object.prototype
    .toString
    .call(typeof process !== 'undefined' ? process : 0) === '[object process]' || detectMode() === 'production';

export function mountLog(name: string, style: string) {
    if (detectNode)
        return [ `${name}: ` ];

    return [
        `%c${name}%c:`,
        style,
        'background: transparent;',
    ];
}
