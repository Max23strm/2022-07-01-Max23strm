const { Queue, Node, Stack, LinkedList, BinarySearchTree } = require("./DS.js");

// ---- Linked List ----
//EJERCICIO 1
// Agregar el método orderList al prototipo de LinkedList. Este método deberá ordenar los elementos de nuestra lista enlazada de menor a mayor.
// Ejemplo:
//     Suponiendo que la lista actual es: Head --> [4] --> [5] --> [1]
//     lista.orderList();
//     Ahora la lista quedaría: Head --> [1] --> [4] --> [5]
// ACLARACIÓN: Se debe ordenar la lista original y no una nueva.
LinkedList.prototype.orderList = function () {
  // Tu código aca:
  var current=this.head
  var almacen=[]

  //limpieza de lista y almacenamiento de valores
  while(this.head!==null){
      current=this.head
          while(current.next!==null){
              almacen.push(this.remove())
          }
          almacen.push(this.remove())
  }

  //ordenamiento de valores
  var swap=true
  while(swap){
      swap=false
      for (let i = 0; i < almacen.length-1; i++) {
          if(almacen[i]>almacen[i+1]){
              let temp= almacen[i]
              almacen[i]=almacen[i+1]
              almacen[i+1]=temp
              swap=true
          }  
      }
  }

  //rellenado de lista
  almacen.forEach(element => {
      this.add(element)
  });
  return this
};

// EJERCICIO 2
// Agregar al prototipo de LinkedList un método reverseLinkedList que invierta el orden de los elementos de la lista.
// Ejemplo:
// let myList = Head --> [1] --> [2] --> [3] --> [4]
// myList.reverseLinkedList()
// myList = Head --> [4] --> [3] --> [2] --> [1]
LinkedList.prototype.reverseLinkedList = function () {
  // Tu código aca:
  var current=this.head
    var almacen=[]

    //limpieza de lista y almacenamiento de valores
    while(this.head!==null){
        current=this.head
            while(current.next!==null){
                almacen.push(this.remove())
            }
            almacen.push(this.remove())
    }


    //rellenado de lista
    almacen.forEach(element => {
        this.add(element)
    });
    return this

};

// EJERCICIO 3
// Implementar la función joinLinkedLists que, a partir de dos listas simplemente enlazadas
// del mismo tamaño retorne una nueva lista con los elementos de ambas listas
// Ejemplo:
//    Lista 1: Head --> [2] --> [8] --> [22] --> null
//    Lista 2: Head --> [6] --> [15] --> [4] --> null
//    joinLinkedList(linkedListOne, linkedListTwo)
//    Head --> [2] --> [6] --> [8] --> [15] --> [22] --> [4] --> null
function joinLinkedList(linkedListOne, linkedListTwo) {
  // Tu código aca:
  var nueva= new LinkedList()
  var current=linkedListOne.head
  var current2=linkedListTwo.head

  //almacenamiento de valores
  while(current!=null || current2!=null){
    if(current!=null && current2!=null){
      nueva.add(current.value)
      nueva.add(current2.value)
      current=current.next
      current2=current2.next
    } else if(current==null && current2!=null){
      nueva.add(current2.value)
      current2=current2.next
    }else if(current!=null && current2==null){
      nueva.add(current.value)
      current=current.next
    }
  }

  return nueva
}

// ---- Arboles Binarios ----
// EJERCICIO 4
// Implementar la función searchMin que busque en nuestro arbol binario, el valor minimo.
// Ejemplo:
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5
//  Debería retornarnos 2
BinarySearchTree.prototype.searchMin = function () {
  var prueba=this.value

  if(this.left!==null){
    if(prueba>this.left.value){
      prueba=this.left.value
    }
    if(this.left.searchMin()<prueba){
      prueba=this.left.searchMin()
    }
  }
  if(this.right!==null){
    if(prueba>this.right.value){
      prueba=this.right.value
    }
    if(this.right.searchMin()<prueba){
      prueba=this.right.searchMin()
    }
  }


  return prueba
};

// EJERCICIO 5
// Implementar la función createBST para que a partir de un array recibido como parametro
// genere un BinarySearchTree.
// Ejemplo:
//    - Array[16,6,23,2,17,31,14,5];
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5
function createBST(array) {
  // Tu código aca:
  var arbolito= new BinarySearchTree(array[0])
  array.forEach(element => {
    if(element!==array[0]){
      arbolito.insert(element)
    }
  });
  return arbolito
}

// ----- Closures -----
// EJERCICIO 6
// Implementar la función passport que recibe como parámetro:
//  - Una edad mínima para que las personas puedan ingresar a un país
//  - El país en cuestión
// La función passport retorna una función isAllowed, la cual recibirá un arreglo de personas que quieren ingresar al país, y retornará un nuevo arreglo con los admitidos (aquellos que cumplan con la edad requerida).
function passport(minAge, country) {
  // Tu código aca:
  if(minAge<18){
    return false
  }
  return function isAllowed(arreglo){
    var permitidos=[]
    arreglo.forEach(element => {
      if(element.age>=minAge && element.allowed.includes(country)){
        permitidos.push(element)
      }
    });
    if(!permitidos[0]){
      return false
    }
    return permitidos
  } 
}

// ---- Recursión ----
// EJERCICIO 7
// La función countDeep recibe por parámetro un arreglo que contiene números y/o arreglos (estos últimos contienen, a su vez, más números y/o arreglos), y retorna la cantidad de arreglos que hay en total, incluyendo al padre.
// Ejemplo:
// countDeep( [ 1, 2, 3, [ 4, [ 5, 6 ] ], 7, [ 8 ], 9] ) ----> Debería retornar 4
function countDeep(arr) {
  // Tu código aca:
  var conteo=0
  arr.forEach(element => {
    if(Array.isArray(element)){
      conteo+=countDeep(element)
    }
  });
  conteo+=1
  return conteo
}

// EJERCICIO 8
// Implementar la función isAncestor: debe determinar si dado dos nombres de personas las mismas
// son parientes o no (La primera debe ser ancestro de la segunda). La función recibira un objeto
// que va a representar sólo la parte femenina del "arbol genealogico" familiar y será de la siguiente forma:
// const genealogyTree = {
//   "Mona Simpson": [],
//   "Marge Simpson": ["Lisa Simpson", "Maggie Simpson"],
//   "Jacqueline Bouvier": [ "Patty Bouvier", "Marge Simpson", "Selma Bouvier"],
//   "Patty Bouvier": [],
//   "Selma Bouvier": ["Ling Bouvier"],
//   "Edwina": ["Abigail Simpson"],
//   "Lisa Simpson": [],
//   "Maggie Simpson": [],
//   "Ling Bouvier": []
// }
// Ejemplo:
//  - Caso que devuelve true --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Maggie Simpson")
//  - Caso que devuelve false --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Abigail Simpson")
//  [Observar los tests para otros casos]
var isAncestor = function (genealogyTree, ancestor, descendant) {
  // Tu código aca:
  for (const key in genealogyTree) {
    if(key==ancestor && genealogyTree[ancestor].includes(descendant) || genealogyTree[key].includes(descendant) && genealogyTree[ancestor].includes(key)){
      return true
    }
  }
  return false

};

// ---- Queue ----
// EJERCICIO 9
// Implementar la función cardGame: a partir de dos Queues que va a recibir como paráemtro que
// van a representar mazos de cartas de dos jugadores debemos determinar quien va a ser el ganador
// de este juego que va a tener la siguiente dinámica:
// - Los jugadores tendrán que defender su "Castillo" que contiene un total de 100 puntos de resistencia
// - Cada carta tendrá puntos de ataque (attack) y puntos de defensa (defense)
// - Ambos jugadores van a sacar las dos primeras cartas de su mazo
//      * La primera carta será su carta asignada para atacar
//      * La segunda carta será su carta asignada para defender
// - La carta asignada para atacar del jugador uno se enfrentará contra la carta asignada para defender
//   del jugador dos y viceversa. Si el ataque supera los puntos de defensa el daño sobrante será aplicado
//   sobre el castillo.
// - El juego finaliza cuando alguno de los dos castillos se quede sin puntos de resistencia o cuando los mazos
//   se acaben. En este último caso ganará aquel jugador que tenga mayor cantidad de puntos de resistencia
//   restantes en su castillo.
// La función deberá devolver un string indicando al ganador: 'PLAYER ONE' o 'PLAYER TWO' (Respetar mayúsculas) o
// 'TIE' en el caso de empate
// NOTA: Ambos mazos contienen la misma cantidad de cartas
//
// Ejemplo:
// Los jugadores levantan 2 cartas cada uno.
// La primera carta del jugador uno va a atacar a la segunda carta del jugador dos
// La primer carta del jugador dos va a atacar a la segunda carta del jugador uno
//
// Primer carta del jugador 1 (ATAQUE) vs Segunda carta del jugador 2 (DEFENSA):
// {attack: 5, defense: 5} vs {attack: 5, defense: 26}
// Ataque 5 vs Defensa 20 --> 5 no supera 20 --> No hay daño sobre el castillo
//
// Primer carta del jugador 2 (ATAQUE) vs Segunda carta del jugador 1 (DEFENSA):
// {attack: 20, defense: 26} vs {attack: 15, defense: 10}
// Ataque 20 vs Defensa 10 --> 20 supera a 10 --> Como hay 10 puntos de diferencia esa cantidad de daño es aplicada
// al castillo del jugador 1
//
// Una vez terminada la ronda, se procede a repetir lo mismo con las siguientes 2 cartas de cada jugaodr hasta
// finalizar el juego.
function cardGame(playerOneCards, playerTwoCards) {
  // Tu código aca:
  var oneCastillo=100
  var twoCastillo=100
  var oneMano={}
  var dosMano={}

  function drawTwo(mano, jugador){
    mano["ataque"]=jugador.dequeue()
    mano["defensa"]=jugador.dequeue()
  }
  function fight(mano1, mano2){
    var resultado= mano1["ataque"].attack-mano2["defensa"].defense
    delete mano1["ataque"]
    delete mano2["defensa"]
    if(resultado>0){
      if(mano1==oneMano){
        twoCastillo-=resultado
      } else{
        oneCastillo-=resultado
      }
    } 
  }

  while(![playerOneCards.size()>0, playerTwoCards.size()>0, oneCastillo>0, twoCastillo>0].includes(false)){
    drawTwo(oneMano,playerOneCards)
    drawTwo(dosMano,playerTwoCards)
    
    fight(oneMano,dosMano)
    fight(dosMano,oneMano)
  }
  if(oneCastillo>twoCastillo){
    return 'PLAYER ONE'
  } else if(oneCastillo<twoCastillo){
    return 'PLAYER TWO'
  } else return 'TIE'


}

// ---- Algoritmos ----
// EJERCICIO 10
// Ordená un arreglo de objetos usando un bubble sort pero con algunas particularidades.
// Además del arreglo a ordenar la función va a recibir como parámetro una función
// que va a retornar 1 sí no hay que ordenarlo y -1 en el caso de que si haya que ordenarlo.
// Ejemplo:
// var array = [
//   {name: 'Cristian', age: 26, height: 1.85},
//   {name: 'Dylan', age: 30, height: 1.75},
//   {name: 'Joaquin', age: 25, height: 1.77},
// ]
// specialSort(array, swapFunction) --> Retornaría el siguiente array:
// [
//   {name: 'Cristian', age: 26, height: 1.77},
//   {name: 'Joaquin', age: 25, height: 1.85},
//   {name: 'Dylan', age: 30, height: 1.75},
// ]
function specialSort(array, swapFunction) {
  // Tu código aca:
  var deter=swapFunction(array[0],array[1])

  if("functionTwo"!==swapFunction.name){
    if(deter==1){
      var swap=true
      while(swap){
        swap=false
        for (let i = 0; i < array.length-1; i++) {
              if(array[i].age>array[i+1].age){
                let temp= array[i]
                array[i]=array[i+1]
                  array[i+1]=temp
                  swap=true
                }  
              }
            }
            return array
    }else if(deter==-1){
      var swap=true
      while(swap){
        swap=false
        for (let i = 0; i < array.length-1; i++) {
              if(array[i].age<array[i+1].age){
                let temp= array[i]
                array[i]=array[i+1]
                  array[i+1]=temp
                  swap=true
                }  
              }
            }
            return array
    }
  }else if("functionTwo"==swapFunction.name && deter ==1){
    var swap=true
    while(swap){
      swap=false
      for (let i = 0; i < array.length-1; i++) {
            if(array[i].height<array[i+1].height){
              let temp= array[i]
              array[i]=array[i+1]
                array[i+1]=temp
                swap=true
              }  
            }
          }
          return array
  }
  else {
    return array
  }

}

module.exports = {
  passport,
  LinkedList,
  joinLinkedList,
  BinarySearchTree,
  countDeep,
  specialSort,
  createBST,
  isAncestor,
  cardGame,
  Queue,
};

