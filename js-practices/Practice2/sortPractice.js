'use strict'
//var input =[8662, 7484, -4488, 99, -3625, -5847, 1162, 3950, 205];
function sort(input) {
  for(var i = 0; i<9;i++)
  {
    for(var j = 0; j<i;j++)
    {
      if(input[i]< input[j])
      {
        let tg=input[i];
        input[i]=input[j];
        input[j]=tg;
      }
    }
  }
  return input;
}
//console.log(sort(input));

module.exports = sort