import {EditorView, basicSetup} from "codemirror"
import {css} from "@codemirror/lang-css"

window.Codemirror = { EditorView, basicSetup, css }
// window.onload = () => {
//   const view = new EditorView({
//     parent: document.getElementById("editor"),
//     doc: `p { background-color: purple }`,
//     extensions: [basicSetup, css()]
//   })
// }