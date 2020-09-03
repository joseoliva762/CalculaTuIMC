const age = document.getElementById('age');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const calculate = document.getElementById('calculate');
const man = document.querySelector('button#man');
const woman = document.querySelector('button#woman');
let gender = '';

const generateInterpretation = ( imc, clasification) => {
  let interpretation;
  let title;
  let message;

  if( imc < clasification.severeThinness ){
    title = 'Ten cuidado', message = `Tienes delgadez severa`, interpretation = 'error';
  } else if ( imc >= clasification.severeThinness && imc < clasification.moderateThinness ) {
    title = 'Cuidado', message = `Tienes delgadez moderada`, interpretation = 'warning';
  } else if ( imc >= clasification.moderateThinness && imc < clasification.slightThinness ) {
    title = 'Precaución', message = `Tienes delgadez leve`, interpretation = 'info';
  } else if ( imc >= clasification.slightThinness && imc < clasification.normal ) {
    title = 'Excelente!!', message = `Estas en tu peso ideal`, interpretation = 'success';
  } else if ( imc >= clasification.normal && imc < clasification.preObesity ) {
    title = 'Precaución', message = `Sufres de sobrepeso o pre-obesidad`, interpretation = 'warning';
  } else if ( imc >= clasification.preObesity && imc < clasification.obesity1 ) {
    title = 'Cuidado', message = `Sufres de obesidad grado 1 o moderada`, interpretation = 'warning';
  } else if ( imc >= clasification.obesity1 && imc < clasification.obesity2 ) {
    title = 'Ten cuidado', message = `Sufres de obesidad grado 2 o severa`, interpretation = 'error';
  } else {
    title = 'Es hora de hablar con un doctor', message = `Sufres de obesidad grado 3 o mórbida`, interpretation = 'error';
  }
  return [ title, ( message + `,\n tu IMC es de: ${imc.toFixed(4)}.`), interpretation ];
}

const validateIMC = imc => {
  const [ title, message, interpretation ] = (gender === 'man')
        ? generateInterpretation( imc, {
            severeThinness: 16,
            moderateThinness: 17,
            slightThinness: 18.4,
            normal: 25,
            preObesity: 30,
            obesity1: 35,
            obesity2: 40
        })
        : generateInterpretation( imc, {
            severeThinness: 16,
            ModerateThinness: 17,
            slightThinness: 18.4,
            normal: 24,
            preObesity: 29,
            obesity1: 34,
            obesity2: 37
        });
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
