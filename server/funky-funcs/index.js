const intersection = (arr1, arr2) => {
  let intersection = arr1.filter(x => arr2.includes(x));
  return intersection
}

const flattenDeep = (arr) => {
    const flat = [];

    arr.forEach(ele => {
      if (Array.isArray(ele)) {
        flat.push(...flattenDeep(ele));
      } else {
        flat.push(ele);
      }
    });

    return flat;
  }
  const flipArguments = func => (...args) => func(...args.reverse())


const invert = (obj) => {
  let newObj = {}
for(let key in obj){
  newObj[obj[key]] = key
  }
  return newObj
}

const camelCase = (str) => {
  let newStr = ''
  let cap = false
  str=str.toLowerCase()
for(let i = 0; i<str.length; i++){
  if(str[i]===' ' || str[i] ==='_'){
    cap = true
    continue;
  }
  if(newStr.length === 0){
    newStr+=str[i].toLowerCase()
    cap = false
    continue;
  }
    if(cap){
    newStr += str[i].toUpperCase()
    cap = false
  } else {
    newStr += str[i]
  }
}
return newStr
}

module.exports = {
  intersection,
  flattenDeep,
  flipArguments,
  invert,
  camelCase
}
