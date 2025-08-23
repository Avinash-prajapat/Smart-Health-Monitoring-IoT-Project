from flask import Flask, jsonify
import serial  # For Arduino

app = Flask(__name__)

# Arduino setup (replace COM3 with your Arduino port)
arduino = serial.Serial('COM3', 9600, timeout=1)

@app.route('/data')
def get_data():
    try:
        arduino.write(b'READ\n')  # Arduino ko data bhejne ka signal
        line = arduino.readline().decode('utf-8').strip()
        # Example: Arduino sends "37,82,95,55,0" (temp,heart,oxygen,humidity,fall)
        temp, heart, oxygen, humidity, fall = map(float, line.split(','))
        return jsonify({
            "temperature": temp,
            "heartRate": heart,
            "oxygen": oxygen,
            "humidity": humidity,
            "fall": bool(fall)
        })
    except:
        return jsonify({"error": "Arduino data not available"})
    
if __name__ == '__main__':
    app.run(debug=True)
