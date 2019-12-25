# mini-jsEngine

Javascript interpreter implemented by javascript.

#### Supported features:

1. Fundamental operation:
   
   ```
   a=5;
   if a==5 {
   b=1;
   -b
   }  
   // return -1                     
   ```
   
   > for simplicity, there are some differences in gramma comparing to javascript:
   > 
   > 1. statements should not miss semicolons if there are not the last in their blocks;
   > 
   > 2. there are no `return`s, the value of last statement will be treated as the block's return value;
   > 
   > 3. there are no brackets in if / while's condition statements.

2. Function and Closure:
   
   ```
   func counter (c) {
   closure () {
     c = c + 1
   }
   };
   
   c1 = counter (0);
   c2 = counter (0);
   
   c1(); // return 1
   c1(); // return 2
   c2()  // return 1
   ```
   
   > Definitions of Function and Closure differ for the sake of a simpler parser.

3. Native Function:
   
   ```
   log ("123") // console.log("123")
   ```

4. Class:
   
   ```
   class Position {
     x = y = 0;
     func move (nx, ny) {
       x = nx;
       y = ny
     }
   };
   p = Position.new;
   p2 = Position.new;
   p.move(3, 4);
   p.x = 10;
   
   log(p2.y); // 0
   log(p.x + p.y) // 7
   ```
   
   > a class's `new` property aims to instantiate a object.

5. Array:
   
   ```
   a = [2, 3, 4];
   log(a[1]); // 3
   a[1] = "three";
   log(a);    // [2, "three", 4]
   log("a[1]: " + a[1]);
   b = [["one", 1], ["two", 2]];
   log(b[0][0] + ": " + b[1][1])
   ```



#### Interpreter optimization:

1. Variable access optimization
   
   In function (and closoure) variables are stored in a map-type env whose access is ineffective compared to a array. Lookup variables and determine their positions in the array-type env before evaluation is one approach to optimization.

2. Class optimization
   
   Variable access optimization can be applied to object instantiated from Class as well, but only works when the Class is determined. For simplicity, when vatiables are accessed from `this`, it's safe to do the optimization.
   
   Storing methods and properties in ClassObj(prototype) but not in object itself is another way to optimization. 

3. Virtual machine
   
   The evaluator costs lot of time going back and forth travseing the ast to generate the result. Compiling a ast to vm code can be considered as the optimization of the ast.

#### Implementation details:

Mini-jsEngine consists of three parts like other interpreters: lexer, parser and evaluator(optimization will introduce a optimizer before the evaluator). 

The lexer generates tokens(or words); the parser transforms tokens to a ast; the evaluator traverses the ast and output the result(the optimizer traverses the ast in advance and store information for later use).

These parts are connected by streams.


