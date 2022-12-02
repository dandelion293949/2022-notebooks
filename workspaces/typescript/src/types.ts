import * as dynamics from './dynamics';
import { a } from './dynamics/a';

type animal = 'cat' | 'dog';

export type aaa = {
  [k in animal]: string;
};

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// 数値を文字列に変換する関数
type ToString = (num: number) => string;

// 数値を文字列に変換する関数の返り値
type ReturnTypeToString = ReturnType<ToString>; // (1)
//   ^ == string

// そもそも関数でない
type ReturnTypeString = ReturnType<string>; // (2)
//   ^ Type 'string' does not satisfy the constraint '(...args: any) => any'.(2344)

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: (infer U)[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

type ReturnUnpacked = Unpacked<Promise<number>>;
const test: aaa = {
  cat: 'aaa',
  dog: 'ddd',
};

console.log(test);

console.log('dynamics', dynamics, dynamics.default, dynamics.default.b);

type ABC<T> = T extends { [K in keyof T]: infer U
}
  ? {
      name: U;
    }
  : never;

type FunctionType = ABC<typeof dynamics.default.a>;
