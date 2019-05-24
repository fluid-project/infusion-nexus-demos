# Calibrating the Atlas Scientific pH Sensor

See: https://www.atlas-scientific.com/_files/_datasheets/_circuit/pH_EZO_Datasheet.pdf

Make a serial connection to the sensor (for example using `picocom` on Linux):

    $ picocom -b 9600 --echo --imap crcrlf --omap ignlf /dev/ttyUSB0

Turn on Continuous reading:

    C,1

Calibrating using the supplied Atlas Scientific calibration solutions: 4.00, 7.00, 10.00

1. Rinse the probe
1. Sit in the 7.00 solution until stable
1. `C,0` (turn continuous reading off)
1. `Cal,mid,7.00`
1. `C,1` (turn continuous reading on)
1. Rinse the probe
1. Sit in the 4.00 solution until stable
1. `C,0`
1. `Cal,low,4.00`
1. `C,1`
1. Rinse the probe
1. Sit in the 10.00 solution until stable
1. `C,0`
1. Cal,high,10.00
1. `C,1`
