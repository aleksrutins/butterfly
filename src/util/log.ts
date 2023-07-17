import colors from 'colors/safe.js';

export function info(msg: string) {
    console.info(colors.bgBlue(' INFO '), msg);
}

export function warn(msg: string) {
    console.info(colors.bgYellow(' WARN '), msg);
}

export function error(msg: string) {
    console.info(colors.bgRed(' ERR  '), msg);
}