/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. is it a function called by new?
* 2. using bind call or apply
* 3. is it a global function?
* 4. are you calling a method?

*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
var myFunction = function() {
   console.log(this);
}

myFunction();
// Principle 2

// code example for Implicit Binding
function foo(){
	console.log(this.a);
}

var obj = {
	a:2,
	foo:foo
};

obj.foo();
// Principle 3
function Foo() {

	  this.name = 'bar';
		this.say = function () {
		return "I am " + this.name;
	   };
}

var name = 'foo';
var result = new Foo();
console.log(result.name);

// code example for New Binding

// Principle 4

// code example for Explicit Binding

function greet() {
	console.log(this.name);
}

var person = {
	name:'bar'
}

greet.call(person, arg1, arg2, arg3, ...);
