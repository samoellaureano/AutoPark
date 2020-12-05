package br.com.estacionamento.util;

import java.text.ParseException;
import java.util.Date;

public class Util {
	
	public static double calcularDiferencaHoras(Date dataHoraInicial, Date dataHoraFinal) throws ParseException{		
        double seconds = (dataHoraFinal.getTime() - dataHoraInicial.getTime());
        double horasDiff = (seconds/(60*60*1000));
		return horasDiff;
    }

}
