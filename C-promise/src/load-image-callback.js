// load-image-callback.js
export default function loadImage(url, callback) {
  let image = new Image
  image.src = url

  image.onload = () => callback(null, image)
  image.onerror = () => callback(new Error(`could not load image at ${url}`))

}