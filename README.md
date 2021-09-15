# Mathematics training for primary school

This artificial intelligence (AI) solution helps children in the primary school to develop, train and improve their skills in mathematics.

## Info
- level: primary school, 1st class and above
- scope: addition, subtraction and multiplication of numbers within the given range

## Requirements
The solution requires the latest version of [Node.js](https://nodejs.org).

## Usage examples

### Sample invocations
Invocations take place in a shell / command line.

* addition of numbers up to 50 (maximum value is 50 + 50 = 100), 5 tries
```
node maths-practice.js 50 + 5
```

* subtraction of numbers up to 100 (maximum value is 100 - 0 = 100), 10 tries
```
node maths-practice.js 100 - 10
```

* multiplication of numbers up to 10 (maximum value is 10 * 10 = 100), 5 tries
```
node maths-practice.js 10 "*" 5
```

### Sample session
```
  22
+ 49
~~~~
  71
very good!


  41
+  6
~~~~
  47
very good!


  46
+ 18
~~~~
  64
very good!


  18
+ 21
~~~~
  39
very good!


  20
+ 27
~~~~
  48
not good


***********************************
solved correctly: 4
attempts:  5
success rate: 80 %
***********************************

Incorrect answers (1):
20 + 27 = 47
```
