
//eslint-disable-next-line import/no-anonymous-default-export

const workerCode = () => {
    let timer;
    let counter; 
    //eslint-disable-next-line no-restricted-globals
    self.onmessage = function (event) {
        console.log(event.data)

        if (event.data === 'start' || event.data === 'stop') {
            clearInterval(timer);
            counter = 0; 
        }

        if (event.data === "start") {
            timer = setInterval(() => {
                counter++;
                postMessage(counter);
            }, 1000)
        }
    }
};

let code = workerCode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker = URL.createObjectURL(blob);

export default worker