// import http from 'http';
// import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform : {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testPathIgnore : [
        "/src"
    ]
};