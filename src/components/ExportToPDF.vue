<template>
    <div id="app" ref="document">
      <div id="element-to-convert">
        <center>
          <img width="400" src="./path-or-url" />
        </center>
      </div>
      <button @click="exportToPDF">Export to PDF</button>
    </div>
  </template>
  
  <script>
  import html2pdf from "html2pdf.js";
  
  export default {
    name: "app",
    methods: {
      exportToPDF() {
        html2pdf(document.getElementById("element-to-convert"), {
                  margin: 1,
                filename: "i-was-html.pdf",
              });
      },
    },
  };
  </script>
  
  <style>
  #app {
    margin-top: 60px;
    text-align: center;
  }
  </style>