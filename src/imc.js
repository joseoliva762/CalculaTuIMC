const age = document.getElementById('age');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const calculate = document.getElementById('calculate');
const man = document.querySelector('button#man');
const woman = document.querySelector('button#woman');
let gender = '';

const generateInterpretation = ( imc, bajo, normal, leve, severa) => {
  let interpretation;
  let title;
  let message;

  if( imc < bajo ){
    title = 'Ten cuidado', message = `Tienes muy bajo peso`, interpretation = 'warning';
  } else if ( imc >= bajo && imc < normal ) {
    title = 'Excelente!!', message = `Estas en tu peso ideal`, interpretation = 'success';
  } else if ( imc >= normal && imc < leve ) {
    title = 'Ten cuidado', message = `Sufres de obesidad leve`, interpretation = 'warning';
  } else if ( imc >= leve && imc < severa ) {
    title = 'Precaución', message = `Sufres de obesidad severa`, interpretation = 'error';
  } else {
    title = 'Es hora de hablar con un doctor', message = `Sufres de obesidad muy severa`, interpretation = 'error';
  }
  return [ title, ( message + `,\n tu IMC es de: ${imc.toFixed(4)}.`), interpretation ];
}

const validateIMC = imc => {
  const [ title, message, interpretation ] = (gender === 'man')
        ? generateInterpretation( imc, 20, 25, 30, 40)
        : generateInterpretation( imc, 20, 24, 29, 37);
  swal(title, message, interpretation);
}

man.onclick = () => {
  if( !man.classList.contains('selected__option') ) {
    man.classList.add('selected__option');
    gender = 'man';
    if( woman.classList.contains('selected__option') ){
      woman.classList.remove('selected__option');
    }
  }
}

woman.onclick = () => {
  if( !woman.classList.contains('selected__option') ) {
    woman.classList.add('selected__option');
    gender = 'woman';
    if( man.classList.contains('selected__option') ){
      man.classList.remove('selected__option');
    }
  }
}

calculate.addEventListener('click', () => {
  if(!age.value || !height.value || !weight.value || !gender){
    swal("Error", "Debes llenar todos los campos del formulario.", "error");
    return;
  }
  let imc = ( parseFloat(weight.value) / (parseFloat(height.value) ** 2) );
  validateIMC( imc );
});
