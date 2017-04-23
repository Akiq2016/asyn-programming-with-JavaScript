// load-image-promise.js
export default function loadImage(url, callback) {
  return new Promise((resolve, reject) => {

    let image = new Image
    image.src = url

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`could not load image at ${url}`))

  })
}