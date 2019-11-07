if (!window.mergeImported) {
  $('body').append('<script src="https://unpkg.com/merge-images"></script>')
  $('#content_base').append(`<button id="mergeBtn" style="position:absolute;height:30px" onclick="merge();">merge</button>`)
  window.mergeImported = true
}

function merge () {
  let page = $('#menu_slidercaption').text().split('/')[0]
  let imgSize = []
  let imgUrl = []
  let _width = 0
  let _height = 0

  let matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/

  for (let i = 0; i < 3; i++) {
    let img = $('#content-p' + page + ' img')[i]

    let parent = $(img).parent()

    let transform = $(img).css('transform').replace('matrix(').replace(')').replace(/ /g, '').split(',')
    let parenrTransform = parent.css('transform').replace('matrix(').replace(')').replace(/ /g, '').split(',')

    let scalingX = +transform[0]
    let scalingY = +transform[3]

    let offsetX = +parenrTransform[4]
    let offsetY = +parenrTransform[5]

    console.log(transform)

    imgSize.push([img.width, img.height])
    imgUrl.push({ src: img.src, x: 0, y: offsetY / scalingY })

    _width = +imgSize[i][0]
    _height += +imgSize[i][1]
  }

  mergeImages(imgUrl, { width: _width, height: _height })
    .then(b64 => {
      let hasAppend = $('#customDownload').length > 0
      if (hasAppend) {
        $('#customDownload').attr('src', b64).text(`download page:${page}`)
      }
      else {
        $('#content_base').append(`<image id="customDownload" src="${b64}" style="position:absolute;top:30px;width:100px" download>download page:${page}</image>`)
      }
    });
}