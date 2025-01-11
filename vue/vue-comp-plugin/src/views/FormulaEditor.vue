<template>
  <div id="codeMirror"></div>
</template>

<script setup>
import { EditorState } from "@codemirror/state"
import { EditorView, Decoration, WidgetType, MatchDecorator, ViewPlugin } from "@codemirror/view"
import { autocompletion, closeBrackets, pickedCompletion } from "@codemirror/autocomplete";
import { deleteCharBackward } from "@codemirror/commands"
import { run } from 'formula';


const getResult = (formModel) => {
  const formula = view.state.sliceDoc().replaceAll('@', '');
  const res = getCalFormulaValue(formula, formModel)
  return res
}

function getCalFormulaValue(formula, formModel) {
  return run(formula, formModel)
}

const props = defineProps({
  // 数据项
  dataItems: {
    type: Array,
    default: () => []
  },
  calculateFunctions: {
    type: Array,
    default: () => []
  }
})

// 实体自动完成项
let entityCompletions = props.dataItem.map((item) => {
  return {
    label: item.code,
    type: "variable",
    detail: item.name,
    apply: `${item.code}@`,
  };
});

// 公式自动完成项
let formulaCompletions = calculateFunctions.map(item => {
  return {
    ...item,
    apply: (view, completion, from, to) => {
      view.dispatch({
        changes: {
          from,
          to,
          insert: `${completion.label}()`
        }
      });
      const cursor = view.state.selection.main.head || 0;
      view.dispatch({
        selection: { anchor: cursor - 1 },
        annotations: pickedCompletion.of(completion)
      })
    }
  }
})

// 定义占位符小部件
class PlaceholderWidget extends WidgetType {
  constructor(name) {
    super();
    this.name = name;
  }

  eq(other) {
    return this.name == other.name
  }

  toDOM() {
    let elt = document.createElement("span");
    elt.style.cssText = `
      box-sizing: border-box;
      margin: 0 6px 0 0;
      color: #000000d9;
      list-style: none;
      display: inline-block;
      height: auto;
      padding: 0 6px;
      font-size: 14px;
      line-height: 20px;
      white-space: nowrap;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      color: #096dd9;
      background: #e6f7ff;
      border-color: #91d5ff;
    `;
    elt.textContent = this.name;
    return elt;
  }
  ignoreEvent() {
    return false
  }
}

// 定义占位符匹配器
const placeholderMatcher = new MatchDecorator({
  regexp: /(\w+)\@/g,
  decoration: (match) => {
    let label = match[1]
    let res = entityFields.find((item) => item.code == match[1]);
    if (res) {
      label = res.name;
    }
    return Decoration.replace({
      widget: new PlaceholderWidget(label)
    })
  }
})

// 定义占位符插件
const placeholders = ViewPlugin.fromClass(
  class {
    constructor(view) {
      this.placeholders = placeholderMatcher.createDeco(view);
    }

    update(update) {
      this.placeholders = placeholderMatcher.updateDeco(
        update,
        this.placeholders
      )
    }
  },
  {
    decorations: (instance) => instance.placeholders,
    provide: (plugin) =>
      // 定义原子范围不被光标拆分
      EditorView.atomicRanges.of((view) => {
        return view.plugin(plugin)?.placeholders || Decoration.none;
      }),
  }
)

// 提示字符并插入相关字符
function autoCompletions(context) {
  let before = context.matchBefore(/\w+/);
  if (!context.explicit && !before) return null;
  return {
    from: before ? before.from : context.pos,
    options: [...formulaCompletions, ...entityCompletions],
    validFor: /^\w*$/,
  };
}

// 创建编辑器状态
let state = EditorState.create({
  doc: "",
  extensions: [
    autocompletion({ override: [autoCompletions] }), // 提示字符并插入相关字符
    closeBrackets(), // 自动补全括号
    placeholders,
    keymap.of([
      {
        key: "Backspace",
        run: deleteCharBackward,
        preventDefault: true
      }
    ])
  ],
})

// 挂载编辑器视图
let view;
onMounted(() => {
  view = new EditorView({
    state,
    parent: document.getElementById('codeMirror'),
  })
})

defineExpose({
  getResult,
})
</script>

<style lang="scss" scoped>

</style>