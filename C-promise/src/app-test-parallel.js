function timerPromisefy (delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(delay), delay)
  })
}

let startDate = Date.now()

// // promise.all()
// Promise.all([
//   timerPromisefy(1),
//   timerPromisefy(32),
//   timerPromisefy(64),
//   timerPromisefy(128)
// ]).then((val) => {
//   console.log(Date.now() - startDate + 'ms') // 約128ms
//   console.log(val) // [1,32,64,128]
// })


// // for循环
let doSth = (val) => {
  console.log('已过去', Date.now() - startDate + 'ms') // 約128ms
}
let tasks = [
  timerPromisefy(1000),
  timerPromisefy(2000),
  timerPromisefy(3000),
  timerPromisefy(4000)
]
let promise = Promise.resolve()
tasks.forEach(item => promise.then(() => item).then(doSth))