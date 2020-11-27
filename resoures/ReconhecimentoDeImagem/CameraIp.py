import urllib
import cv2
import numpy as np


cap = cv2.VideoCapture("rtsp://192.168.100.3:8080/h264_ulaw.sdp")
while True:
    try:
        _, frame = cap.read()
        cv2.imshow("camera", frame)
        key = cv2.waitKey(1)
        if key & 0xFF == ord('q'):
            break
        pass
    except Exception as e:
        print(e)