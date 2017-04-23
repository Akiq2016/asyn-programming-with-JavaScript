import loadImageCallback from './load-image-callback'

console.log('callback version!')

let addImg = img => document.body.appendChild(img)

loadImageCallback('images/cat1.gif', (err, img1) => {
  if(err) throw err
  addImg(img1)
  loadImageCallback('images/cat2.gif', (err, img2) => {
    if(err) throw err
    addImg(img2)
    loadImageCallback('images/cat3.gif', (err, img3) => {
      if(err) throw err
      addImg(img3)
    })
  })
})