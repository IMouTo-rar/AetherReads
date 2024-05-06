/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

export default function Previewer(props: { file: string; url: string; }) {
  if (props.file == 'epub') {
    return <PreviewerEPUB url={ props.url }/>
  }
  else if (props.file == 'pdf') {
    return <PreviewerPDF url={ props.url }/>
  }
  else {
    return <PreviewerError/>
  }
}

// epub render
function PreviewerEPUB(props: {url: string}){
  return(
    <div>
      {props.url}
    </div>
  );
}

// pdf render
import { Document, Page, pdfjs } from "react-pdf";
function PreviewerPDF(props: {url: string}) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageNumberInput, setPageNumberInput] = useState(1);
  const [pageNumberFocus, serPageNumberFocus] = useState(false);
  const [pageWidth, setPageWidth] = useState(503);
  const [fullscreen, setFullscreen] = useState(false);
  return(
    <div className="previewer-pdf">
      <Document file={props.url} loading={'Loading...'}>
        <Page pageNumber={pageNumber} width={pageWidth} loading={'Loading...'}/>
      </Document>
    </div>
  )
}

// something wrong.
function PreviewerError() {
  return(
    <div>
      File Error.
    </div>
  )
}