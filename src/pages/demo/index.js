import React from "react";
import MonacoEditor from "react-monaco-editor";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "// type your code...",
    };
  }
  editorDidMount(editor, monaco) {
    console.log("editorDidMount", editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log("onChange", newValue, e);
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
    };
    return (
      <div className="w-screen h-screen">
        <MonacoEditor
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDid5Mount={this.editorDidMount}
        />
      </div>
    );
  }
}
