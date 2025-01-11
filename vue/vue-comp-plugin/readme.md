# FormulaEditor
## 使用
```
<FormulaEditor ref="formulaEditor" dataItems="dataItems" calculateFunctions="calculateFunctions" />

import { FormulaEditor } from 'formula-editor-plugin'

```
## 传入参数
1. dataItems
```
dataItems = [
  {
    name: "单价",
    code: "price",
  },
  {
    name: "数量",
    code: "num",
  },
]
```
2. calculateFunctions
```
calculateFunctions = [
   {
    label: "SUM",
    detail: "求和函数",
    description: "SUM(field1,field2,...)",
  },
  {
    label: "MULTIPLY",
    detail: "求积函数",
    description: "MULTIPLY(field1,field2,...)",
  },
]
```
## 暴露方法
1. getResult()
```
formulaEditor.value.getResult(formModel)

formModel = {
  price: 6,
  num: 10
}
```