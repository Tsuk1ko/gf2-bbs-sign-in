import 'dotenv/config';
import { setIsBin } from './config';

setIsBin(true);

await import('./index.ts').catch(() => {});

console.log('已完成，请关闭');
setTimeout(() => {}, Number.MAX_SAFE_INTEGER);
