#######################################################
from PIL import Image
import tkinter
import pytesseract
import cv2
import requests

def desenhaContornos(contornos, imagem):
    for c in contornos:
        perimetro = cv2.arcLength(c, True)
        if perimetro > 200 and perimetro < 600:
           approx = cv2.approxPolyDP(c, 0.03 * perimetro, True)
           if len(approx) == 4:
                (x, y, lar, alt) = cv2.boundingRect(c)
                cv2.rectangle(imagem, (x, y), (x + lar, y + alt), (0, 255, 0), 2)
                roi = imagem[(y + 15):y + alt, x:x + lar]
                cv2.imwrite("C:/Tesseract-OCR/saidas/roi.jpg", roi)

    return imagem


def reconhecimentoOCR():
    entrada = cv2.imread("C:/Tesseract-OCR/saidas/roi.jpg")
    cv2.imshow("ENTRADA", entrada)
    img = cv2.resize(entrada, None, fx=4, fy=4, interpolation=cv2.INTER_CUBIC)

    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    cv2.imshow("Escala Cinza", img)
    ret, img = cv2.threshold(img, 70, 255, cv2.THRESH_BINARY)

    cv2.imshow("Limiar", img)
    img = cv2.GaussianBlur(img, (5, 5), 0)
    cv2.imshow("Desfoque", img)

    # Aplica reconhecimento ROI Tesseract
    cv2.imwrite("C:/Tesseract-OCR/saidas/roi-ocr.jpg", img)
    imagem = Image.open("C:/Tesseract-OCR/saidas/roi-ocr.jpg")
    saida = pytesseract.image_to_string(imagem, lang='eng')

    if len(saida) > 0:
        placa = removerChars(saida)
        id = "1"
        response = requests.post("http://localhost:8080/Estacionamento_Automatizado/rest/checkinRest/addCheckin/" + placa + "&" + id)
        response = requests.post("http://localhost:8080/Estacionamento_Automatizado/rest/checkoutRest/addCheckout/"+placa+"&"+id)
        print(response.status_code)
        print('Placa:' + placa)
    else:
        texto = "Reconhecimento Falhou"

    janela = tkinter.Tk()
    tkinter.Label(janela, text=placa, font=("Helvetica", 50)).pack()
    janela.mainloop()


def buscaRetanguloPlaca(source):

    video = cv2.VideoCapture(source)
    while (video.isOpened()):

        ret, frame = video.read()
        if (ret == False):
            break

        area = frame[500:, 300:800]
        # area = frame[350:, 220:500]

        # escala de cinza
        img_result = cv2.cvtColor(area, cv2.COLOR_BGR2GRAY)

        # limiarização
        ret, img_result = cv2.threshold(img_result, 90, 255, cv2.THRESH_BINARY)

        # desfoque
        img_result = cv2.GaussianBlur(img_result, (5, 5), 0)

        # lista os contornos
        img, contornos, hier = cv2.findContours(img_result, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

        # limite horizontal
        cv2.line(frame, (0, 500), (1280, 500), (0, 0, 255), 1)
        # limite vertical 1
        cv2.line(frame, (300, 0), (300, 720), (0, 0, 255), 1)
        # limite vertical 2
        cv2.line(frame, (800, 0), (800, 720), (0, 0, 255), 1)

        cv2.imshow('FRAME', frame)
        desenhaContornos(contornos, area)
        cv2.imshow('RES', area)

        if cv2.waitKey(1) & 0xff == ord('q'):
            break

    video.release()
    cv2.destroyAllWindows()
    reconhecimentoOCR()

def removerChars(text):
    str = "!@#%¨&*()_+:;><^^}{`?|~¬/=,.'ºª»'\n \s+ "
    for x in str:
        text = text.replace(x, '')

    return text

if __name__ == "__main__":
    source = "resource/video1-480p.mp4"
    sourceHD = "resource/video1-720p.mkv"
    sourceImg = "C:/Tesseract-OCR/saidas/roi-ocr.jpg"
    source23 = 'rtsp://192.168.100.3:8080/h264_pcm.sdp'
    buscaRetanguloPlaca(sourceHD)