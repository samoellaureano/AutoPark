package br.com.reconhecimentoImagem.main;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

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

		String localImg="C:\\Users\\Felipe\\Documents\\GitHub\\TCC\\ReconhecimentoDeImagem\\src\\placa1.jpg";
		String localImg1="C:\\Users\\Felipe\\Documents\\GitHub\\TCC\\ReconhecimentoDeImagem\\src\\placa2.jpg";
		String localImg2="C:\\Users\\Felipe\\Documents\\GitHub\\TCC\\ReconhecimentoDeImagem\\src\\placa4.jpg";

		Mat img = Imgcodecs.imread(localImg1);
		
		Imgproc.cvtColor(img, img, Imgproc.COLOR_BGR2GRAY);		 
		Imgproc.medianBlur(img, img, 3);
		Imgproc.GaussianBlur(img, img, new Size(5,5),5);
		
		Imgproc.medianBlur(img, img, 5);
	 // Imgproc.equalizeHist(img2, img2);
		Imgproc.adaptiveThreshold(img, img, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY,11,11);	
		
	 // Imgproc.resize(img2,img2,new Size(300,300));
		Imgcodecs.imwrite("placa2.png",img );		
		mostraImg(img, "Imagem");
				
		Process converter=null;
		try {
			converter = new ProcessBuilder("tesseract.exe "," C:\\Users\\Felipe\\Documents\\GitHub\\TCC\\ReconhecimentoDeImagem\\placa2.png  C:\\Users\\Felipe\\Documents\\GitHub\\TCC\\ReconhecimentoDeImagem\\out --dpi 900").start();

			String texto = lerArquivo("C:\\Users\\Felipe\\Documents\\GitHub\\TCC\\ReconhecimentoDeImagem\\out.txt");

			System.out.println("texto: "+texto);
			//	aaa.destroy();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	

		finally {
			converter.destroy();
		}

		/* O filtro Gaussiano geralmente é usado como um filtro de passa-baixa por deixar passar 
		 * as baixas frequências, mas elimina os valores relacionados às altas frequência.  
		 * Neste filtro, assim como em outros, a suavização da imagem é realizada através da 
		 * substituição de cada pixel pela média ponderada dos pixels vizinhos. 
		 * 
		 * Filtro da Mediana: Eficiente para o propósito de filtrar imagens, pois ele reduz a quantidade de variação de 
		 * intensidade entre um pixel e seus vizinhos, eliminando ruídos.
		 */		

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
