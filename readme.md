# tools.js 含各种工具函数

## findDiff

找出第二个参数相对于第一个参数不同的地方  
常用于表单提交前，只提交变化部分  
参数必须为 2 个 json

```
const obj1 = {a: 1, b: '2',c: {a: [1, 2, 3], b: 'ww'} }
,obj2 = {a: 2, b: 2,c:{a:[1,2,3], b: 'ee'}}

findDiff(obj1, obj2)
// { a: 2, b: 2, c: { b: 'ee' } }
```

## findKeyPath

找到所寻数据的路径

```
let orginOjb = ['fff',{b: {a: 2, b: '33',c:33 }}, {c:{v1: 1,v2:3}}, {c:{v1: 2,v2:3}}]
findKeyPath(originOjb, 33)
// [ '1', 'b', 'c' ]
findKeyPath(originOjb, {v1:2})
// [ '3', 'c' ]

```

可很容易根据返回路径找到值

```
pathArr.reduce((old,nw) =>  old[nw], originOjb)
```

## jsonsToArray

根据输入的数组 json 返回 对应的二维数组

```
let json1 = {a: 1,c:{a: [1,2,3], b: 'rr'}}
jsonsToArray([])
/* [
 *   [ 'a', 1 ],
 *   [ 'c.a', [ 1, 2, 3 ] ],
 *   [ 'c.b', 'rr' ]
 * ]
 */
// 第二个参数为是否含有key
jsonsToArray([json1], false)
// [ [ 1 ], [ [ 1, 2, 3 ] ], [ 'rr' ] ]
let json2 = {a:{d: 22}, c: {a: {g:1}, b: 'ee', c: [1]}}
jsonsToArray([json1, json2])
/*
*[
*  [ 'a', 1, '' ],
*  [ 'a.d', '', 22 ],
*  [ 'c.a', [ 1, 2, 3 ], '' ],
*  [ 'c.a.g', '', 1 ],
*  [ 'c.b', 'rr', 'ee' ],
*  [ 'c.c', '', [ 1 ] ]
*]
*/
```

## downloadCsv

将 jsons 下载成 csv(浏览器环境)  
与 jsonsToArray 函数配合使用，轻松实现导出 i18n 数据

```
const arr = jsonsToArray([zhCN,en, es])
downloadCsv(arr)
```

