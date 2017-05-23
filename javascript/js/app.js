/*Permitir realizar las 4 operaciones básicas entre dos números racionales, esto quiere decir que los números pueden ser naturales, enteros negativos, o decimales. Ejemplo.
2 + 3 -4 x 8
0.4 ÷ 9.3013 -4.05 - 1034.2

El mayor número de dígitos por cada operando y del resultado es 8.

Los resultados de todas las operaciones deben mostrarse sólo cuando se presione la tecla igual (=)

Permitir realizar operaciones en cadena, es decir que el resultado de una operación puede ser el primer operando de una operación siguiente. Ejemplo. 
2 + 1 = 5 x 2 = 10 - 2 = 8

Permitir la secuencia de operaciones al presionar el botón igual (=) consecutivamente después de una operación, repitiendo la operación y el segundo operando sobre el resultado obtenido. Ejemplo. 
3 + 2 = 5 = 7 = 9 = 11
REPITE EL +2 CADA VEZ Q APRETO =
*/

window.onload = function(){
	calculadora.inicia()
} 

var teclas = document.getElementsByClassName('tecla')
var pantalla = document.getElementById('display')
var numeroActual = pantalla.innerText

var realizaOperacion = 0
var guardoOperacion = ''
var checkIgual = 0

var calculadora = {

	inicia : function(){
		this.clickea()

	},

	//tecla presionada reduzca su tamaño y vuelva a su forma original al soltarla.
	clickea : function(){		

		for (var i = 0; i < teclas.length; i++) {
			// console.log(teclas[i])
			
			teclas[i].addEventListener('mousedown', function(){
				this.style.border= '5px solid #161616';
				this.style.background= '#161616';
				this.style.borderRadius= '17px';
				var digito = this.alt

				// si no es una operacion
				if(!isNaN(digito)){
					// console.log('isNaN')
					calculadora.ingresaNumero(digito);					
				}else{
					// ejecuto la operacion correspondiente, 
					calculadora.opera(digito)
				}
			})

			teclas[i].addEventListener('mouseup', function(){
				this.style.border= '0px';
				// this.style.background= '#161616';
				// this.style.borderRadius= '17px';
			})
		}
	},

	// tecla numérica, se muestre el número correspondiente en la pantalla. 
	ingresaNumero : function(digito){

		if(checkIgual == 1){
			this.resetea();
		}

		// console.log(digito)
		var newNumber = digito

		numeroActual = pantalla.innerText

		if(numeroActual.length<8){
			// si esta en cero y escribo
			if(numeroActual == 0 && newNumber !== 0 && numeroActual != '0.' ){
				// console.log(newNumber)
				pantalla.innerText = newNumber
			}

			// si agrego numeros
			if(numeroActual != 0 && newNumber !== 0 || numeroActual == '0.'){
				// console.log(newNumber)
				pantalla.innerText = numeroActual+newNumber
			}

			checkIgual = 0

			//verificar si en la pantalla se encuentra sólo el número cero

			// no se puedan agregar más números cero

			//reemplazar al cero inicial.

		}
	},

	opera : function(operador){
		if(operador == 'On'){
			this.resetea();
		}else if(operador == 'punto'){
			this.decimal();
		}else if(operador == 'signo'){
			this.negativos()
		}else{
			this.operaciones(operador);
		}
	},

	//4 operaciones básicas: suma, resta, multiplicación y división
	operaciones: function(operador){

		//tomo el numero q ingrese
		numeroActual = pantalla.innerText
		

		// console.log('numero actual ' + numeroActual);
		// console.log('operador ' + operador);
		// console.log('realiza op ' + realizaOperacion);
		
		//reseteo pantalla
		pantalla.innerText = ''

		// checkIgual = 1; //resetea operacion
		//si no tenia un numero antes, arranco por aca
		if(realizaOperacion == 0){
			realizaOperacion = +numeroActual
			guardoOperacion = operador
		}else{
		//si ya tenia uno
			// realizaOperacion = +realizaOperacion + +numeroActual


			switch(guardoOperacion){
				case 'mas':
					// operaSigno = '+';
					realizaOperacion = +realizaOperacion + +numeroActual;
					break;
				case 'menos':
					// operaSigno = '-'
					realizaOperacion = +realizaOperacion - +numeroActual;
					break;
				case 'por':
					// operaSigno = '*'
					realizaOperacion = +realizaOperacion * +numeroActual;
					break;
				case 'dividido':
					// operaSigno = '/'
					realizaOperacion = +realizaOperacion / +numeroActual;
					break;
				/*case 'igual':
					break;*/
			}
		
		}


		if(operador == 'igual'){

			// console.log(realizaOperacion);

			realizaOperacion = this.validaResult(realizaOperacion)
			pantalla.innerText = realizaOperacion
			// operaSigno = ''
			realizaOperacion = 0; //resetea operacion
			checkIgual = 1; //resetea operacion
			// hasta 8 digitos
			// muestra el resultado en pantalla

		}else{			
			checkIgual = 0
			guardoOperacion = operador
		}

		// console.log(realizaOperacion);

	},


	// botón ON/C se borren los números
	resetea : function(){
		pantalla.innerText = 0;
		realizaOperacion = 0
	},


	// tecla del punto, lo añada a la derecha del número actual que se muestra en pantalla
	decimal : function(){
		// verificar si el punto ya está o no en pantalla para no adicionarlo más de una vez.
		numeroActual = pantalla.innerText

		if(numeroActual.length<8){		
			var esDec = Number(numeroActual)
			if(Number.isInteger(esDec) && numeroActual != '0.'){
				pantalla.innerText = numeroActual+'.'
			}
		}
	},


	//añada el signo negativo al presionar la tecla +/- a un número en pantalla
	negativos : function(){
		//Si el número sólo es un cero, no se debe agregar el signo
		numeroActual = pantalla.innerText		
		if(numeroActual != 0){
			if(numeroActual<0){
				pantalla.innerText = numeroActual.substring(1)

			}else{
			//si el signo menos ya está en pantalla, al presionar la tecla se borre.
				pantalla.innerText = '-'+pantalla.innerText
			}
		}
	},

	//hasta 8 digitos
	validaResult : function(result){
		// console.log(result.length);
		result = result.toString()
		if(result.length > 8){
			result = result.substr(0,8)

		}
		return result
		// posee un mayor número de dígitos, se deben mostrar sólo sus primeros 8 dígitos.

	},

}