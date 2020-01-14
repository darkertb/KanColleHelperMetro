if (!window.mergeImported) {
  $('body').append(`<select id="zoomRaitoSection" style="position:absolute;top:30px;height:10px"><option value="300">300</option><option value="250" selected>250</option><option value="200">200</option><option value="175">175</option><option value="150">150</option><option value="125">125</option><option value="110">110</option><option value="100">100</option></select>`)
  $('body').append(`<button style="position:absolute;top:50px;height:10px" onclick="downloadCurPage();">download</button>`)
  window.mergeImported = true
}

function checkZoomRaito() {
  let targetZoomRaito = parseInt(document.getElementById('zoomRaitoSection').value)
  let diff = targetZoomRaito - getZoomRaito()
  while (diff != 0) {
    zoom(diff > 0, 1)
    diff = targetZoomRaito - getZoomRaito()
  }
}

function zoom (zoomIn, times) {
  let btn = document.getElementById(zoomIn ? 'zoomInBtn' : 'zoomOutBtn')
  for (let i = 0; i < times; i++) {
    btn.click()
  }
}

function getZoomRaito () {
  return parseInt(document.getElementById('zoomRatio').textContent.replace('%', ''))
}

function getDataUrl (callback) {
  removeBlanks(document.getElementById('viewport0').getElementsByTagName('canvas')[0], (url) => {
    callback(url)
  })
}

function getNowPage () {
  return parseInt(document.getElementById('pageSliderCounter').textContent.slice('/')[0])
}

function downloadCurPage() {
  checkZoomRaito()
  console.log(document.getElementById('viewport0').getElementsByTagName('canvas')[0].width)
  console.log(document.getElementById('viewport0').getElementsByTagName('canvas')[0].height)

  getDataUrl((url) => {
    var a = $("<a>")
      .attr("href", url)
      .attr("download", "page" + getNowPage() + ".png")
      .appendTo("body");

    a[0].click();

    a.remove();
  })

}

function removeBlanks (canvas, callback) {
  imgWidth = canvas.width
  imgHeight = canvas.height
  var imageData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height),
    data = imageData.data,
    getRBG = function (x, y) {
      return {
        red: data[(imgWidth * y + x) * 4],
        green: data[(imgWidth * y + x) * 4 + 1],
        blue: data[(imgWidth * y + x) * 4 + 2]
      };
    },
    isWhite = function (rgb) {
      return rgb.red == 255 && rgb.green == 255 && rgb.blue == 255;
    },
    scanY = function (fromTop) {
      var offset = fromTop ? 1 : -1;

      // loop through each row
      for (var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {

        // loop through each column
        for (var x = 0; x < imgWidth; x++) {
          if (!isWhite(getRBG(x, y))) {
            return y;
          }
        }
      }
      return null; // all image is white
    },
    scanX = function (fromLeft) {
      var offset = fromLeft ? 1 : -1;

      // loop through each column
      for (var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {

        // loop through each row
        for (var y = 0; y < imgHeight; y++) {
          if (!isWhite(getRBG(x, y))) {
            return x;
          }
        }
      }
      return null; // all image is white
    };

  var cropTop = scanY(true),
    cropBottom = scanY(false),
    cropLeft = scanX(true),
    cropRight = scanX(false),
    cropWidth = cropRight - cropLeft,
    cropHeight = cropBottom - cropTop;

  let nc = document.createElement('canvas')
  nc.width = cropWidth
  nc.height = cropHeight
  nc.getContext("2d").drawImage(canvas,
    cropLeft, cropTop, cropWidth, cropHeight,
    0, 0, cropWidth, cropHeight);

  nc.toBlob((blob) => {
    callback(URL.createObjectURL(blob))
  })

};