// 新建对象就开始跑代码了
        function loadImagePromise(s) {
            let letime = s * 1000;
            return new Promise(function (resolve, reject) {
                console.log("Promise" + s + " start :" + Date.parse(new Date()));
                setTimeout(resolve.bind(null, letime), letime);
            });
        }

        function addImg(e) {
            console.log(e + "this is ok :" + Date.parse(new Date()));
        }

        // 这个是运行完一个接着一个
        // 主要原因是新建的Promise对象的顺序不同,区别在 相对于 act2
        // 这里面的阻塞原理是 then的执行顺序 ,如果返回 Resolved状态的Promise,就会执行下一个回调。
        // 但Pending状态的Promise 会等待其变成Resolved状态 才执行下一回调
        function act1() {
            Promise.resolve()
                    .then(() => loadImagePromise(3)).then(addImg)
                    .then(() => loadImagePromise(2)).then(addImg)
                    .then(() => loadImagePromise(1)).then(addImg)
                    .catch(err => console.log(err))
        }

        // 这个是一开始就全部开始运行,但是会阻塞,按照代码执行顺序去阻塞,而不是按照运行时间
        // 这个时间是指Promise 变成 Resolved状态 的时间,例如本例中的1,2,3 时间 ,表示p1,p2,p3 到变成Resolved状态所需时间
        // 换句话说就是这里面的运行时间 约等于 最迟 变成Resolved状态的时间
        // 这个代码执行顺序是指 act1 说的执行顺序
        function act2() {
            let p1m = 3, p2m = 2, p3m = 1;
//            let p1m=1,p2m=2,p3m=3;
            let p1 = new Promise(function (resolve, reject) {
                console.log("Promise" + p1m + " start :" + Date.parse(new Date()));
                setTimeout(resolve.bind(null, p1m * 1000), p1m * 1000);
            });

            let p2 = new Promise(function (resolve, reject) {
                console.log("Promise" + p2m + " start :" + Date.parse(new Date()));
                setTimeout(resolve.bind(null, p2m * 1000), p2m * 1000);
            });

            let p3 = new Promise(function (resolve, reject) {
                console.log("Promise" + p3m + " start :" + Date.parse(new Date()));
                setTimeout(resolve.bind(null, p3m * 1000), p3m * 1000);
            });


            Promise.resolve()
                    .then(x => p1).then(addImg)
                    .then(x => p2).then(addImg)
                    .then(x => p3).then(addImg)
                    .catch(err => console.log(err))
        }


        //这个是一开始就全部开始运行,但是会阻塞,按照代码执行顺序去阻塞,而不是按照运行时间
        //这个 和 act2 一样,但和 act1 不一样
        function act3() {
            let tasks = [
                () =>loadImagePromise(3),//(3)
                () =>loadImagePromise(2),//(2)
                () =>loadImagePromise(1)//(1)
            ]
            tasks.reduce((promise, item) => {
                return promise.then(item).then(addImg)
            }, Promise.resolve())
        }

        // 这个是一开始就全部开始运行,但是会阻塞,按照运行时间去阻塞,而不是按照代码执行顺序
        // 这个时间是指Promise列表中最迟变成Resolved状态的时间,例如本例中的3为最迟时间阻塞,3秒后才运行 then 回调
        // 这个 代码执行顺序是指 新建Promise对象,就是数组的顺序,没什么特别的
        function act4() {
            Promise.all([
                loadImagePromise(1),
                loadImagePromise(2),
                loadImagePromise(3)
            ]).then(imgs => imgs.forEach(addImg))
        }

        //异步,,不阻塞,谁先完成谁就执行他的回调函数
        function act5(){
            [1,2,3].forEach(t => loadImagePromise(t).then(addImg));
        }


//        act1();
        act2();
//        act3();
//        act4();
//        act5();