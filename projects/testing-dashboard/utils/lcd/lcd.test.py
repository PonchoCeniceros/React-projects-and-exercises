import sys
import cv2
from picamera import PiCamera

def checkSegments(camera: PiCamera, comPath: str) -> bool:
    camera.start_preview()
    camera.capture(f"img/{comPath}.png")
    imgLcd = cv2.imread(f"img/{comPath}.png")
    #
    # Procesamiento de la imagen tomada
    # #
    imgLcd = cv2.cvtColor(imgLcd, cv2.COLOR_BGR2GRAY)
    imgLcd = cv2.GaussianBlur(imgLcd, (9, 9), 7)
    imgLcd = cv2.adaptiveThreshold(imgLcd, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 27, 4)
    # #
    # Procesamiento END
    #
    cv2.imshow('image', imgLcd)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    return True

camera = PiCamera()
ans = checkSegments(camera, "TEST")
print(ans)
sys.stdout.flush()
