package br.com.estacionamento.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public class Util {
	
	public static int calcularDiferencaHoras(String horaInicial, String horaFinal) throws ParseException{
		SimpleDateFormat df1 = new SimpleDateFormat(horaInicial);
		SimpleDateFormat df2 = new SimpleDateFormat(horaFinal);
        
        
        long seconds = (df2.getCalendar().getTimeInMillis()) - df1.getCalendar().getTimeInMillis();
        int diffSec = (int) (seconds / (1000) % 24);
		return diffSec;
    }

}
