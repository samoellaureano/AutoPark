package br.com.reconhecimentoImagem.main;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfInt;
import org.opencv.core.Size;
import org.opencv.highgui.HighGui;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

public class Decomposicao {
	//tesseract.exe C:\Users\Felipe\Documents\GitHub\TCC\ReconhecimentoDeImagem\placa2.png C:\Users\Felipe\Documents\GitHub\TCC\ReconhecimentoDeImagem\out  --dpi 200
	private static int eixoX=0;

	public static void main(String[] args) {
		// TODO Auto-generated method stub


		System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

		String localImg="C:\\Users\\Felipe\\Documents\\GitHub\\TCC\\ReconhecimentoDeImagem\\src\\placa1.jpg";
		String localImg1="C:\\Users\\Felipe\\Documents\\GitHub\\TCC\\ReconhecimentoDeImagem\\src\\placa2.jpg";
		String localImg2="C:\\Users\\Felipe\\Documents\\GitHub\\TCC\\ReconhecimentoDeImagem\\src\\placa4.jpg";

		Mat img = Imgcodecs.imread(localImg1);
		
		Imgproc.cvtColor(img, img, Imgproc.COLOR_BGR2GRAY);		 
	//	Imgproc.medianBlur(img, img, 3);
	//	Imgproc.GaussianBlur(img, img, new Size(5,5),5);		
	//	Imgproc.medianBlur(img, img, 5);
	 // Imgproc.equalizeHist(img2, img2);
		
	 // Imgproc.resize(img2,img2,new Size(300,300));
		
		
		
	//	Imgproc.cvtColor(img, img, Imgproc.COLOR_RGB2GRAY, 0);
		
	//	 Imgproc.medianBlur(img, img,1);
		 Imgproc.GaussianBlur(img, img, new Size(0,0),0.5);		
		 Imgproc.GaussianBlur(img, img, new Size(1,1),1);
		 Core.addWeighted(img, 1.5, img, -0.51, 0, img);
		
		Imgproc.threshold(img,img,64,255,Imgproc.THRESH_BINARY);
		Imgproc.adaptiveThreshold(img, img, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY,3,3);	
	// Imgproc.erode(img, img, new Mat());
		Imgproc.GaussianBlur(img, img, new Size(0,0),0.5);
	//	Imgproc.adaptiveThreshold(img, img, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY,11,11);
		Imgproc.GaussianBlur(img, img, new Size(1,1),1);
		Imgproc.medianBlur(img, img, 1);
		Imgproc.adaptiveThreshold(img, img, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY,11,11);
		Mat structImage = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new Size(2,1));
	//	Imgproc.erode(img, img, structImage);
		Mat structImage2 = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new Size(1,1));
		Imgproc.dilate(img, img, structImage);
		Imgproc.erode(img, img, structImage2);
		Imgcodecs.imwrite("placa2.png",img );		
		
		mostraImg(img, "Imagem");
				
		 File imageFile = new File("C:\\Users\\Felipe\\Documents\\GitHub\\TCC\\ReconhecimentoDeImagem\\placa2.png");
	     ITesseract instance = new Tesseract();  // JNA Interface Mapping
	     instance.setDatapath("C:\\Users\\Felipe\\Desktop\\tesseractOcr\\workspace\\TesteOCR\\tessdata");

	        try {
	            String result = instance.doOCR(imageFile);
	            System.out.println("resultado:"+result);
	        } catch (TesseractException e) {
	            System.err.println(e.getMessage());
	        }		

		HighGui.waitKey();
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
}
