package br.com.reconhecimentoImagem.main;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.pdfbox.jbig2.segments.TextRegion;
import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfInt;
import org.opencv.core.MatOfPoint;
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
	//	
		
		Imgproc.medianBlur(img, img,5);
		Imgproc.blur(img, img,new Size(1,3));
		
		Imgproc.boxFilter(img, img, Imgproc.ADAPTIVE_THRESH_MEAN_C, new Size(2,2));
		Imgproc.equalizeHist(img, img);
		Imgproc.Canny(img, img, Imgproc.THRESH_OTSU, Imgproc.THRESH_BINARY_INV);
	 // Imgproc.resize(img2,img2,new Size(300,300));
		
		
		
	//	Imgproc.cvtColor(img, img, Imgproc.COLOR_RGB2GRAY, 0);
		
	//	 
	//	 Imgproc.GaussianBlur(img, img, new Size(0,0),0.5);		
		//Imgproc.GaussianBlur(img, img, new Size(1,1),1);
		 //Core.addWeighted(img, 1.37, img, -0.75, 0, img);		
		 //Imgproc.threshold(img,img,100,255,1);
	     //Imgproc.adaptiveThreshold(img, img, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY,3,3);
		
	//	Imgproc.adaptiveThreshold(img, img, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY,3,3);	
	//	Imgproc.GaussianBlur(img, img, new Size(1,1),1);
	   // Imgproc.erode(img, img, new Mat());
		/*	
		Imgproc.medianBlur(img, img, 1);
		
		Mat structImage = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new Size(1,1));
		Imgproc.erode(img, img, structImage);
		Mat structImage2 = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new Size(1,1));
		Imgproc.dilate(img, img, structImage2);
	//	Imgproc.erode(img, img, structImage2);
		
		// Imgproc.erode(img, img, structImage2);
		Mat hierarchy = new Mat();
		Mat image = img.clone();
		List<MatOfPoint> contours = new ArrayList<MatOfPoint>();
		Imgproc.findContours(image, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE);
		
		*/
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
