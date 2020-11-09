
function franson(){ //Calcular
    var dracukeo=document.getElementById('franson');
    var maxOmin=document.getElementById('maxOmin');
    var fullString='';
    if(maxOmin.value=='max'){
        fullString+='Maximize p= ';
    }else if(maxOmin.value=='min'){
        fullString+='Minimize p= ';
    }
    var numVariables=document.getElementById('numVariables');
    var numRes=document.getElementById('numRestricciones').value;
    for(let i=0;i<parseInt(numVariables.value);i++){
        var valorVariable=parseFloat(document.getElementById(`x${i+1}`).value);
        if(isNaN(valorVariable)){
            alert('Hay un valor que no es un numero en la funcion Objetivo')
            return;
        }
        //console.log(valorVariable)
        if(i==0){
            fullString+=`${valorVariable}x${i+1} `;
        }else{
            fullString+=`${valorVariable<0 ? valorVariable : ('+'+` ${valorVariable}`)}x${i+1} `
        }
    }
    fullString+='subject to\n';

    for(let a=0;a<parseInt(numRes);a++){
        for(let i=0;i<parseInt(numVariables.value);i++){
            var valorVariable=parseFloat(document.getElementById(`resx${i+1}Res${a}`).value);
            //console.log(valorVariable)
            if(isNaN(valorVariable)){
                alert('Hay un valor que no es un numero en las restricciones');
                return;
            }
            if(i==0){
                fullString+=`${valorVariable}x${i+1} `;
            }else{
                fullString+=`${valorVariable<0 ? valorVariable : ('+'+` ${valorVariable}`)}x${i+1} `
            }
        }
        var igualador=document.getElementById(`igualadorX${a+1}Res${a}`).value;
        fullString+=` ${igualador} `;
        var result= document.getElementById(`resX${a+1}Res${a}`).value;
        fullString+=`${result}\n`
    }

    dracukeo.value=fullString;

    // dracukeo.value=`Maximize p = (1/2)x + 3y + z + 4w subject to 
    // x + y + z + w <= 40
    // 2x + y - z - w >= 10
    // w - y >= 10`
    doIt(2); doIt(1);
    cambiarNombres();
}
function numeroDeVariables(){
    var limpiar=document.getElementById('todasRestricciones');
    limpiar.innerHTML='';
    var numVariables=document.getElementById('numVariables');
    if(isNaN(parseInt(numVariables.value))){
        return;
    }
    var content='Z = '
    for(let i=0; i<parseFloat(numVariables.value);i++){
        content+=`<input class="inputVar" type="number" step="any" id="x${i+1}"><label>X${i+1} ${i==parseInt(numVariables.value)-1 ? ' ' : '+'}</label>`
    }
    document.getElementById('funcObj').innerHTML=content;
    numeroDeRestricciones();
}
function numeroDeRestricciones(){
    var numVariables=document.getElementById('numVariables');
    var content='';
    var numRes=document.getElementById('numRestricciones');
    if(isNaN(parseInt(numRes.value))){
        return;
    }
    for(let a=0;a<parseFloat(numRes.value);a++){
        for(let i=0; i<parseFloat(numVariables.value);i++){
            content+=`<input class="inputRes" type="number" step="any" id="resx${i+1}Res${a}"><label>X${i+1} ${i==parseInt(numVariables.value)-1 ? ' ' : '+'} </label>`
        }
        content+=` <select id="igualadorX${a+1}Res${a}">
                    <option value="<="><=</option>
                    <option value=">=">>=</option>
                    <option value="=">=</option>
                </select>
                <input class="inputRes" id="resX${a+1}Res${a}" type="number" step="any"><br>`;
    }
    document.getElementById('todasRestricciones').innerHTML=content
}

setTimeout(()=>{
    numeroDeVariables();
},200)

function cambiarNombres(){
    var resText=document.getElementById('resultadoF');
    if (resText.value.indexOf('No optimal solution')!=-1){
        resText.value='No se encontro solucion';
    }else if(resText.value.indexOf('Optimal Solution')!=-1){
        ogText=resText.value;
        var texto='Z ';
        texto+=ogText.substring(ogText.indexOf('p =')+2,ogText.indexOf(';'));
        texto+='            ';
        texto+=ogText.substring(ogText.indexOf(';')+2,ogText.length);
        resText.value=texto;
    }else{
        resText.value='Error';
    }
    document.getElementById('solucion').style.visibility='visible'
    // document.getElementById('tablas').style.visibility='visible'
    // autosize(document.getElementById("areaTablas"));
    // autosize(document.getElementById("resultadoF"));
    ponerTabla();
}
var todasTablas=[];
function ponerTabla(){
    todasTablas=[];
    var tablas=document.getElementById('areaTablas').value;
    var everyTable=[];
    while(true){
        if(tablas.indexOf('Tabla')!=-1){
            tablas=tablas.substring(tablas.indexOf('Tabla')+9,tablas.length);
            if(tablas.indexOf('Tabla')!=-1){
                everyTable.push(tablas.substring(0,tablas.indexOf('Tabla')-2));
            }else{
                everyTable.push(tablas);
            }
        }else{
            break;
        }
    }
    //console.log(everyTable);
    html='';
    for(let i=0;i<everyTable.length;i++){
        html+=`<p>Tabla: ${i+1}</p>`
        html+=`<table class="table">`
        html+=crearRows(everyTable[i]);
        html+=`</table>`
    }
    todasTablas[todasTablas.length-1].pop();
    todasTablas[todasTablas.length-1].pop();
    console.log(todasTablas);
    document.getElementById('newTables').innerHTML=html;
}

function crearRows(unaTabla){
    var tablaUna=[]
    var primero=true;
    tableHtml=``;
    while(true){
        if(unaTabla.indexOf('\n')!=-1){
            var currentRow=unaTabla.substring(0,unaTabla.indexOf('\n'));
            unaTabla=unaTabla.substring(unaTabla.indexOf('\n')+1,unaTabla.length);
            tableHtml+=`<tr>`
            var unRenglon=[]
            while(true){
                    if(currentRow.indexOf('|')!=-1){
                        oneItem=currentRow.substring(0,currentRow.indexOf('|'));
                        //console.log(oneItem)
                        currentRow=currentRow.substring(currentRow.indexOf('|')+1,currentRow.length);
                        if(isNaN(parseFloat(oneItem))){
                            tableHtml+=`<th class="table">${oneItem}</th>`;
                            unRenglon.push(oneItem)
                        }else{
                            tableHtml+=`<td class="table">${oneItem}</td>`;
                            unRenglon.push(parseFloat(oneItem))
                        }
                    }else{
                        //console.log('me salgo');
                        break;
                    }
                }
            tablaUna.push(unRenglon);
            tableHtml+=`</tr>`;
        }else{
            currentRow=unaTabla;
            var unRenglon=[]
            while(true){
                if(currentRow.indexOf('|')!=-1){
                    oneItem=currentRow.substring(0,currentRow.indexOf('|'));
                    currentRow=currentRow.substring(currentRow.indexOf('|')+1,currentRow.length);
                    tableHtml+=`<td class="table">${oneItem}</td>`;
                    unRenglon.push(parseFloat(oneItem))
                }else{
                    //console.log('me salgo2')
                    break;
                }
            }
            tablaUna.push(unRenglon);
            todasTablas.push(tablaUna);
            break;
        }
    }
    return tableHtml;

}