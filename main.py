import network
import urequests
import machine
import time
from machine import Pin

# Configuration
SSID = "Kings College"
PASSWORD = "Empowerment"
SERVER_URL = "http://172.16.0.190:5000"

# Sensor pins
trig = Pin(12, Pin.OUT)  # Ultrasonic sensor trigger pin
echo = Pin(14, Pin.IN)   # Ultrasonic sensor echo pin
ir_sensor = Pin(27, Pin.IN)  # IR sensor pin

# Variables
jwt_token = ""
user_id = ""
user_points = 0
bottle_count = 0
can_count = 0

def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('Connecting to WiFi...')
        wlan.connect(SSID, PASSWORD)
        while not wlan.isconnected():
            pass
    print('Connected to WiFi')
    print('IP address:', wlan.ifconfig()[0])

def read_verification_code():
    verification_code = input("Enter verification code: ")
    return verification_code

def verify_user(verification_code):
    global jwt_token, user_id
    url = SERVER_URL + "/api/auth/verify-code"
    headers = {'Content-Type': 'application/json'}
    data = {'verificationCode': verification_code}
    try:
        response = urequests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            res = response.json()
            jwt_token = res['token']
            user_id = res['userId']
            print("Verified:", jwt_token, user_id)
            return True
        else:
            print("Verification failed")
            return False
    except Exception as e:
        print("Error verifying user:", e)
        return False

def select_option():
    selection = input("Select 'bottle' or 'can': ")
    return selection.strip().lower()

def measure_distance():
    trig.value(0)
    time.sleep_us(2)
    trig.value(1)
    time.sleep_us(10)
    trig.value(0)
    pulse = machine.time_pulse_us(echo, 1, 30000)  # Measure echo pulse duration
    distance = pulse * 0.0343 / 2  # Convert to distance in cm
    return distance

def update_deposits(bottles, cans):
    global user_points
    user_points += bottles * 2 + cans * 4
    url = SERVER_URL + "/api/user/update-deposits"
    headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt_token}
    data = {'userId': user_id, 'bottles': bottles, 'cans': cans, 'points': user_points}
    try:
        response = urequests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            print("Deposits updated:", response.json())
        else:
            print("Update failed")
    except Exception as e:
        print("Error updating deposits:", e)

def main():
    global bottle_count, can_count
    connect_wifi()
    while True:
        verification_code = read_verification_code()
        if verify_user(verification_code):
            selection = select_option()
            if selection not in ['bottle', 'can']:
                print("Invalid selection")
                continue

            print(f"Waiting for {selection} detection...")
            while True:
                if selection == 'can':
                    # Use ultrasonic sensor for can detection
                    distance = measure_distance()
                    print(f"Distance: {distance} cm")  # Debugging: Print distance
                    if distance < 10:  # Object detected within 10 cm
                        print("Can detected")
                        can_count += 1
                        update_deposits(0, 1)  # Update can count
                        break
                elif selection == 'bottle':
                    # Use IR sensor for bottle detection
                    ir_value = ir_sensor.value()
                    print(f"IR sensor value: {ir_value}")  # Debugging: Print IR sensor value
                    if ir_value ==0:  # Object detected (assuming IR sensor gives 0 when object is detected)
                        print("Bottle detected")
                        bottle_count += 1
                        update_deposits(1, 0)  # Update bottle count
                        break
                time.sleep(0.1)  # Small delay between sensor readings

if __name__ == "__main__":
    main()
