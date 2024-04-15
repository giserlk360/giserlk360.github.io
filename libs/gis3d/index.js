function importJS(filePath) {
  if (filePath.match(/\.js$/)) {
    document.write(`<script src="${filePath}" type="text/javascript"></script>`)
  }
}

function importCSS(filePath) {
  if (filePath.match(/\.css$/)) {
    document.write(
      `<link rel="stylesheet" href="${filePath}" type="text/css" />`
    )
  }
}

function importFiles() {
  importCSS('/libs/gis3d/Cesium/Widgets/widgets.css')
  importCSS('/libs/gis3d/mars3d/mars3d.css')

  importJS('/libs/gis3d/Cesium/Cesium.js')
  importJS('/libs/gis3d/mars3d/mars3d.js')
}

importFiles()
