#
#      ______  _______________________  __
#     /  _/  |/  /_  __/ ____/ ____/ / / /
#     / // /|_/ / / / / __/ / /   / /_/ / 
#   _/ // /  / / / / / /___/ /___/ __  /  
#  /___/_/  /_/ /_/ /_____/\____/_/ /_/   
# 
#  Script para la validación de los segmentos del LCD
#  @ponchoceniceros
#  Mar 2022
#
import numpy as np, numpy.typing as npt
import cv2


class LCD:
  lcdJSON = {
    "lcd_coords": [(285, 194), (1656, 231), (1643, 810), (272, 787)],
  }

  def _orderPoints(self, pts: npt.ArrayLike) -> np.ndarray:
    rect = np.zeros((4, 2), dtype = "float32")
    s = pts.sum(axis = 1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    diff = np.diff(pts, axis = 1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect


  def _fourPointsTransform(self, image: npt.ArrayLike, pts: npt.ArrayLike) -> np.ndarray:
      rect = self._orderPoints(pts)
      (tl, tr, br, bl) = rect
      widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
      widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
      maxWidth = max(int(widthA), int(widthB))
      heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
      heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
      maxHeight = max(int(heightA), int(heightB))
      dst = np.array([
      [0, 0],
      [maxWidth - 1, 0],
      [maxWidth - 1, maxHeight - 1],
      [0, maxHeight - 1]], dtype = "float32")
      M = cv2.getPerspectiveTransform(rect, dst)
      warped= cv2.warpPerspective(image, M, (maxWidth, maxHeight))
      return warped


  def getLCD(self, img: npt.ArrayLike) -> np.ndarray:
      points = np.array(self.lcdJSON["lcd_coords"], dtype = "float32")
      return self._fourPointsTransform(img, points) 
