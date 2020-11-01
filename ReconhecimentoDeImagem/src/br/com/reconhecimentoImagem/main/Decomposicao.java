package br.com.reconhecimentoImagem.main;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfInt;
import org.opencv.core.MatOfPoint;
import org.opencv.core.MatOfPoint2f;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.highgui.HighGui;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.video.Video;
import org.opencv.videoio.VideoCapture;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

public class Decomposicao {
	//tesseract.exe C:\Users\Felipe\Documents\GitHub\TCC\ReconhecimentoDeImagem\placa2.png C:\Users\Felipe\Documents\GitHub\TCC\ReconhecimentoDeImagem\out  --dpi 200
	private static int eixoX=0;

	public static void main(String[] args) {
		// TODO Auto-generated method stub


		System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
	
		String source = "resource/video1-480p.mp4";
		String sourceHD = "resource/video1-720p.mkv";
		String sourceImg = "C:/Tesseract-OCR/saidas/roi-ocr.jpg";
		buscaRetanguloPlaca(sourceHD);
		
		
		

		mostraImg(img, "Imagem");

		File imageFile = new File("C:\\Users\\Felipe\\Documents\\GitHub\\TCC\\ReconhecimentoDeImagem\\placa2.png");
		ITesseract instance = new Tesseract();  // JNA Interface Mapping
		instance.setDatapath("C:\\Users\\Felipe\\Desktop\\tesseractOcr\\workspace\\TesteOCR\\tessdata");

		try {
			String result = instance.doOCR(imageFile);
			System.out.println("resultado:"+result);
		}catch (TesseractException e) {
			System.err.println(e.getMessage());
		}		

		HighGui.waitKey();

	}

	private static void buscaRetanguloPlaca(String sourceHD) {
	
		
		
		
		
	}

	private static String lerArquivo(String caminhoDoArquivo) throws IOException {
		String placa="";

		BufferedReader leitor = null;
		try {

			leitor = new BufferedReader(new FileReader(caminhoDoArquivo));
			while(leitor.ready()){
				placa += leitor.readLine() + "\n";
			}			
			leitor.close();		    
			placa = placa.replaceAll("[^0-9a-zA-Z-]","");

		} catch (Exception e) {
			// TODO: handle exception
		}		
		//leitor.close();
		return placa;
	}

	public static void mostraImg(Mat img, String titulo){			

		HighGui.namedWindow(titulo, HighGui.WINDOW_AUTOSIZE);
		HighGui.resizeWindow(titulo, 500, 500); 				
		HighGui.moveWindow(titulo, eixoX, 0);	 				
		eixoX=eixoX+250; 										
		HighGui.imshow(titulo, img);
    }
	
	
	

	
	@SuppressWarnings("unchecked") // verificar a forma defazer para recortar a imagem grava
	public Mat localizaPlaca(List<MatOfPoint2f>contornos,Mat img){
		double perimetro=0;
		MatOfPoint2f aprox =null;
		Mat imgRoi = new Mat();
		for (MatOfPoint2f matOfPoint : contornos){
			
			aprox=new MatOfPoint2f();
			perimetro = Imgproc.arcLength(matOfPoint,true);
			
			if(perimetro>200 && perimetro<600) {
				
				Imgproc.approxPolyDP(matOfPoint,aprox, 0.03*perimetro, true);
				
				if(aprox.total()==4){
					
					Imgproc.drawContours(img, (List<MatOfPoint>) matOfPoint, -1, new Scalar(0, 255,0),2);
					Rect pontos = Imgproc.boundingRect(matOfPoint);
					Imgproc.rectangle(img,pontos.br(),pontos.tl(), new Scalar(0, 255,0),2);					
					imgRoi=matOfPoint;
					break;
				}
			}		
		}
		
		Imgcodecs.imwrite("placa2.png", imgRoi);
		return imgRoi; 
	}
	
	
	
	
	
	
}
