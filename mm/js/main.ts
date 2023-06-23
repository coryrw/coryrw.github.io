console.log('boop');
import {CsvError, parse as parseCsv} from './csv-parse/index.js';
import { ProcessMatchFile } from './MatchFileProcessor.js';

//grab all the UI elements
//const uploadButton = document.getElementById(`uploadInfoArea`);

const primaryKitArea = document.getElementById(`primaryKitArea`);
  const hoverDialog = document.getElementById(`hoverDialog`);
  const matchFilesInput = document.getElementById(`matchListFilesInput`);

  const primaryKitListContainer = document.getElementById(`primaryKitListContainer`);
    const goToLogButton = document.getElementById(`primaryKitGoToLogButton`);

  const primaryKitLogContainer = document.getElementById(`primaryKitLogContainer`);
    const goToListButton = document.getElementById(`primaryKitGoToListButton`);


if (!primaryKitArea || !hoverDialog || !matchFilesInput || !goToLogButton || !goToListButton || !primaryKitListContainer || !primaryKitLogContainer) {
  throw new Error("Error loading UI");
}

primaryKitArea.addEventListener(`dragover`, (ev) => {
  ev.preventDefault();
  
  if (ev.dataTransfer?.types) {
    for (let i = 0; i < ev.dataTransfer.types.length; i++) {
      if (ev.dataTransfer.types[i] == `Files`) {
        hoverDialog.style.display = `block`;
        break;
      }
    }
  }
});

primaryKitArea.addEventListener(`dragleave`, (ev) => {
  ev.preventDefault();
  hoverDialog.style.display = `none`;
})

primaryKitArea.addEventListener(`drop`, (ev) => {
  ev.preventDefault();
  hoverDialog.style.display = `none`; 
  console.log(ev.dataTransfer?.files.length);
});

// function browseForFilesHandler(ev: MouseEvent) {
//   alert((ev.target as HTMLButtonElement).id);
// }
// uploadButton.addEventListener('click', browseForFilesHandler);
goToLogButton.addEventListener('click', (ev) => {
  primaryKitListContainer.style.display = 'none';
  primaryKitLogContainer.style.display = 'block';
});

goToListButton.addEventListener('click', (ev) => {
  primaryKitLogContainer.style.display = 'none';
  primaryKitListContainer.style.display = 'block';
})
//if (matchFilesElement && matchFilesElement instanceof HTMLInputElement) matchFilesInput = matchFilesElement;

function fileInputHandler(ev: Event) {
  let fileArray: File[] = [];
  let outStr = '';
  if (!(matchFilesInput instanceof HTMLInputElement) || !matchFilesInput.files) return;
  for (let i = 0; i < matchFilesInput.files.length; i++) {
    let curFile = matchFilesInput.files.item(i);
    if (curFile) {
      fileArray.push(curFile);
      outStr += `${curFile.name}\r\n`;
    }
  }

  processFiles(fileArray);
  //alert(outStr);
}
matchFilesInput.addEventListener('change', fileInputHandler);


function processFiles(matchFiles: File[]) {
  console.log(`a yup`);
  let outStr = ``;
  matchFiles.forEach(async (f, i) => {
    outStr += f.name + '\r\n';
    ProcessMatchFile(await f.text())
  });

  //alert(outStr);
}


const logBox = document.getElementById(`output_log`);

function OutputLog(message: string) {
  let newMessage = document.createElement('div');
  newMessage.innerText = message;
  if (logBox) logBox.append(newMessage);
}
//const data = parseCsv(records, options);
//addEventListener("DOMContentLoaded", (event) => { (document.getElementById('drop_zone') as HTMLDivElement).innerText='YEAH!';});


//if (dzElement && dzElement instanceof HTMLDivElement) dropZone = dzElement; else { console.log(`can't find file upload zone`);}

function fileDropHandler(ev: DragEvent) {
  ev.preventDefault();

  if (ev.dataTransfer && ev.dataTransfer.items) {
    [...ev.dataTransfer.items].forEach(async (item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile();
        let fnStr = 'ERROR?';
        fnStr = file == null ? fnStr : file.name;
        console.log(`… file[${i}].name = ${fnStr}`);

        if (file) {
          //parseCsv(await file.text(),{}, ProcessOneToManyTest);
        }
      }
    });
  }
}