from PIL import Image
import tkinter
import pytesseract
import cv2
import json
import requests

def localizarPlaca(contornos, imagem):
    for c in contornos:
        perimetro = cv2.arcLength(c, True)
        if 600 < perimetro < 870:
            approx = cv2.approxPolyDP(c, 0.03 * perimetro, True)
            if len(approx) == 4:

                (x, y, lar, alt) = cv2.boundingRect(c)
                if alt < lar:
                    cv2.rectangle(imagem, (x, y), (x + lar, y + alt+20), (0, 255, 0), 1)
                    roi = imagem[y:y + alt, x:x + lar]
                    cv2.imwrite("C:/Tesseract-OCR/saidas/placa.jpg", roi)

    return imagem


def reconhecimentoImagem(path_img):
    print("reconhecimento da placa")

    img = cv2.imread(path_img)
    cv2.imshow("ENTRADA", img)

    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    cv2.imshow("Escala Cinza", img)

    img = cv2.GaussianBlur(img, (5, 5), 0)
    cv2.imshow("Desfoque", img)

    ret, img = cv2.threshold(img, 80, 255, cv2.THRESH_BINARY)
    cv2.imshow("Limiar", img)

    cv2.imwrite(path_img + "-ocr.jpg", img)
    imagem = Image.open(path_img + "-ocr.jpg")
    saida = pytesseract.image_to_string(imagem, lang='eng')
    if len(saida) > 0:
        #print(saida)
        texto = removerChars(saida)
    else:
        texto = "Reconhecimento Falho"

    janela = tkinter.Tk()
    print(texto)
    id = "1"

    #response = requests.post("http://localhost:8080/Estacionamento_Automatizado/rest/checkinRest/addCheckin/" + texto + "&" + id)
    #response = requests.post("http://localhost:8080/Estacionamento_Automatizado/rest/checkoutRest/addCheckout/" + texto + "&" + id)

    #print(response.status_code)

    tkinter.Label(janela, text=texto, font=("Helvetica", 50)).pack()
    janela.mainloop()


def removerChars(text):
    str = "'[‘-]!@#%¨&*()_+:;><^^}{`?|~¬/=,.-'ºª»'\n \s+    °——————eagonmmmntrrbivcud"
    for x in str:
        text = text.replace(x, '')
    text = text.replace(str, '')

    return text


video = cv2.VideoCapture('resource\\RAE1151.mp4')

while video.isOpened():
    #print("Video rodando")
    ret, frame = video.read()

    if not ret:
        break

    area = frame[400:, 200:900]
    result = cv2.cvtColor(area, cv2.COLOR_BGR2GRAY)
    result = cv2.GaussianBlur(result, (5, 5), 0)
    ret, result = cv2.threshold(result, 110, 170, cv2.THRESH_BINARY)

    img, contornos, hier = cv2.findContours(result, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

    cv2.line(frame, (0, 200), (1880, 200), (0, 0, 255), 1)
    cv2.line(frame, (200, 0), (200, 1200), (0, 0, 255), 1)
    cv2.line(frame, (900, 0), (900, 1200), (0, 0, 255), 1)

    cv2.imshow('FRAME', frame)
    cv2.imshow('RES', area)
    cv2.imshow("Proc", result)
    localizarPlaca(contornos, area)


    if cv2.waitKey(1) & 0xff == ord('q'):
        break

video.release()
caminho = "C:\Tesseract-OCR\saidas\placa.jpg"
reconhecimentoImagem(caminho)
