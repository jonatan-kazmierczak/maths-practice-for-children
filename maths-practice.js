/**
 * The program helps children in the 2nd class of primary school (and above) to develop, train and improve their skills in mathematics.
 *
 * @author Jonatan Kazmierczak [Jonatan (at) Son-of-God.info]
 */

class Practice {
    paramRange
    operator
    attemptsLimit
    allowedOperators = [ '+', '-', '*' ]
    
    equations = []
    wrongAnswers = []
    attempts = 0
    correctAnswers = 0
    
    constructor( paramRange, operator, attemptsLimit ) {
        this.paramRange = paramRange
        this.operator = operator
        this.attemptsLimit = attemptsLimit
    }
    
    isValid() {
        return this.paramRange && this.attemptsLimit && this.allowedOperators.includes( this.operator )
    }
    
    createNextEquation() {
        if ( this.equations.length === this.attemptsLimit ) return undefined
        const p1 = Math.round( Math.random() * this.paramRange )
        const v2 = this.operator == '-' ? p1 : this.paramRange
        const p2 = Math.round( Math.random() * v2 )
        const eq = { p1, p2 }
        this.equations.push( eq )
        return eq
    }
    
    evaluateEquation(eq) {
        return eval( this.equationToString(eq) )
    }
    
    equationToString(eq) {
        return `${eq.p1} ${this.operator} ${eq.p2}`
    }
    
    validateAnswer(answer) {
        ++this.attempts
        const eq = this.equations[ this.equations.length - 1 ]
        const ok = this.evaluateEquation(eq) === answer
        if (ok) ++this.correctAnswers
        else this.wrongAnswers.push(eq)
        return ok
    }
}

// ---- Functions

function usage() {
    const msg = `\

ERROR: missing or invalid parameters.

Required parameters:
    parameterRange - defines range [0..parameterRange] for parameters of equations
    operator - mathematical operator: + - *
    attemptsLimit - number of equations to try

Sample values:
    50 - 5
    10 "*" 5
`
    console.error(msg)
    process.exit(1)
}

function verify(input) {
    if (! /\d+/.test( input )) return  // prevention from accidental pressing enter
    const ok = practice.validateAnswer( +input )
    const msg = ok ? 'very good!' : 'not good';
    console.log(msg + '\n\n')
    
    nextEquation()
}

function formatEquation(eq) {
    const p1str = String( eq.p1 )
    const p2str = String( eq.p2 )
    const len = Math.max( p1str.length, p2str.length ) + 2
    return `\
${ p1str.padStart(len) }
${ practice.operator } ${ p2str.padStart(len - 2) }
${ '~'.repeat(len) }`
}

function finish() {
    const summary = `\
***********************************
solved correctly: ${practice.correctAnswers}
attempts: ${practice.attempts}
success rate: ${ practice.correctAnswers * 100 / practice.attempts } % \
`
    console.log( summary )
    console.timeEnd( 'duration' )
    console.log( '***********************************' )
    
    const wrongCount = practice.wrongAnswers.length
    if (wrongCount) {
        console.log( `Incorrect answers (${wrongCount}):` )
        for (let eq of practice.wrongAnswers) {
            console.log( practice.equationToString(eq) + ' = ' + practice.evaluateEquation(eq) )
        }
    }
    process.exit(0)
}

function nextEquation() {
    const eq = practice.createNextEquation()
    if ( !eq ) finish()
    console.log( formatEquation(eq) )
}

// ---- Main part

const args = process.argv.slice(2)
const practice = new Practice( +args[0], args[1], +args[2] )
if ( !practice.isValid() ) usage()
process.stdin.on("data", verify)
nextEquation()
console.time( 'duration' )
