package br.com.reconhecimentoImagem.main;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.Size;
import org.opencv.highgui.HighGui;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

public class Decomposicao {
//tesseract.exe C:\Users\Felipe\Documents\GitHub\TCC\ReconhecimentoDeImagem\placa2.png C:\Users\Felipe\Documents\GitHub\TCC\ReconhecimentoDeImagem\out  --dpi 200
	private static int eixoX=0;

	public static void main(String[] args) {
		// TODO Auto-generated method stub


		System.loadLibrary(Core.NATIVE_LIBRARY_NAME);		     

		String localImg="C:\\Users\\Felipe\\Documents\\GitHub\\TCC\\ReconhecimentoDeImagem\\src\\placa2.jpg";


		/*A classe Mat representa um arranjo numérico denso e único canal ou multicanal n-dimensional. 
		 * Pode ser usado para armazenar vetores e matrizes reais ou complexos, imagens em escala de cinza ou em cores. 
		 */

		Mat img2 = Imgcodecs.imread(localImg);	
		mostraImg(img2,"Placa_normal"); 
		Imgproc.cvtColor(img2, img2, Imgproc.COLOR_BGR2GRAY);
		Imgproc.equalizeHist(img2, img2);
		

		/* O filtro Gaussiano geralmente é usado como um filtro de passa-baixa por deixar passar 
		 * as baixas frequências, mas elimina os valores relacionados às altas frequência.  
		 * Neste filtro, assim como em outros, a suavização da imagem é realizada através da 
		 * substituição de cada pixel pela média ponderada dos pixels vizinhos. 
		 */

		Mat imgGauss = new Mat();				      
		Imgproc.GaussianBlur(img2, imgGauss, new Size(5,5),3);			    
		Imgproc.adaptiveThreshold(imgGauss, imgGauss, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY,7,5);
		mostraImg(imgGauss,"Gauss");
		
		Mat imgblur = new Mat();
		Imgproc.blur(img2, imgblur, new Size(5,5));
		Imgproc.adaptiveThreshold(imgblur, imgblur, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY,7,7);
		Imgproc.adaptiveThreshold(imgblur, imgblur, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY_INV,5,5);
		
		mostraImg(imgblur,"Blur");

		/*Filtro da Mediana: Eficiente para o propósito de filtrar imagens, pois ele reduz a quantidade de variação de
	      intensidade entre um pixel e seus vizinhos, eliminando ruídos.*/

		Mat imgMediana = new Mat();
		Imgproc.blur(img2, imgMediana, new Size(5,5));
		Imgproc.medianBlur(imgMediana, imgMediana,5);			     	      
		Imgproc.adaptiveThreshold(imgMediana, imgMediana, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY,7,7);
		//Imgproc.adaptiveThreshold(imgMediana, imgMediana, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY_INV,5,5);				      
		Imgproc.resize(imgMediana,imgMediana,new Size(118,118));
		
		Imgcodecs.imwrite("placa2.png",imgGauss );
		
		mostraImg(imgMediana,"Mediana");

		Mat suavCombinada = new Mat();
		Imgproc.medianBlur(img2, suavCombinada,7);
		Imgproc.GaussianBlur(suavCombinada, suavCombinada, new Size(3,3),5);
		Imgproc.medianBlur(suavCombinada, suavCombinada,7);			     
		Imgproc.adaptiveThreshold(suavCombinada, suavCombinada, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY,7,7);
		Imgproc.adaptiveThreshold(suavCombinada, suavCombinada, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY_INV,5,5);	

	mostraImg(suavCombinada,"Gaussian + Mediana");

	HighGui.waitKey();	// sempre será a ultima linha do codico para mostra as janelas...
		/*
		try {
			Process aaa = new ProcessBuilder("C:\\Program Files (x86)\\Tesseract-OCR\\tesseract.exe "+
					" C:\\Users\\Felipe\\Documents\\GitHub\\workspace\\ReconhecimentoDeImagem\\src\\placa2.jpg  C:\\Users\\Felipe\\Pictures\\out").start();
			
			String texto = lerArquivo("C:\\Users\\Felipe\\Pictures\\out");
			
			System.out.println(texto);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	*/
	}      

	private static String lerArquivo(String caminhoDoArquivo) throws IOException {
		String textoconvertido="";
		
		BufferedReader leitor = null;
		
		try {
					
			leitor = new BufferedReader(new FileReader(caminhoDoArquivo));
			caminhoDoArquivo = leitor.readLine();
			leitor.close();
			
		} catch (Exception e) {
			// TODO: handle exception
			
		}
		leitor.close();
		return textoconvertido;
	}

	public static void mostraImg(Mat img, String titulo){			

		HighGui.namedWindow(titulo, HighGui.WINDOW_AUTOSIZE);
		HighGui.resizeWindow(titulo, 500, 500); 				// **pode definir a altura e a largura da janela, não redimenciona a imagem.**
		HighGui.moveWindow(titulo, eixoX, 0);	 				// posição da janela en relação a tela segundo os valores de x e y
		eixoX=eixoX+250; 										// altera o valor segundo as suas preferencias
		HighGui.imshow(titulo, img);	
		
	}		




}
