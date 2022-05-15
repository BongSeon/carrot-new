// If you like - you can move this section into separate file
// ------- Move from here -------
const dataURItoBlob = (dataURI) => {
  const bytes =
    dataURI.split(',')[0].indexOf('base64') >= 0
      ? atob(dataURI.split(',')[1])
      : unescape(dataURI.split(',')[1])
  const mime = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const max = bytes.length
  const ia = new Uint8Array(max)
  for (let i = 0; i < max; i += 1) ia[i] = bytes.charCodeAt(i)
  return new Blob([ia], { type: mime })
}

const resizeImageSquare = ({ file, maxSize, square = false }) => {
  const reader = new FileReader()
  const image = new Image()
  const canvas = document.createElement('canvas')

  const resizeSquare = () => {
    let { width, height } = image
    let sx,
      sy,
      sWidth,
      sHeight = 0
    if (width > height) {
      sx = (width - height) / 2
      sy = 0
      sWidth = height
      sHeight = height

      if (width > maxSize) {
        // height *= maxSize / width
        width = maxSize
        height = maxSize
      }
    } else {
      sx = 0
      sy = (height - width) / 2
      sWidth = width
      sHeight = width

      if (height > maxSize) {
        // width *= maxSize / height
        width = maxSize
        height = maxSize
      }
    }

    canvas.width = width
    canvas.height = height
    canvas
      .getContext('2d')
      .drawImage(image, sx, sy, sWidth, sHeight, 0, 0, width, height)

    const dataUrl = canvas.toDataURL('image/jpeg')

    return dataURItoBlob(dataUrl)
  }

  return new Promise((ok, no) => {
    if (!file.type.match(/image.*/)) {
      no(new Error('Not an image'))
      return
    }

    reader.onload = (readerEvent) => {
      image.onload = () => ok(resizeSquare())
      image.src = readerEvent.target.result
    }

    reader.readAsDataURL(file)
  })
}

export default resizeImageSquare // uncomment once moved to resizeImage.js
// ------- till here - into ./src/plugins/image-resize.js -------
