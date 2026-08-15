const numbers =[1,2,3,4,5,6]


// function doubleEvenNumbers(numbers:number[]):number[]{
//    return numbers.filter((number)=>number%2===0).map((number)=>(number*2))
// }
function doubleEvenNumbers(numbers:number[]):number[]{
   return numbers.reduce((result:number[],number)=>{
    if(number%2===0)
result.push(number*2)
    return result
   }, [])
}

function add(numbers:number[]):number{

    return numbers.reduce((result:number,number)=>{
        return result+number
    },0)
}


const double =doubleEvenNumbers(numbers);
console.log(double)