class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    greet(msg: string):string {
       return msg + ' ' + this.greeting;
    }
}

export default Greeter;