const durationInput = document.querySelector("#duration");
const startB = document.querySelector("#start");
const pauseB = document.querySelector("#pause");
const circle = document.querySelector('circle');


// const cx = circle.setAttribute('cx', window.innerWidth / 2);
// const cy = circle.setAttribute('cy', window.innerHeight / 2);
const radius = circle.getAttribute('r');
const circumference =  2 * radius * Math.PI;
circle.setAttribute('stroke-dasharray', circumference);

let duration;

let timer = new Timer(durationInput, startB, pauseB, {
    onStart(totalDuration) {
        duration = totalDuration;
    },
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset', 
            circumference * timeRemaining / duration - circumference
        )
    },
    onComplete() {
        alert('Timer Finished!');
        alert('Click on the input to add new values');
        durationInput.value = '0'
    }
});