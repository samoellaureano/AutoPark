package br.com.reconhecimentoImagem.main;

import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.Size;
import org.opencv.highgui.HighGui;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

public class Decomposicao {

	private static int eixoX=0;

	public static void main(String[] args) {
		// TODO Auto-generated method stub


		System.loadLibrary(Core.NATIVE_LIBRARY_NAME);			     

		String localImg="C:\\Users\\Felipe\\Documents\\GitHub\\workspace\\ReconhecimentoDeImagem\\src\\imagensOpencv\\placa1.jpg";


		/*A classe Mat representa um arranjo numérico denso e único canal ou multicanal n-dimensional. 
		 * Pode ser usado para armazenar vetores e matrizes reais ou complexos, imagens em escala de cinza ou em cores. 
		 */

		Mat img2 = Imgcodecs.imread(localImg);				     
		Imgproc.cvtColor(img2, img2, Imgproc.COLOR_BGR2GRAY);
		Imgproc.equalizeHist(img2, img2);
		mostraImg(img2,"Placa_normal"); 

		/* O filtro Gaussiano geralmente é usado como um filtro de passa-baixa por deixar passar 
		 * as baixas frequências, mas elimina os valores relacionados às altas frequência.  
		 * Neste filtro, assim como em outros, a suavização da imagem é realizada através da 
		 * substituição de cada pixel pela média ponderada dos pixels vizinhos. 
		 */

		Mat imgGauss = new Mat();				      
		Imgproc.GaussianBlur(img2, imgGauss, new Size(5,5),3);			    
		Imgproc.adaptiveThreshold(imgGauss, imgGauss, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY,7,7);
		Imgproc.adaptiveThreshold(imgGauss, imgGauss, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY_INV,7,5);
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
		Imgproc.adaptiveThreshold(imgMediana, imgMediana, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY_INV,5,5);				      
		mostraImg(imgMediana,"Mediana");

		Mat suavCombinada = new Mat();
		Imgproc.medianBlur(img2, suavCombinada,7);
		Imgproc.GaussianBlur(suavCombinada, suavCombinada, new Size(3,3),5);
		//  Imgproc.medianBlur(suavCombinada, suavCombinada,7);			     
		Imgproc.adaptiveThreshold(suavCombinada, suavCombinada, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY,7,7);
		Imgproc.adaptiveThreshold(suavCombinada, suavCombinada, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY_INV,5,5);	

		mostraImg(suavCombinada,"Gaussian + Mediana");

		HighGui.waitKey();	// sempre será a ultima linha do codico para mostra as janelas...
	}      

	public static void mostraImg(Mat img, String titulo){			

		HighGui.namedWindow(titulo, HighGui.WINDOW_AUTOSIZE);
		HighGui.resizeWindow(titulo, 500, 500); 				// **pode definir a altura e a largura da janela, não redimenciona a imagem.**
		HighGui.moveWindow(titulo, eixoX, 0);	 				// posição da janela en relação a tela segundo os valores de x e y
		eixoX=eixoX+250; 										// altera o valor segundo as suas preferencias
		HighGui.imshow(titulo, img);	

	}		




}
