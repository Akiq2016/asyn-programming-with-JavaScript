import loadImagePromise from './load-image-promise'

console.log('promise version! - parallel one')

let addImg = img => document.body.appendChild(img)

Promise
  .all([
    loadImagePromise('../images/cat1.gif'),
    loadImagePromise('../images/cat2.gif'),
    loadImagePromise('../images/cat3.gif')
  ])
  .then(imgs => imgs.forEach(addImg))
  .catch(err => console.log(err))