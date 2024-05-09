/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import LazyLoad from "react-lazy-load";

export default function Previewer(props: { file: string; url: string; }) {
  if (props.file == 'epub') {
    return <PreviewerEPUB url={props.url} />
  }
  else if (props.file == 'pdf') {
    return <PreviewerPDF url={props.url} />
  }
  else {
    return <PreviewerError />
  }
}

// epub render
function PreviewerEPUB(props: { url: string }) {
  return (
    <div>
      {props.url}
    </div>
  );
}

// pdf render
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function PreviewerPDF(props: { url: string }) {
  const [pageRenderCount, setPgaeRenderCount] = useState(20); // 一次渲染范围
  const [pageNumber, setPageNumber] = useState(1);            // 页码
  const [pageNumberInput, setPageNumberInput] = useState(1);  // 显示的页码
  const [numPages, setNumPages] = useState(0);                // 总页数
  const [pageWidth, setPageWidth] = useState(600);            // 页面宽度
  const [pageHeight, setPageHeight] = useState(850);          // 页面高度
  const [fullscreen, setFullscreen] = useState(false);        // 全屏

  const onDocumentLoadSuccess = ({ numPages = 0 }) => {
    setNumPages(numPages);
  };

  function pageRender() {
    const page = [];
    for (let i = 0; i < numPages; i++) {
      page.push(
        <LazyLoad
          className="pdf-reader-page"
          width={pageWidth}
          height={pageHeight}
          threshold={0.10}
          key={`lazy` + i}
        >
          <Page
            key={pageNumber + i}
            pageNumber={pageNumber + i}
            width={pageWidth}
            height={pageHeight}
            loading={'加载中...'}
          >
          </Page>
        </LazyLoad>
      );
    }
    return page;
  }

  return (
    <div className="pdf-view">
      <div className="pdf-page">
        <Document
          file={props.url}
          loading={'加载中...'}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {pageRender()}
        </Document>
      </div>
    </div>
  );

}

// something wrong.
function PreviewerError() {
  return (
    <div>
      File Error.
    </div>
  )
}