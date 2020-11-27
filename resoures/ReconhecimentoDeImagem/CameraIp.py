
import cv2

cap = cv2.VideoCapture("rtsp://192.168.100.3:8080/h264_ulaw.sdp")
while True:
    try:
        _, img = cap.read()
        cv2.imshow("camera", img)
        key = cv2.waitKey(1)
        if key & 0xFF == ord('q'):
            break
        pass
    except Exception as e:
        print(e)