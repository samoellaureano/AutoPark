package OCR;

import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.Size;
import org.opencv.highgui.HighGui;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

public class Teste {

	public static void main(String[] args) {


		System.loadLibrary(Core.NATIVE_LIBRARY_NAME); // Biblioteca Nativa do OpenCV

		// Caminho para a imagem que queremos mostar
		String localimg="C:\\BACKUP\\Git\\TCC\\Projeto_TCC\\bib\\img\\honda-civic.jpg";


		/*
		 * A classe Mat representa um arranjo num�rico denso e �nico canal ou multicanal n-dimensional. 
		 * Pode ser usado para armazenar vetores e matrizes reais ou complexos, 
		 * imagens em escala de cinza ou em cores, volumes voxel, campos vetoriais, 
		 * nuvens de pontos, tensores, histogramas.*/
		Mat img = Imgcodecs.imread(localimg);				     
		HighGui.namedWindow("placa_Normal", HighGui.WINDOW_AUTOSIZE);
		HighGui.imshow("placa_Normal", img);

		// pega uma imagem colorida e trasnforma para preto e branco e grava em uma nova (para mostrar a evolu��o)

		Mat imgGrey = new Mat();
		Imgproc.cvtColor(img, imgGrey, Imgproc.COLOR_BGR2GRAY);			          

		Mat imgBinary = new Mat();
		Imgproc.GaussianBlur(imgGrey, imgBinary, new Size(5,5), 0);
		Imgproc.adaptiveThreshold(imgBinary, imgBinary, 255,Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY,7, 5);	
		HighGui.namedWindow("Placa_Binarizada", HighGui.WINDOW_AUTOSIZE);
		HighGui.imshow("Placa_Binarizada", imgBinary);

		Mat imgGreyDesfoq = new Mat();
		Imgproc.blur(imgBinary, imgGreyDesfoq, new Size(3,3));		          
		HighGui.namedWindow("Placa_desfocado", HighGui.WINDOW_AUTOSIZE);
		HighGui.imshow("Placa_desfocado", imgGreyDesfoq);


		HighGui.waitKey(0);         
	}
}