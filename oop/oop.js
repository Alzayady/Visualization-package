// let x = {
//     name :"ahmed", 
//     last: 'ayman',

// const { create } = require("hbs");

//     getFullName : function(){
//         return `Full Name : ${x.name}`
//     }

// } 
// console.log(x.getFullName())
// console.log(String.prototype)
// function User(name , age){
//      this.name ='#'+name;
//      this.age = age;
//      this.printHello=function(){
//          console.log(`Hello ${name}`)
//      }
// }
// let ob1 = new User("ahmed" , 20)
// console.log(ob1);
// console.log(User.prototype)

// console.log('#'.repeat(100))





// function  beeeb(b){
//    this.b = b ;
// }
// function Car(a , b ){
//      this.a = a;
//      this.beeeb = new beeeb(b);
// }
// let car = new Car(2,10)
// console.log(car)
// console.log(car.beeeb.b)

// change =(be)=>{
//     be.b = 15;
// }
//  change(car.beeeb)
// console.log(car)


// function callback(num, func) {
//     for(var i = 0; i < num; i++) {
//         console.log("here")
//     }
//     func()
// }


// function myLogger(message){
//     return function(){
//         console.log(message);
//     }      
// }

// callback(4, myLogger('hello'));


// function admin(){
//     this.a = 1 ;
//     this.b = 2 ;

// }
// class admin {
//     constructor(a , b ){
//         this.a = a ;
//         this.b = b ;
//         console.log("here in first")
//     }
//     constructor(a){
//         this.a = a;
//         console.log("here in overload constaractor")
//     }
//     add(){
//         this.a++;
//     }
// }
// class second extends admin{
//     constructor(a,b){
//       super(a,b)
//       console.log("here in second")
//     }
//     add_b(){
//         this.b++;
//     }
// }
// let ob1 = new admin(5,10);
// console.log(ob1)
// ob1.add();
// console.log(ob1);
// ob1.add_b();
// console.log(ob1);

// let x = {
//      a : 10, 
//      b :15
// }
// let y = Object.create(x)
// console.log(y.a)

// do_a=  function(){
//     console.log("start")
//     s = 0 
//     for( i = 0 ; i < 100000000 ; i ++){
//          s+=i;
//     }
//     console.log("end")

// }

//  do_b=()=>{
//     console.log("here in b")
// }
// do_a()
// do_b()

// function inner_clone(src , clonned){
//     for(let i in src){
//        console.log(i , src[i])
//        console.log(typeof src[i])
//     }
// }

// function clone_object(src){
//   let clonned = {}
//   inner_clone(src , clonned);
//   return clonned;
// }

// let x = {
//     a  : 10 ,
//     b  : 11 , 
//     c  : [
//         1 , 2 , 3 
//     ]
// }
// let y = clone_object(x);
// console.log(y)


let a = {
    x :10, 
    b : 5
}
a.c = 20;
let y = Object.create(a);
console.log(y)
console.log(y.c)