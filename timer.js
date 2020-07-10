class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart,
            this.onTick = callbacks.onTick,
            this.onComplete = callbacks.onComplete
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }
    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick, 50);
        disable(this.startButton);
        enable(this.pauseButton)
    }

    pause = () => {
        clearInterval(this.interval);
        disable(this.pauseButton);
        enable(this.startButton);
    }

    tick = () => {
        if (this.timeRemaining === 0) {
            this.pause();
            // putting " this.onTick " & " this.onComplete " in an if statement is important
            // beacuse callbacks here in this case are optional and if they are not provided and
            // we call this.onTick it will throw an error and crash our app
            if (this.onComplete) {
                // enable(this.startButton);
                // enable(this.pauseButton);
                this.onComplete();
            }
        }
        
         else {
            if (this.timeRemaining < 5) {
                document.querySelector('circle').setAttribute('stroke', 'red')
            } else {
                document.querySelector('circle').setAttribute('stroke', 'navy')
            }
            this.timeRemaining = this.timeRemaining - 0.05;
            if(this.onTick) {
                this.onTick(this.timeRemaining)
            }
        }
    }

    get timeRemaining() {
        return parseFloat(durationInput.value)
    }

    set timeRemaining(time) {
        durationInput.value = time.toFixed(2);
    }

}

const disable = (element) => { 
    element.setAttribute("disabled","") 
};
const enable = (element) => { 
    element.removeAttribute("disabled")
}