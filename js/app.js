// Constructor Seguro
class Seguro {
    constructor(marca, anio, tipo) {
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }

    cotizar() {  
        /* Marcas
            1 = Americano 1.15
            2 = Asiatico 1.05
            3 = Europeo 1.35
        */
       let cantidad;
       const base = 2000;
    
       // Calculo de marca
       switch(this.marca) {
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;    
       }
    
       // Leer año
       const diferencia = new Date().getFullYear() - this.anio;
       // Cada año de diferencia hay que reducir 3% el valor del seguro
       cantidad -= ((diferencia * 3) * cantidad) / 100;
    
       // Seguro básico 30% más, completo 50% más
       if(this.tipo === 'basico') {
           cantidad *= 1.30;
       } else {
           cantidad *= 1.50;
       }
    
       return cantidad;
    }
    
}
    
// Constructor Interfaz
class Interfaz {

    mostrarMensaje(mensaje, tipo) {
        const div = document.createElement('div');
        
        if(tipo === 'error') {
            div.classList.add('mensaje', tipo);
        } else {
            div.classList.add('mensaje', tipo);
        }
    
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group'));
    
        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        }, 3000)
    }

    mostrarResultado(seguro, cantidad) {
        const resultado = document.getElementById('resultado');
        let marca;
        
        switch(seguro.marca) {
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
        }
        
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="header">COTIZACIÓN</p>
            <p>Marca: ${marca}</p>
            <p>Año: ${seguro.anio}</p>
            <p>Tipo: ${seguro.tipo}</p>
            <p>TOTAL: $ ${cantidad}</p>
        `;
    
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
    
        setTimeout(function(){
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 3000);
    }
}

// Event Listener
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    // Leyendo la marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    // Leyendo año seleccionado del select
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    // Leyendo valor de radiobuton
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    const interfaz = new Interfaz();

    if (marcaSeleccionada === '') {
        // Interfaz marcará error
        interfaz.mostrarMensaje('Faltan algunos datos, por favor, revisa e intántalo nuevamente.', 'error');
    } else {
        const resultados = document.querySelector('#resultado div');
        if(resultados != null) {
            resultados.remove();
        }
        // Instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        const cantidad = seguro.cotizar(seguro);

        interfaz.mostrarResultado(seguro, cantidad);

        interfaz.mostrarMensaje('Cargando...', 'correcto');
    }
});

// Imprimir options del selector de años
const max = new Date().getFullYear(),
    min = max - 20;

const selectAnios = document.getElementById('anio');

for(let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}
