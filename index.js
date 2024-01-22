// Practise callback and promise on(22/01/2024)


// // synchronous call
function add(a,b){
    return a+b;
}

console.log(add(5,10));



// -------------------------------------------------------------------------------------------------------------------------------------------------


// // Asynchoronous call
function asynadd(a,b,callback){
    setTimeout(()=>{
        callback(a+b);
    },3000)
};

asynadd(10,10,(sum)=>{
    console.log(sum);
})

// Calling two asynchrounous function by using nested callbacks



// -------------------------------------------------------------------------------------------------------------------------------------------------



// write a function which has to call 2 different callback functions. The response of first function should be passed to second function and response of second function should be returned as response

function asynadd(a,b,callback){
    setTimeout(()=>{
        callback(a+b);
    })
}

function asynsquare(a,callback){
    setTimeout(()=>{
        callback(a*a);
    })
}

function calling_asynchronous(a,b){
    asynadd(a,b,(sum)=>{
        console.log(sum)
        asynsquare(sum,(square)=>{
            console.log(square)
        })
    })
}

calling_asynchronous(5,5);


// ------------------------------------------------------------------------------------------------------------------------------------------------


// Converting the above callbak function into promise.
function asynadd(a,b){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b);
        },3000)
    })
}

function asynsquare(num){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
                resolve(num*num);
        },3000)
    })
}

function call_asyn_promise(a,b){
    asynadd(a,b).then((sum)=>{
        console.log(sum)
        asynsquare(sum).then((square)=>{
            console.log(square)
        })
    })
}

call_asyn_promise(5,5)




// // Promise with the error handling in the .then() without the .catch() method
function trialadd(a,b){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Hi,Hello how are you!");
        },3000)


    })
}


function test(a,b){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject("This is the reject block of code");
        },3000)
    })
}


trialadd(10,20).then(
    (sucess_callback)=>{ console.log(sucess_callback) },
    (reject_callback)=>{
    console.log(reject_callback)
})
.then(()=>{test(10,20).then(
    (sucess_callback)=>{console.log(sucess_callback)},
    (reject_callback)=>{
    console.log(reject_callback)
})
});



// -------------------------------------------------------------------------------------------------------------------------------------------

function execfunction(resolve,reject){
    reject("This function is working");
}

const promiseA=new Promise(execfunction);
promiseA.then(()=>console.log("It's_Promise_A"),
()=>{console.log("Error_in_Promise_A")})
const promiseB=promiseA.then(()=>console.log("Hello_it's_Promise_B"),
()=>console.log("Error_in_Prmise_B"));
const promiseC=promiseA.then(()=>console.log("Promise_C"),
()=>console.log("Error_in_Promise_C"))


// -----------------------------------------------------------------------------------------------------------------------------------------------
// Thenable

const aThenable={
    then(onFullfilled,onRejected){
        onFullfilled({
            then(onFullfilled,onRejected){
                onFullfilled("This is an example of an Thenable object");
            }
        })
    }
}
  
const promise=Promise.resolve(aThenable);
promise.then((result)=>console.log(result));


// ---------------------------------------------------------------------------------------------------------------------------------------------

// // GITHUB PROJECT
function asyn_add(a,b,callback){
    setTimeout(()=>{callback(a+b);},1000)
}

function asyn_mul(a,callback){
    setTimeout(()=>{callback(a*a);},1000)
}

function call_asyn_callbacks(a,b,callback){
    asyn_add(a,b,(sum)=>{
        asyn_mul(sum,(result)=>{
            callback(result);
        })
    })
}

call_asyn_callbacks(5,5,(result)=>{
    console.log("The response is",result);
})


// -----------------------------------------------------------------------------------------------------------------------------------------------

// GITHUB PROJECT PROMISES

function asyn_add(a,b){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve(a+b);},3000);
    })
}

function asyn_mul(a){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve(a*a);},3000);
    })
}

function call_asyn_promise(a){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve(a);},3000);
    })
}

asyn_add(5,5).then((sum)=>{
    console.log(sum);
    return asyn_mul(sum);
})
.then((result)=>{
    console.log(result);
    return call_asyn_promise(result);
})
.then((result)=>{
    console.log("The Final Response is:",result);
})
