var proxyScrap=[
  "http://127.0.0.1:8967",
  "https://cors-anywhere.herokuapp.com/"
];
var whichTittle = new WhichX();

var newsQueryToSearch;
var SourceTittle=[
  {
    url:proxyScrap[0]+"/https://news.google.com/search?q="+newsQueryToSearch+"&hl=es-419&gl=CO&:es-419&ceid=CO:es-419",
    name:"Busqueda Personalizada"
  },
{
  url:proxyScrap[0]+"/https://news.google.com/topstories?hl=es-419&gl=MX&ceid=MX:es-419",
  name:"Google News Mèxico"
},
{
  url:proxyScrap[0]+"/https://news.google.com/topstories?hl=es-419&gl=AR&ceid=AR:es-419",
  name:"Google News Argentina"
},
{
  url:proxyScrap[0]+"/https://news.google.com/topstories?hl=es-419&gl=EN&ceid=EN:es-419",
  name:"Google News Estados Unidos"
},
{
  url:proxyScrap[0]+"/https://news.google.com/topstories?hl=es-419&gl=VE&ceid=VE:es-419",
  name:"Google News Venezuela"
}
];

$("#TopMenuSelect").html(`
  <div class="row mx-auto" style="padding:1em;">
    <div class="col">
      <span>CATEGORIA/TITULO</span>
      <input id="newsQueryToSearch" type="text" value="CATEGORIA">
    </div>
    <div class="col">
      <span>FUENTE DE NOTICIAS</span>

      <select id="selectNewSource" >
      </select>



    </div>
    <div class="col">
      <span>¿AutoAprendizaje?</span>
      <select >
        <option value="" selected>SI</option>
        <option value="" >NO</option>
      </select>
    </div>
    <div class="col">
      <span>IDIOMA</span>
      <select id="langSelect">
        <option value="en" selected>en</option>
        <option value="es" >es</option>
      </select>
    </div>
    <div class="col">
      <span>Location</span>
      <select id="locSelect">
        <option value="mx" selected>mx</option>
        <option value="ve" >co</option>
      </select>
    </div>
  </div>
  <div class="row">
  <a id="selectNewSourceButton" class="btn btn-lg btn-primary">Inteligencia!</a>
  </div>
  `);

// $("#selectNewSource").change(
//
// );
$('#selectNewSourceButton').on('click', function() {
   // alert( this.value );
   // if (whichTittle.addLabels(newsQueryToSearch)) {
   //   console.log(newsQueryToSearch+" Añadido con exito");
   // }else{
   //   console.log("ERROR con"+newsQueryToSearch);
   //
   // }
   axiosQuery($("#selectNewSource")[0].value,el1,"h3","h4")
   // getBetterTittleInterval();

  });
  $('#newsQueryToSearch').on('input', function() {
     // alert( this.value );
    // readNews();

    newsQueryToSearch=$("#newsQueryToSearch")[0].value;
    var urltoUpdate=proxyScrap[0]+"/https://news.google.com/search?q="+newsQueryToSearch+"&hl=es-419&gl=EN&:es-419&ceid=EN:es-419";
    // var urltoUpdate=proxyScrap[0]+"/https://news.google.com/search?q="+newsQueryToSearch+"&hl=en-US&gl=US&ceid=US:en";


    SourceTittle[0].url=urltoUpdate;
setTimeout(reloadList(),100);


    });


    var o=0;



function reloadList(){
  $("#selectNewSource")[0].innerHTML="";
  for (var i = 0; i < SourceTittle.length; i++) {
    var selected;

      if (i===1) {
        selected="selected";
      }else{
        selected="";
      }


    $("#selectNewSource")[0].innerHTML+=`
    <option value="${SourceTittle[i].url}" ${selected}>${SourceTittle[i].name}</option>
    `;
  }

};
reloadList();


var el1 = $( '<div></div>' );

var h3Tittle,h4Tittle;
// All the anchor elements
//h3, h4
var tittlesLength;
var newsLoaded=false;
var arrayNotes=[];
function axiosQuery(url,el,select1,select2,select3){
arrayNotes=[];
  newsLoaded=false;
  document.getElementById("infoPage").innerHTML="";
  var axiosparams=new URLSearchParams();
  // axiosparams.append('hl', "es-419");
  // axiosparams.append('gl', "MX");
  // axiosparams.append('ceid', "MX:es-419");

  axios({
    method: 'get',
    url: url,
    data: axiosparams
  }).then(function(response){
    el.html(response.data);
    if (select1) {
      select1R=$(select1, el);
      for (var i = 0; i < select1R.length; i++) {
        document.getElementById("infoPage").innerHTML+=`
        <div class="row" id="${select1}-${i}">
        <div class="col">
        ${select1R[i].innerText}
        </div>
        <div class="col note"  note="yes" notev="1" notet="1" target="#${select1}-${i}" id="${i}-note-${select1}">
        </div>
        <div class="col category" category="yes" >${newsQueryToSearch}
        </div>
        </div>
        `;
        // setTimeout();ç
        // whichTittle.addData(newsQueryToSearch, select1R[i].innerText);
        // AddNewDataTextClassify(select1R[i].innerText,newsQueryToSearch)
// execute every 10 sec by now

arrayNotes=[...arrayNotes,{
  id1:select1R[i].innerText,
  id2:"#"+i+"-note-"+select1,
  id3:i,
  id4:"-note-"+select1,
  category:newsQueryToSearch
}];
        // getTitleNote(select1R[i].innerText,"#"+i+"-note-"+select1,i,"-note-"+select1);
      }
    }
    if (select2) {
      select2R=$(select2, el);
      for (var i = 0; i < select2R.length; i++) {
        document.getElementById("infoPage").innerHTML+=`
        <div class="row" id="${select2}-${i}">
        <div class="col innerText">
        ${select2R[i].innerText}
        </div>
        <div class="col note" note="yes" notev="1" notet="1" target="#${select2}-${i}" id="${i}-note-${select2}">
        </div>
        <div class="col category" category="yes" >${newsQueryToSearch}
        </div>

        </div>
        `;
        // AddNewDataTextClassify(select2R[i].innerText,newsQueryToSearch)
        // whichTittle.addData(newsQueryToSearch,select2R[i].innerText);
        arrayNotes=[...arrayNotes,{
          id1:select2R[i].innerText,
          id2:"#"+i+"-note-"+select2,
          id3:i,
          id4:"-note-"+select2,
          category:newsQueryToSearch
        }];
        // getTitleNote(select2R[i].innerText,"#"+i+"-note-"+select2,i,"-note-"+select2);

      }
    tittlesLength=select1R.length+select2R.length;
    }
    // if (select3) {
    //   select3R=$(select3, el);
    //   for (var i = 0; i < select3R.length; i++) {
    //     document.getElementById("infoPage").innerHTML+=select3R[i].innerText+" - "+select3+"<br>";
    //   }
    // }
    // console.log(response.data);
    o=0;

    setTimeout(function(){
    loadNotes();
    },1000);
  });


}
// var allnewsFinished=false;
function loadNotes(isfinished=false){

  if (isfinished==true) {
    for (var i = 0; i < arrayNotes.length; i++) {
    AddNewDataTextClassify(arrayNotes[i].id1,arrayNotes[i].category,JSON.stringify(arrayNotes[i].jsontoscrap),arrayNotes[i].nota);
    }
  }

if (o<arrayNotes.length&&arrayNotes[o]) {
  getTitleNote(arrayNotes[o].id1,arrayNotes[o].id2,arrayNotes[o].id3,arrayNotes[o].id4);
setTimeout(function(){
o++;
loadNotes();
},600);
}else{
  // allnewsFinished=true;
  console.log("TERMINADO EN"+o);
// AddNewDataTextClassify(dataSet,tolabel)
//se enviaria los datos obtenidos a la base de datos,
getBetterTittle();



}
}

function UpdateDBnews(){
  for (var i = 0; i < arrayNotes.length; i++) {
  var minNote=largestNote*0.70;
    if (arrayNotes[i].nota>minNote) {
      AddNewDataTextClassify(arrayNotes[i].id1,arrayNotes[i].category,JSON.stringify(arrayNotes[i].jsontoscrap),arrayNotes[i].nota);
      console.log(arrayNotes[i].id1);
      console.log("Noticia Guardada");
    }else{
      console.log(arrayNotes[i].id1);
      console.log("NO GUARDADO POR POCO INTERES");
    }
  }
}

var notesArray=[];
var largestNote,largestTittle;
function getBetterTittle(){
  notesArray=[];
  getDATA=$(".note[note='yes']")

  for (var i = 0; i < getDATA.length; i++) {
    var note=parseInt(getDATA[i].innerText);
    if (isNaN(note)) {
      // console.log("ERROR con"+note+" - "+getDATA[i].innerText);
    }else{
      notesArray.push(note);
    }
  }
   largestNote = notesArray.sort((a,b)=>a-b).reverse()[0];
    largestTittle = $(".note[notev='"+largestNote+"']").attr("notet")
   // largestTittle=
    $("#betterTittle").html(largestTittle);
    console.log(largestNote);
console.log(largestTittle);
setTimeout(function(){
  UpdateDBnews();
  newsLoaded=true;
},400);
}





var resultStatsGET,resultStats2,resultStats;
var betterTittle;
var jsonToScrapLinks=[];
function getTitleNote(titulo,id,n,div){
  jsonToScrapLinks=[];
  var result = $( '<div></div>' );
  // var urlNote=proxyScrap[0]+"/https://www.google.com/search?q="+encodeURIComponent(titulo);
  var urlNote=proxyScrap[0]+"/https://www.bing.com/search?q=prueba"+encodeURIComponent(titulo);
// b_tween
// sb_count
 // var urlNote=proxyScrap[0]+"/https://www.google.com/search?q="+encodeURIComponent(titulo);
 // result-count id a buscar
// var urlNote=proxyScrap[0]+"/https://www.google.com/search?q="+encodeURIComponent(titulo)+"&rlz=1C1CHBF_esES884ES884&oq=hjghjg&aqs=chrome..69i57j0l7.535j0j4&sourceid=chrome&ie=UTF-8";
// var urlNote=proxyScrap[0]+"/https://www.google.es/search?sxsrf=ALeKk01hzg_4pEWFL7S0V_-ud-KKsaXwTw%3A1596989532450&ei=XCAwX6n8GtHbgwfd7YrgDw&q="+encodeURIComponent(titulo)+"&oq="+encodeURIComponent(titulo)+"&gs_lcp=ChNtb2JpbGUtZ3dzLXdpei1zZXJwEAMyBAgjECcyBAgjECcyBQgAELEDMggILhCxAxCDATIFCAAQsQMyBQgAELEDMgUIABCxAzIFCAAQsQM6BAgAEEc6BwgjELACECc6BAguEA06BAgAEA06BAgAEAo6AggAOgIILjoFCC4QsQM6CAgAELEDEIMBOgcIABAUEIcCOgcIIxDqAhAnOgkIIxDqAhAnEBM6BggjECcQE1CfRFiWUWCeVmgBcAF4AIABV4gByAaSAQIxMpgBAKABAbABD8ABAQ&sclient=mobile-gws-wiz-serp";
    var axiosparams=new URLSearchParams();

    axios({
      method: 'get',
      url: urlNote,
      data: axiosparams
    }).then(function(response){
      if (response.data) {
        // response.data.match(/Aproximadamente(.*.)resultados/);
       result.html(response.data);

var getTittlesToScrap=$("#b_results h2 a", result);

for (var i = 0; i < getTittlesToScrap.length; i++) {
  jsonToScrapLinks=[...jsonToScrapLinks,{
    link:getTittlesToScrap[i].href,
    tittle:getTittlesToScrap[i].innerText
  }];
  // añadir todo a bd
}


       // resultStatsGET=;
// console.log(jsonToScrapLinks);
       // console.log(resultStatsGET);
       // console.log("resultStatsGET");
       resultStats2= $("#b_tween .sb_count", result)[0].innerText.match(/.*\d/);;
        // console.log(resultStats2);
// console.log("resultStats2");
        // response.data
        // var text= $("#b_tween .sb_count")[0].innerText.match(/(.*.)Resultados/);
         resultStats= parseInt(resultStats2[0].replace(".", ""));
        // console.log(resultStats);
if ($(id).html(resultStats)) {
  $(id).attr("notev",resultStats);
  $(id).attr("notet",titulo);
  $(id).attr("jsontoscrap",JSON.stringify(jsonToScrapLinks));
  arrayNotes[n].nota=resultStats;
arrayNotes[n].jsontoscrap=jsonToScrapLinks;

}
        // $(id).html(resultStats);
      }
    // result.html(response.data);
     // resultStatsGET=$("#result-stats", result);
     // resultStats2 = resultStatsGET[0].innerText.match(/Aproximadamente(.*.)resultados/);
 // resultStats= parseInt(resultStats2[1].replace(".", ""));
 // $(id).html(resultStats);
 // $(id).attr("notev",resultStats);
 // $(id).attr("notet",titulo);
    });
  }
// setTimeout(function(){
//   axiosQuery($("#selectNewSource")[0].value,el1,"h3","h4");
// // axiosQuery(,el1,"h3","h4");
// },200);
// // getBetterTittleInterval();
var switchInterval=false;
// intervalManager(switch){
//   switch (switch) {
//     case true:
//
//
// switchInterval=false;
//       break;
//       case false:
//       clearInterval(startInterval);
//
//   switchInterval=true;
//
//   }
// }
var startInterval;
// function getBetterTittleInterval(){
//    startInterval= setInterval(function () {
//   if($(".note")[$(".note").length-1]&&$(".note")[$(".note").length-1].innerText>10){
//     getBetterTittle();
//     clearInterval(startInterval);
//   }
//   }, 1000);
// }

function AddNewDataTextClassify(dataSet,tolabel,json,note){//newlabel

// if (newlabel) {
//   whichTittle.addLabels(newlabel);
// }
  // whichTittle.addData(tolabel, dataSet);
      // var urlNote=proxyScrap[0]+"/https://www.google.com/search?q="+titulo;
      var url="http://localhost:8968/AddData";
      var axiosparams=new URLSearchParams();
      axiosparams.append('method', "aiClassToDB");
      axiosparams.append('tittle', dataSet);
      axiosparams.append('label', tolabel);
      axiosparams.append('json', json);
      axiosparams.append('note', note);
      // axiosparams.append('tittle', "dataSet");
      // axiosparams.append('label', "tolabel");
      // axiosparams.append('json', "json");
      // axiosparams.append('note', "note");

      axiosparams.append('apiK', "1");
      axios({
        method: 'post',
        url: url,
        data: axiosparams
      }).then(function(response){
// console.log(response);

      });
}

function tryClassify(textToTryToClass){
  var text = whichTittle.classify(textToTryToClass);
console.log("ES: " + text + "!");
}

// addDataToMongo(){
//   //
// }
