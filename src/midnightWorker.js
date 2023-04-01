//Worker receives one message, a number containing the ammount of time until next iteration 
//Once its reached, the worker stops and awaits a new number to compute 

//eslint-disable-next-line import/no-anonymous-default-export
const workerCode = () => {
    let timer;
    //eslint-disable-next-line no-restricted-globals
    self.onmessage = function (event) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            postMessage("It's midnight");
        }, event.data)

    }
};

let code = workerCode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker = URL.createObjectURL(blob);

export default worker;