import { default as React, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";

const EDITTOR_HOLDER_ID = "editorjs";

const Editor = ({ editorData, setEditorData, flag, readonly = false }) => {
  const ejInstance = useRef();

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      tools: {
        header: {
          class: Header,
          shortcut: "CMD+SHIFT+H",
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile(file) {
                // your own uploading logic here
                // return MyAjax.upload(file).then(() => {
                return {
                  success: 1,
                  file: {
                    url: "https://codex.so/upload/redactor_images/o_80beea670e49f04931ce9e3b2122ac70.jpg",
                    // any other image data you want to store, such as width, height, color, extension, etc
                  },
                };
                // });
              },
            },
          },
          actions: [
            {
              name: "new_button",
              icon: "<svg>...</svg>",
              title: "New Button",
              action: (name) => {
                alert(`${name} button clicked`);
                return false;
              },
            },
          ],
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
      },
      logLevel: "ERROR",
      readOnly: readonly,
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: () => {
        handleSave();
      },
      autofocus: true,
      tools: {
        header: Header,
      },
    });
  };
  function handleSave() {
    ejInstance.current
      .save()
      .then((savedData) => {
        // console.log("salvado", savedData);
        setEditorData(savedData);
      })
      .catch((error) => {
        console.log("failed", error);
      });
  }

  return (
    <React.Fragment>
      <div className="h-96" id={EDITTOR_HOLDER_ID}></div>
    </React.Fragment>
  );
};

export default Editor;
