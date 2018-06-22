'use strict'

function generate(testLengthArray)
{
  var arrTest=[];
  
  for(var i=0; i< testLengthArray.length; i++ ) 
  {
    var input=[];
    for(var j =0; j< testLengthArray[i]; j++ )
    {
       input[j] = Math.floor(Math.random() * 10000) - 10000;
     }
    

    var target;
     if(testLengthArray.length>=4)
    {
      if(i==0)
      {
        target = 10002;
      }
      if(i==1)
      {
        target = input[0];
      }
      if(i==2)
      {
        target = input[testLengthArray[2]-1];
      }
      else
      {
        target= Math.floor(Math.random()*10000) - 10000;
      }
    }
    else
    {
      target= Math.floor(Math.random()*10000) - 10000;
    }

    var output;
    output= input.indexOf(target);
    arrTest[i] = {"input" : input,
              "target": target,
              "output": output};
    
  }
  return arrTest;
}


module.exports = generate
