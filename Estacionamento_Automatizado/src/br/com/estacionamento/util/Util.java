package br.com.estacionamento.util;

import java.text.SimpleDateFormat;

public class Util {
	
	public static double calcularDiferencaHoras(String horaInicial, String horaFinal){
        SimpleDateFormat sdf1 = new SimpleDateFormat(horaInicial);
        SimpleDateFormat sdf2 = new SimpleDateFormat(horaFinal);
        try {
            double horaInic = sdf1.getCalendar().getTimeInMillis();
            double horaFim = sdf2.getCalendar().getTimeInMillis();

            return (horaFim - horaInic);
        } catch(Exception ex) {
        }
		return 0;
    }

}
