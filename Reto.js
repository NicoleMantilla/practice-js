

/* 
si utilizáis algún import en vuestra solución, recordad que hay que indicarle a node 
que estamos utilizando módulos. Para ello, debemos incluir el fichero package.json que 
veis en este repositorio. En caso de que no os funcione, contactadme por discord.
*/

import { students, availableFemaleNames, availableMaleNames, availableGenders, selectRequeriments } from './info-students.js'


/* PRACTICA */

//La utilidad de node para que los datos se pidan y se muestren por consola.
import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// Str introducido por error. 
const errorInt = (str) => {
  const integer = parseInt(str);
  if (Number.isNaN(integer)) {
      return false 
  } else {
      return true
  }
}


//productor 
//Número seleccionado. 
function selectNumber() {
  const promise = new Promise((resolve, reject) => {
    // nos permite hacer una pregunta por consola al usuario. Ojo que es un proceso asíncrono.
    rl.question('Introduce un número de la lista: ', (num) => {
      rl.pause();
      if(isNaN(num)){
        reject(`introduce una opción correcta`)
      } else {
        resolve(num)
      }

      // si el usuario mete un número, resolvemos la promesa con ese número.
      // si el usuario mete una letra, debemos rechazar/rejectear la promesa.
    })
  })

  return promise;
}


// consumidor

async function consoleNumber() {

   let choose
  do {
    console.log("1- Mostrar en formato de tabla todos los alumnos. ");
    console.log("2- Mostrar por consola la cantidad de alumnos que hay en clase.");
    console.log("3- Mostrar por consola todos los nombres de los alumnos.");
    console.log("4- Eliminar el último alumno de la clase.");
    console.log("5- Eliminar un alumno aleatoriamente de la clase.");
    console.log("6- Mostrar por consola todos los datos de los alumnos que son chicas.");
    console.log("7- Mostrar por consola el número de chicos y chicas que hay en la clase.");
    console.log("8- Mostrar true o false por consola si todos los alumnos de la clase son chicas.");
    console.log("9- Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.");
    console.log("10- Añadir un alumno nuevo con los siguientes datos:Nombre aleatorio.Edad aleatoria entre 20 y 50 años.Género aleatorio.Listado de calificaciones vacío.");
    console.log("11- Mostrar por consola el nombre de la persona más joven de la clase.");
    console.log("12- Mostrar por consola la edad media de todos los alumnos de la clase.");
    console.log("13- Mostrar por consola la edad media de las chicas de la clase.");
    console.log("14- Añadir nueva nota a los alumnos. Por cada alumno de la clase, tendremos que calcular una nota de forma aleatoria(número entre 0 y 10 y añadirla a su listado de notas.");
    console.log("15- Ordenar el array de alumnos alfabéticamente según su nombre.\n");
      try {

          choose = await selectNumber()
      } catch (error) {
          console.log(error)
          process.exit(0)
      }
      switch(choose) {
        case '1':// 1- Mostrar en formato de tabla todos los alumnos.
          console.table(students)
          break;

        case '2':// 2- Mostrar por consola la cantidad de alumnos que hay en clase.
          console.log('Número total de estudiantes  :', students.length)
          break;

        case '3':// 3- Mostrar por consola todos los nombres de los alumnos.
          console.log('Nombres de todos los estudiantes :')
          students.forEach((student) => {console.log(student.name)})
          
          break;

        case '4':// 4- Eliminar el último alumno de la clase.
        console.log('Elimina el último alumno de toda la lista :')
        students.pop()
        console.log(students);
          break;

        case '5':// 5- Eliminar un alumno aleatoriamente de la clase.
        console.log('Elimina aleatoriamente un alumno de toda la lista :')
        const randomIndex = Math.floor(Math.random() * students.length);
        students.splice(randomIndex, 1);
        console.log(students);
          break;

        case '6':// 6- Mostrar por consola todos los datos de los alumnos que son chicas.
        console.log('Datos de las alumnas :')
        // filter. 
        const result = students.filter(student => 
          student.gender === 'female')
        console.log(result)
        
          break;

        case '7':// 7- Mostrar por consola el número de chicos y chicas que hay en la clase.
        const girls = students.filter(student => 
          student.gender === 'female')
        const boys = students.filter(student => 
          student.gender === 'male')
        console.log('Número de chicas:', girls.length)
        console.log('Número de chicos:', boys.length )          
          break;

        case '8':// 8- Mostrar true o false por consola si todos los alumnos de la clase son chicas.
        console.log('True todas son chicas, false si hay chicos: ')
        //if bucle de comparación. Me falta un for.
            if (students.gender === 'female') {
              console.log(true)
            } else {
            console.log(false)
            }   
          break;

        case'9':// 9- Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.
        //filter
        const generation = students.filter(student => 
          student.age >= 20 && student.age <= 25)
        console.log('Alumnos entre 20 y 25 años', generation)
          break;

        case '10':/* 10- Añadir un alumno nuevo con los siguientes datos:*/
          let randomGender = availableGenders[Math.floor(Math.random() * availableGenders.length)];
          let randomName = null;
          if (randomGender === 'female') {
            randomName = availableFemaleNames[Math.floor(Math.random() * availableFemaleNames.length)];
        } else {
            randomName = availableMaleNames[Math.floor(Math.random() * availableMaleNames.length)];
        }
          students.push({
              age: [ Math.floor(Math.random() * (50 - 20 + 1)) + 20 ],
              examScores: [],
              gender: [randomGender],
              name: [randomName],
            })
          console.log(students)
          break;

        case '11':/* 11- Mostrar por consola el nombre de la persona más joven de la clase.
        ¡OJO!, si varias personas de la clase comparten la edad más baja, cualquiera de ellos es una respuesta válida.*/
        // un if 
        const youngestPerson = students.reduce(function(youngest, person) {
          return (youngest.age || Number.POSITIVE_INFINITY) < person.age ? youngest : person;
        });
        console.log('El más joven de la clase es: ', youngestPerson.name);
          break;

        case '12':// 12- Mostrar por consola la edad media de todos los alumnos de la clase.
        //reduce 
        const getNumber = students.reduce((prev, students) => prev + students.age, 0) / students.length;
        console.log('La edad media de todos los alumnos es: ', Math.round(getNumber))

          break;


        case '13':// 13- Mostrar por consola la edad media de las chicas de la clase.

          const studentGirls = students.filter(student => 
            student.gender === 'female')
        const ageGirls = studentGirls.reduce((prev, students) => prev + students.age, 0) / students.length;
        console.log('La edad media de las chicas es: ', Math.round(ageGirls))

        break;

        case '14':// 14- Añadir nueva nota a los alumnos. Por cada alumno de la clase, tendremos que calcular una nota de forma aleatoria(número entre 0 y 10) y añadirla a su listado de notas.
        //Map y random
        console.log('Nueva notas añadida a cada alumno: ')
        const score = students.map(student => {
          return {
            ...student, 
            examScores: [Math.random() * 10]
          }
          })
          console.log(score)
          break;
        
        case '15':// 15- Ordenar el array de alumnos alfabéticamente según su nombre.
        // algo con sort para ordenar. Lo intente con map y nada.
        students.sort(function(x, y) {
          if (x.name < y.name) {
            return -1;
          } else if (x.name > y.name) {
            return 1;
          } else {
            return 0;
          }
        });
        console.log('El orden Alfabetico de los estudiantes es:', students);
          break;
      }
    } while (choose > 0 && choose <= 15)
}
consoleNumber()


