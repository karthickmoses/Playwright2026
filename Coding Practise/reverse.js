
let names = "Karthick Moses S";

let vowels= "aeiouAEIOU";
let vowelCount = 0;

for(let i =0; i<names.length; i++){
  if(vowels.includes(names[i])){
    vowelCount++;
      
  }
  
}
console.log("vowelsCount: "+vowelCount);

//Reverse a string without built-in.

let reverseName = "";

for(let i=names.length-1; i>=0; i--){
  reverseName+=names[i];
  
}
console.log("ReversedName:", reverseName);
