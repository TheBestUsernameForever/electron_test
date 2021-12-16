const Files = require('./Files')
const path = require('path')

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }



  const dirList = Files.onlyFiles(__dirname);
  if (dirList) addRowToTable(document.getElementById('file_list'), dirList)
})


  let addRowToTable = (container, inList, tableId="table_id") =>{
    let table = document.createElement('table');
    table.id=tableId;
    table.appendChild(document.createElement('tbody'));
    let tbody = table.getElementsByTagName("tbody")[0];
    inList.forEach(item=>{
      var row = document.createElement("tr");
      let cell = document.createElement("td");
          cell.innerText=item;
      row.appendChild(cell);
      tbody.appendChild(row);
    });
    container.appendChild(table);
  } 