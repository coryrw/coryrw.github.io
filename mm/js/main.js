var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('boop');
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
    var _a;
    ev.preventDefault();
    if ((_a = ev.dataTransfer) === null || _a === void 0 ? void 0 : _a.types) {
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
});
primaryKitArea.addEventListener(`drop`, (ev) => {
    var _a;
    ev.preventDefault();
    hoverDialog.style.display = `none`;
    console.log((_a = ev.dataTransfer) === null || _a === void 0 ? void 0 : _a.files.length);
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
});
//if (matchFilesElement && matchFilesElement instanceof HTMLInputElement) matchFilesInput = matchFilesElement;
function fileInputHandler(ev) {
    let fileArray = [];
    let outStr = '';
    if (!(matchFilesInput instanceof HTMLInputElement) || !matchFilesInput.files)
        return;
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
function processFiles(matchFiles) {
    console.log(`a yup`);
    let outStr = ``;
    matchFiles.forEach((f, i) => __awaiter(this, void 0, void 0, function* () {
        outStr += f.name + '\r\n';
        ProcessMatchFile(yield f.text());
    }));
    //alert(outStr);
}
const logBox = document.getElementById(`output_log`);
function OutputLog(message) {
    let newMessage = document.createElement('div');
    newMessage.innerText = message;
    if (logBox)
        logBox.append(newMessage);
}
//const data = parseCsv(records, options);
//addEventListener("DOMContentLoaded", (event) => { (document.getElementById('drop_zone') as HTMLDivElement).innerText='YEAH!';});
//if (dzElement && dzElement instanceof HTMLDivElement) dropZone = dzElement; else { console.log(`can't find file upload zone`);}
function fileDropHandler(ev) {
    ev.preventDefault();
    if (ev.dataTransfer && ev.dataTransfer.items) {
        [...ev.dataTransfer.items].forEach((item, i) => __awaiter(this, void 0, void 0, function* () {
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
        }));
    }
}
