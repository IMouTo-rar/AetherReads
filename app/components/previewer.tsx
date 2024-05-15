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
import { ReactReader } from "react-reader";
function PreviewerEPUB(props: { url: string }) {
  const [location, setLocation] = useState<string | number>(0);
  return (
    <div className="epub-view">
      <ReactReader
        url={props.url}
        location={location}
        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
        epubInitOptions={{
          openAs: 'epub',
        }}
        epubOptions={{
          allowPopups: true,
          allowScriptedContent: true,
          flow: 'scrolled',
          manager: 'continuous',
        }}
      />
    </div>
  );
}


// #region pdf render
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function PreviewerPDF(props: { url: string }) {
  const [pageNumber, setPageNumber] = useState(1);            // 页码
  const [pageNumberInput, setPageNumberInput] = useState(1);  // 显示的页码
  const [numPages, setNumPages] = useState(0);                // 总页数
  const [pageWidth, setPageWidth] = useState(600);            // 页面宽度
  const [pageHeight, setPageHeight] = useState(800);          // 页面高度
  const [fullscreen, setFullscreen] = useState(false);        // 全屏

  const onDocumentLoadSuccess = ({ numPages = 0 }) => {
    setNumPages(numPages);
  };

  function pageRender() {
    const page = [];
    for (let i = 0; i < numPages; i++) {
      page.push(
        <LazyLoad
          height={pageHeight}
          threshold={0.10}
          key={`lazy-` + i}
        >
          <Page
            key={`page-` + i}
            pageNumber={pageNumber + i}
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
// #endregion

// something wrong.
function PreviewerError() {
  return (
    <div>
      File Error.
    </div>
  )
}