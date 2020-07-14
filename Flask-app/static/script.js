console.log("Why hello there");
var table, th, data, numvals;

//The base edpoint for querying pokemon data
const Http = new XMLHttpRequest();
const RESTurl= String(window.location).slice(0,-3) + 'poke';

//Initialization of the table and sorting  capabilities
table= document.getElementById('pokedex');
th = document.getElementsByTagName('th');
for(let c = 0; c<th.length;c++){
    th[c].addEventListener('click',retAxis(th[c].innerHTML));
}
//This is called by pressing the "Who's that pokemon" button in the pokedex browser
//SubmitQuery() checks the status of each checkbox and then builds and submits a request with the appropriate arguments
function SubmitQuery(){
    ClearTable();
    var gens = '', types = '';
    if (document.getElementById('gen1').checked){
        gens = gens + '1,';
    }
    if (document.getElementById('gen2').checked){
        gens = gens + '2,';
    }
    if (document.getElementById('gen3').checked){
        gens = gens + '3,';
    }
    if (document.getElementById('gen4').checked){
        gens = gens + '4,';
    }
    if (document.getElementById('gen5').checked){
        gens = gens + '5,';
    }
    if (document.getElementById('gen6').checked){
        gens = gens + '6,';
    }
    if (document.getElementById('bug').checked){
        types = types + 'Bug,';
    }
    if (document.getElementById('dark').checked){
        types = types + 'Dark,';
    }
    if (document.getElementById('dragon').checked){
        types = types + 'Dragon,';
    }
    if (document.getElementById('fairy').checked){
        types = types + 'Fairy,';
    }
    if (document.getElementById('fighting').checked){
        types = types + 'Fighting,';
    }
    if (document.getElementById('fire').checked){
        types = types + 'Fire,';
    }
    
    if (document.getElementById('electric').checked){
        types = types + 'Electric,';
    }
    if (document.getElementById('flying').checked){
        types = types + 'Flying,';
    }
    if (document.getElementById('ghost').checked){
        types = types + 'Ghost,';
    }
    if (document.getElementById('grass').checked){
        types = types + 'Grass,';
    }
    if (document.getElementById('ground').checked){
        types = types + 'Ground,';
    }
    if (document.getElementById('ice').checked){
        types = types + 'Ice,';
    }
    if (document.getElementById('normal').checked){
        types = types + 'Normal,';
    }
    if (document.getElementById('poison').checked){
        types = types + 'Poison,';
    }
    if (document.getElementById('psychic').checked){
        types = types + 'Psychic,';
    }
    if (document.getElementById('rock').checked){
        types = types + 'Rock,';
    }
    if (document.getElementById('steel').checked){
        types = types + 'Steel,';
    }
    if (document.getElementById('water').checked){
        types = types + 'Water,';
    }
    if(gens != ''){
        gens = gens.slice(0,-1);
    }
    if (types != ''){
        types = types.slice(0,-1);
    }
    LoadDB(RESTurl + '?gens=' + gens + '&types=' + types);
}

//This function recieves the JSON data returned by the http request and populates the pokedex table
function LoadDB(_url){
console.log("Requesting data at endpoint " + _url)
Http.open("GET",_url);
Http.send();
Http.onreadystatechange = function() {
    if (Http.readyState == 4){
        var raw = Http.responseText;
        console.log('Raw:' + raw);
        data = JSON.parse(raw);
        console.log('json returned: ' + data)
        numvals = Object.keys(data['#'])
        //by default, the table is sorted by pokedex number
        console.log(data);
        numvals.forEach(PopulatePokedexEntry);
    }
};
}

//Called when the user clicks on the header of the table, calls the sorting algorithm with the header as a parameter
function retAxis(c){
    return function(){
        sortTable(c)
    }
}

//Sorts the entries of the table based on a supplied parameter
function sortTable(_col) {
    var valsToSort = [];
    console.log('sorting table based on pokemon\'s ' + _col);
    for(var i = 0; i < numvals.length; i++){
        valsToSort.push([numvals[i], data[_col][numvals[i]]]);
        //records the index of an entry along with its associated feature
    }
    ClearTable();
    valsToSort = mergesort(valsToSort);
    for (var i = 0; i < valsToSort.length; i++){
        PopulatePokedexEntry(valsToSort[i][0])
    }
}

//Clears table, important for sorting and making new queries
function ClearTable(){
    var rows = table.rows;
    for(var i = rows.length-1; i > 0; i--){
        table.deleteRow(i)
    }
}

//Standard mergesort, this was chosen because of its speed
function mergesort(_arr){
    if (_arr.length < 2){
        return _arr
    }
    const midpoint = Math.floor(_arr.length/2);
    const leftHalf = _arr.slice(0,midpoint);
    const rightHalf = _arr.slice(midpoint, _arr.length);
    return Combine(mergesort(leftHalf), mergesort(rightHalf));
}

function Combine(_left,_right){
    let runningAns = [], lIndex = 0, rIndex =0, numCompare = !isNaN(parseInt(_left[0][1]));
    //If the second argument (the feature to sort by) is a number, it will be pared as an integer
    //If not, it will be treaded like a string
    while(lIndex < _left.length && rIndex < _right.length){
        if (numCompare){
            if(parseInt(_left[lIndex][1]) < parseInt(_right[rIndex][1])){
                runningAns.push(_left[lIndex]);
                lIndex++;
            }else{
                runningAns.push(_right[rIndex]);
                rIndex++;
            }
        }else{
            if(_left[lIndex][1] < _right[rIndex][1]){
                runningAns.push(_left[lIndex]);
                lIndex++;
            }else{
                runningAns.push(_right[rIndex]);
                rIndex++;
            }
    }
    }
    return runningAns.concat(_left.slice(lIndex, _left.length)).concat(_right.slice(rIndex, _right.length));
    //If the length of _left and _right are different, there will be 1 extra entry at the end; The biggest value by definition
}

//Adds an entry to the table based on its index 
function PopulatePokedexEntry(_index){
    _index = parseInt(_index);
    var newEntry = table.insertRow(-1);
        var numb = newEntry.insertCell(-1);
        numb.innerHTML = data['#'][_index];
        var name = newEntry.insertCell(-1);
        name.innerHTML = data['Name'][_index];
        var type1 = newEntry.insertCell(-1);
        type1.innerHTML = data['Type 1'][_index];
        var type2 = newEntry.insertCell(-1);
        type2.innerHTML = data['Type 2'][_index];
        var Total = newEntry.insertCell(-1);
        Total.innerHTML = data['Total'][_index];
        var HP = newEntry.insertCell(-1);
        HP.innerHTML = data['HP'][_index];
        var Attack = newEntry.insertCell(-1);
        Attack.innerHTML = data['Attack'][_index];
        var Defence = newEntry.insertCell(-1);
        Defence.innerHTML = data['Defence'][_index];
        var spatk = newEntry.insertCell(-1);
        spatk.innerHTML = data['Special Attack'][_index];
        var spDef = newEntry.insertCell(-1);
        spDef.innerHTML = data['Special Defence'][_index];
        var speed = newEntry.insertCell(-1);
        speed.innerHTML = data['Speed'][_index];
        var gen = newEntry.insertCell(-1);
        gen.innerHTML = data['Generation'][_index];
        var name = newEntry.insertCell(-1);
        name.innerHTML = data['Legendary'][_index];
}