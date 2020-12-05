package br.com.estacionamento.util;

import java.text.ParseException;
import java.util.Date;

public class Util {
	
	public static float calcularDiferencaHoras(Date dataHoraInicial, Date dataHoraFinal) throws ParseException{		
        long seconds = (dataHoraFinal.getTime()) - dataHoraInicial.getTime();
		return (seconds / (60*60*1000));
    }

}
