// function sayHi(greeting, appeal) {
//     console.log(`${greeting} ${appeal} ${this.name}!`)
// }
//
// let user = {name: "John"}
// let admin = {name: "Jack"}
//
// // fun.bind(newThis , ...args)
// sayHi.bind(user, "Hello", "friend")()
// sayHi.bind(admin, "Hi", "colleague")()
//
// // fun.call(newThis , ...args) - то же, что и bind, но сразу вызывается
// sayHi.call(user, "Hello", "friend")
// sayHi.call(admin, "Hi", "colleague")
//
// // fun.apply(newThis , [args]) - то же, что и call, но аргументы передаются в виде массива
// sayHi.apply(user, ["Hello", "friend"])
// sayHi.apply(admin, ["Hi", "colleague"])
//
// // Результат:
// // Hello friend John!
// // Hi colleague Jack!

// const array = [1, 2, 3, 4, 5]
//
// console.log(
//       [...array].map(array.pop, array)
// )

// const str = "abcde"
//
// function reverse(str) {
//     const arr = []
//     for (let i = str.length - 1; i >= 0; i--) {
//         arr.push(str[i])
//     }
//     return arr.join("")
// }
//
// console.log(
//       reverse(str)
// )

// const str = "ghyjjdttwt"
//
// let result = new Set()
// let dict = new Set()
// dict.add(str[0])
//
// for(let i= 1; i < str.length; i++) {
//     if(dict.has(str[i])){
//         result.add(str[i])
//     }
//     dict.add(str[i])
// }
//
// console.log(Array.from(result))

// const str = "ghyjjdttwt"
//
// let dict = new Set()
//
// let arr = [...str]
// arr.forEach(() => {
//     dict.add(str[el])
// })

// for(let i= 1; i < str.length; i++) {
//     if(dict.has(str[i])){
//         result.add(str[i])
//     }
//     dict.add(str[i])
// }
//
// console.log(Array.from(result))


// написать функцию которая принимает на вход строку и печатает в консоль ее в перевернутом виде
// fn(str) -> "ytrewq";

//const str = "qwerty";

//function reversString(str) {
//return [...str].reverse().join("")
//}

//console.log(reversString(str))

// определить повторяющиеся символы в строке и вывести их в массиве
// fn(str) -> ['l', 'o'];

// const str = "hello world";
//
// let dictionary = new Set()
// dictionary.add(str[0])
// let result = []
//
// for(let i = 1; str.length - 1; i++) {
//     if (dictionary.has(str[i])) {
//         result.push(str[i])
//     }
//     dictionary.add(str[i])
// }
//
// console.log(result)



// // напишите функцию, которая принимает матрицу 3х3 и переворачивает на 90 градусов по часовой стрелке.
// // [1, 2, 3]    [7, 4, 1]
// // [4, 5, 6] -> [8, 5, 2]
// // [7, 8, 9]    [9, 6, 3]
//
// const matrix = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//     [10, 11, 12]
// ]
//
// function rotateMatrix(matrix) {
//     const rotatedMatrix = matrix[0].map(() => [])
//     for(let row = matrix.length - 1; row >= 0; row--) {
//         for(let col = 0; col < matrix[row].length; col++) {
//             rotatedMatrix[col][matrix.length - row - 1] = matrix[row][col]
//         }
//     }
//     return rotatedMatrix
// }
//
// console.log(rotateMatrix(matrix))
