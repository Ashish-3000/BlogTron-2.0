import {
  default as React,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./Tools.js";

const EDITTOR_HOLDER_ID = "editorjs";

const Editor = ({ editorData, setEditorData, flag, readonly = false }) => {
  const editorCore = useRef();

  const ReactEditorJS = createReactEditorJS();

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  function handleSave() {
    editorCore.current
      .save()
      .then((savedData) => {
        // console.log("salvado", savedData);
        setEditorData(savedData);
      })
      .catch((error) => {
        console.log("failed", error);
      });
  }

  function handleIt(instance) {
    editorCore.current = instance;
  }

  return (
    <React.Fragment>
      <ReactEditorJS
        onInitialize={handleIt}
        defaultValue={editorData}
        tools={EDITOR_JS_TOOLS}
        onChange={handleSave}
      />
    </React.Fragment>
  );
};

export default Editor;
