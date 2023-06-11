// na každé 5 měření dole => 1 měření US senzoru 50 - 10 Hz reakcemi za sekundu
// nevolat digitalReadPin víckrát
radio.setGroup(112)

let s1 = new Servo(PCAmotor.Servos.S1, 550, 2700, 1650, 10)
let spidx = 0.5
let autoModeEnabled = true
let whiteLine = 0

const pinC = DigitalPin.P15
const pinL = DigitalPin.P14 // zkontrolovat piny
const pinR = DigitalPin.P13

pins.setPull(pinC, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)

s1.stop()

basic.forever(function () {
    if (autoModeEnabled) {
        let c = (whiteLine ^ pins.digitalReadPin(pinC)) == 0 ? false : true
        let l = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true
        let r = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true

        if (!l && !r) {
            forward()
            console.log("center")
        } else if (!l) {
            left()
            console.log("left")
        } else if (!r) {
            right()
            console.log("right")
        }
    }


    function forward() {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 100)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, -100)
    }

    function left() {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 69)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 0) // Adjust the right motor speed as needed
    }

    function right() {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 0) // Adjust the left motor speed as needed
        PCAmotor.MotorRun(PCAmotor.Motors.M4, -69)
    }
})
