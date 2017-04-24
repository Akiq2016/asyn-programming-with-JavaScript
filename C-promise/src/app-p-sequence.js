import loadImagePromise from './load-image-promise'

console.log('promise version! - sequence one')

let addImg = img => document.body.appendChild(img)

// Promise
//   .resolve()
//   .then(() => loadImagePromise('images/cat1.gif')).then(addImg)
//   .then(() => loadImagePromise('images/cat2.gif')).then(addImg)
//   .then(() => loadImagePromise('images/cat3.gif')).then(addImg)

let tasks = [
  loadImagePromise('images/cat1.gif'),
  loadImagePromise('images/cat2.gif'),
  loadImagePromise('images/cat3.gif')
]

tasks.reduce((promise, item) => {
  return promise.then(() => item).then(addImg)
}, Promise.resolve())