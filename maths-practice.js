/**
 * The program helps children in the 1st class of primary school (and above) to develop, train and improve their skills in mathematics
 * - subtraction.
 *
 * @author Jonatan Kazmierczak [Jonatan (at) Son-of-God.info]
 */

function usage() {
    const msg = `\

ERROR: missing parameters.

Requred parameter:
    maxNumber - defines range [0..maxNumber] for equations (i.e. 20)

Optional parameter:
    attemptsLimit - number of equations to try (default = 10)
`
    console.error(msg)
    process.exit(1)
}

const allowedMaxNumber = 100

function generateEquations(maxNumber) {
    const equations = []
    for (let i = 0; i <= maxNumber; i++)
        for (let j = 0; j <= i; j++)
            equations.push( { v1: i, v2: j, attempts: 0 } )
    return equations
}


const argv = process.argv
//console.log( argv )
let maxNumber = +argv[2]
const attemptsLimit = +argv[3] || 10

if (! maxNumber) usage()
maxNumber = Math.min( maxNumber, allowedMaxNumber )

const equations = generateEquations(maxNumber)
const equationsCount = equations.length
const solvedEquations = []
let currIdx = 0
let currItem
let attemptsTotal = 0

function showMistakes(equations, attemptsThreshold) {
    equations.filter( e => e.attempts > attemptsThreshold )
             .forEach( e => console.log( `(${e.attempts - attemptsThreshold})  ${e.v1} - ${e.v2} = ${e.v1 - e.v2}` ) )
}

function finish() {
    const summary = `\
***********************************
equations solved: ${solvedEquations.length}
attempts:  ${attemptsTotal}
success rate: ${ solvedEquations.length * 100 / attemptsTotal } %
***********************************
`
    console.log( summary )
    
    if (solvedEquations.length < attemptsTotal) {
        console.log( '\nincorrect attempts (how many?):' )
        showMistakes( solvedEquations, 1 )
        showMistakes( equations, 0 )
    }
    process.exit(0)
}

function nextEquation() {
    const equationsLen = equations.length
    if (!equationsLen || attemptsTotal == attemptsLimit) return finish()
    currIdx = Math.round( Math.random() * ( equationsLen - 1 ) )
    currItem = equations[ currIdx ]
    ++currItem.attempts
    ++attemptsTotal
    console.log( '' + currItem.v1 + ' - ' + currItem.v2 + ' = ?' )
}

function verify(input) {
    if (! /\d+/.test( input )) return  // prevention from accidental pressing enter
    let msg
    if ( currItem.v1 - currItem.v2 == input ) {
        msg = 'very good!'
        solvedEquations.push( currItem )
        equations.splice( currIdx, 1 )
    } else {
        msg = 'not good'
    }
    console.log(msg + '\n\n')
    
    nextEquation()
}

const stdin = process.stdin
stdin.resume()
stdin.setEncoding("ascii")
stdin.on("data", verify)

console.log(`${equationsCount} available equations\n`)
nextEquation()
