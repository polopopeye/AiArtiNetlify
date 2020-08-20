var proxyScrap=[
  "http://127.0.0.1:8967",
  "https://cors-anywhere.herokuapp.com/"
];
var whichTittle = new WhichX();


$("#TopMenuSelect").html(`
  <div class="row mx-auto" style="padding:1em;">
    <div class="col">
      <span>Texto to try to class</span>
      <input id="newsQueryToSearch" type="text" value="¿?">
    </div>
  </div>
  <div class="row">
  <div class="col">
  <a id="selectNewSourceButton" class="btn btn-lg btn-primary">Importar Aprendido!</a>
  </div>
  <div class="col">
  <a id="selectNewSourceButton2" class="btn btn-lg btn-primary">Testear!</a>
  </div>
  </div>
  <h1 id="resultClassify"></h1>
  `);

// $("#selectNewSource").change(
//
// );
$('#selectNewSourceButton').on('click', function() {
importDataLearned();
  });
  $('#selectNewSourceButton2').on('click', function() {
    $("#resultClassify")[0].innerHTML=whichTittle.classify($("#newsQueryToSearch").val());
    // whichTittle.classify($("#newsQueryToSearch").val());

    });

  $('#newsQueryToSearch').on('input', function() {
     // alert( this.value );
    // readNews();

//     newsQueryToSearch=$("#newsQueryToSearch")[0].value;
//     var urltoUpdate=proxyScrap[0]+"/https://news.google.com/search?q="+newsQueryToSearch+"&hl=es-419&gl=EN&:es-419&ceid=EN:es-419";
//     SourceTittle[0].url=urltoUpdate;
// setTimeout(reloadList(),1000);
//

    });

function importDataLearned(){
  var url="http://localhost:8968/AddData?method=aiClassList&apiK=1";
  var axiosparams=new URLSearchParams();
  axios({
    method: 'get',
    url: url,
    data: axiosparams
  }).then(function(response){
console.log(response);
if (response.data.length>0) {
  for (var i = 0; i < response.data.length; i++) {
    if (whichTittle.export()[response.data[i].label]!=undefined) {
      whichTittle.addData(response.data[i].label, response.data[i].tittle);
    }else{
      whichTittle.addLabels(response.data[i].label)
    }
  }
}
  });
}



//   axiosQuery()
//   console.log(h4Tittle);
//   console.log(h3Tittle);
//
// Define an array of labels for description types.
// var labels = ["malo","bueno"];
// whichTittle.addLabels(labels);

function AddNewDataTextClassify(dataSet,tolabel){//newlabel

// if (newlabel) {
//   whichTittle.addLabels(newlabel);
// }
  whichTittle.addData(tolabel, dataSet);
      // var urlNote=proxyScrap[0]+"/https://www.google.com/search?q="+titulo;
}

function tryClassify(textToTryToClass){
  var text = whichTittle.classify(textToTryToClass);
console.log("ES: " + text + "!");
}

// addDataToMongo(){
//   //
// }
