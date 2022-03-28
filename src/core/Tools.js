// tools.js
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import { projectStorage } from "../firebase/config";
import { useState } from "react";
import { API } from "../backend";
// import SimpleImage from '@editorjs/simple-image'

const upload = (file) => {
  const storageRef = projectStorage.ref(file.name);

  return new Promise((resolve, reject) => {
    storageRef.put(file).on(
      "state_changed",
      (snap) => {},
      (err) => {
        console.log(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        resolve({
          success: 1,
          file: {
            url: url,
          },
        });
      }
    );
  });
};

const fetchUrl = () => {};

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: `${API}/fetch`,
      headers: {
        Accept: "application/json",
      },
    },
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file) {
          return upload(file).then((data) => {
            return data;
          });
        },
      },
    },
  },
  raw: Raw,
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 3,
    },
  },
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
};
