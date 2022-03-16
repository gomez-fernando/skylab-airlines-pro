let name;
let scale = "";
let choice;
let toDrop;
var flights = [

  { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },

  { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },

  { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },

  { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },

  { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },

  { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },

  { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },

  { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },

  { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },

  { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },

  { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];

// function to get the average of flights prices
const average = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++){ 
    sum += array[i].cost;
  }
  return ((sum / array.length).toFixed(2));
}

// function to show in the console the list of flights
const showFlights = () => {
  console.log("\nLista actualizada de vuelos:\n")

  for (let i = 0; i < flights.length; i++) {
    (flights[i].scale)
      ? scale = "Sí"
      : scale = "No";
    console.log(`ID: ${flights[i].id} | Origen: ${flights[i].from} | Destino: ${flights[i].to} | Coste: ${flights[i].cost} | Escala: ${scale}`);
  }
}

// function to show the Admin's menu
const admin = () => {
  do {
    choice = prompt(`Menú:
Elige una opción indicando el número:
1: Crear vuelo
2: Eliminar vuelo
3: Cerrar programa`);

    switch (choice) {
      case '1':
        if(flights.length >= 15){
          alert(`El límite de 15 vuelos ha sido alcanzado.
Borre algún vuelo para poder añadir más.`);
          choice = null;
          break;
        } else {
          create();
          break;
        }

      case '2':
        drop();
        break;

      case '3':
        close();
        break;

      default :
        choice = null;
        break;
    }
  } while (choice !== '1' && choice !== '2' && choice !== '3');
}

// function to create a new flight
const create = () => {
  let newFlight = {id : undefined, to: "", from: "", cost: undefined, scale: undefined};
  
  do {
    newFlight['to'] = prompt(`Ingresa la ciudad de destino del vuelo`);
  } while (newFlight['to'] === null || newFlight['to'] === "");

  do {
    newFlight['from'] = prompt(`Ingresa la ciudad de origen del vuelo`);
  } while (newFlight['from'] === null || newFlight['from'] === "");

  do {
    newFlight['cost'] = prompt(`Ingresa el precio del vuelo`);
    if(isNaN(newFlight['cost'])){
      newFlight['cost'] = null;
    } else{
      newFlight['cost'] = parseFloat(newFlight['cost']);
    }
  } while (newFlight['cost'] === null || newFlight['cost'] === "");

  do {
    newFlight['scale'] = prompt(`Indica si el vuelo tiene escalas: 's/n'`);

    switch (newFlight['scale']) {
      case 's':
        newFlight['scale'] = true;
        break;

      case 'n':
        newFlight['scale'] = false;
        break;

      default :
        newFlight['scale'] = null;
        break;
    }
  } while (newFlight['scale'] === null || newFlight['scale'] === "");

  let ids = flights.map( x => {
      return x.id;
  })

  let maxId = Math.max(...ids);

  newFlight['id'] = maxId + 1;
  flights.push(newFlight);

  showFlights();

  alert("Vuelo creado correctamente, puedes ver la lista actualizada en la consola.");

  admin();
}

// funciton to delete a flight
const drop = () => {
  do {
    toDrop = prompt(`Indica el id del vuelo que quieres borrar:`);
    toDrop = parseInt(toDrop);
    
    let ids = flights.map( x => {
      return x.id;
    })

    let idToDrop = ids.indexOf(toDrop);

    if(idToDrop === -1) {
      toDrop = null;
      alert("El id introducido no existe.");
    } else{
      flights.splice(idToDrop, 1);

      showFlights();

      alert("El vuelo ha sido eliminado correctamente, puedes ver la lista actualizada en la consola.");

      admin();
    }
    
  } while (toDrop === null || toDrop === "");
}

// function to close the program
const close = () => {
  alert("Has cerrado sesión.\nBye !");
}

// function to show the user's menu
const user = () => {
  do {
    choice = prompt(`Menú:
Elige una opción indicando el número:
1: Buscar por precio máximo
2: Comprar vuelo
3: Cerrar programa`);

    switch (choice) {
      case '1':
        search();
        break;

      case '2':
        buy();
        break;

      case '3':
        close();
        break;

      default :
        choice = null;
        break;
    }
  } while (choice !== '1' && choice !== '2' && choice !== '3');
}

// function to search flight by max price
const search = () => {
  let maxPrice = "";
  let maxPFlights = [];
  
  do {
    maxPrice = prompt(`Ingresa el precio máximo que quieras buscar para tu vuelo.`);

    maxPFlights = flights.filter(function (flight){
      return flight.cost <= maxPrice;
    });

  } while (maxPrice === null || maxPrice === "" || isNaN(maxPrice));

  console.log("******************\n");
  console.info(`Estos son los vuelos con precio máximo de $ ${maxPrice}: \n\n`);
    for (let i = 0; i < maxPFlights.length; i++) {
      (maxPFlights[i].scale)
        ? scale = "Sí"
        : scale = "No";
      console.log(`ID: ${maxPFlights[i].id} | Origen: ${maxPFlights[i].from} | Destino: ${maxPFlights[i].to} | Coste: ${maxPFlights[i].cost} | Escala: ${scale}`);
    }

  if(maxPFlights.length > 1){
    alert(`Se han encontrado ${maxPFlights.length} vuelos.\nPuedes consultar la lista en la consola.`);
  } else if(maxPFlights.length === 1){
    alert(`Se ha encontrado ${maxPFlights.length} vuelo.\nPuedes consultarlo en la consola.`);
  } else{
    alert(`No se han encontrado vuelos con ese precio o menor.`);
  }

  user();
}

// function to let a user buy a flight
const buy = () => {
  do {
    toBuy = prompt(`Indica el id del vuelo que quieres comprar:`);

    if(toBuy !== null && toBuy !== ""){
      toBuy = parseFloat(toBuy);

      let ids = flights.map( x => {
        return x.id;
      })
  
      let idToBuy = ids.indexOf(toBuy);

      if(idToBuy === -1) {
        toBuy = null;
        alert("El id introducido no existe.");
      } else{

        (flights[idToBuy].scale)
          ? scale = "Sí"
          : scale = "No";

          console.info(`------------------->\nEstos son los detalles de tu vuelo:\nID: ${flights[idToBuy].id} | Origen: ${flights[idToBuy].from} | Destino: ${flights[idToBuy].to} | Coste: ${flights[idToBuy].cost} | Escala: ${scale}`);

          flights.splice(idToBuy, 1);

          console.log("------------------->");

          showFlights();

        alert("La compra se ha realizado correctamente.\nPuedes ver en la consola los detalles de tu vuelo y la lista actualizada de vuelos disponibles.\nGracias por volar con nosotros !!");


        user();
      }
    }
    
  } while (toBuy === null || toBuy === "");
}

// App's main function
const airline = () => {
  do {
    name = prompt(`Bienvenido/a a SkyLab Airlines !!
Dinos tu nombre`);
  
  } while (name === null || name === "");
  

  console.info(`Hola ${name},
Esta es la lista de vuelos para hoy: \n\n`);
  for (let i = 0; i < flights.length; i++) {
    (flights[i].scale)
      ? scale = "Sí"
      : scale = "No";
    console.log(`ID: ${flights[i].id} | Origen: ${flights[i].from} | Destino: ${flights[i].to} | Coste: ${flights[i].cost} | Escala: ${scale}`);
  }

  console.log('\n*****************');
  console.info(`El coste medio de los vuelos es:
$ ${average(flights)}`);
  console.log('\n*****************');

  let totalWithScales = 0;
  for (let i = 0; i < flights.length; i++) {
    if (flights[i].scale) totalWithScales++;
  };
  
  console.info(`Los vuelos que realizan escalas son: ${totalWithScales}`);

  console.log('\n*****************');
  console.info('Los últimos 5 vuelos del día son: \n');

  for (let i = flights.length - 1; i > (flights.length - 6); i--) {
console.log(`ID: ${flights[i].id} Destino: ${flights[i].to} | Origen: ${flights[i].from}`);
  }
  
  let role = "";
  do {
    role = prompt(`LOGIN
Indica si eres ADMIN o USER`);

    if(role !== null) role = role.toLocaleLowerCase();

    switch (role) {
      case 'admin':
        admin();
        break;

      case 'user':
        user();
        break;

      default :
        role = null;
        break;
    }

  } while (role === null || role === "");
}

airline();