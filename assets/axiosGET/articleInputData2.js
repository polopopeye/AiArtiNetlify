var proxyScrap=[
  "http://127.0.0.1:8967/",
  "https://cors-anywhere.herokuapp.com/"
];
var whichTittle = new WhichX();

// se va a hacer un input de una noticia,
// se va a pillar los links y
// se pillara el texto de esa noticia en la web.
// se mostrará el resultado del input plano aquí.
// para posteriormente guardarlo en una base de datos.

var data;



function showData(data){
  $("#TopMenuSelect").html(`
    <div class="row">
    <div class="col">
    <h3>Noticias en Cola:${data.length}</h3>
    </div>
    </div>

    `);
}

function importDataLearned(){
  var url="http://localhost:8968/AddData?method=aiDataList&apiK=1";
  var axiosparams=new URLSearchParams();
  axios({
    method: 'get',
    url: url,
    data: axiosparams
  }).then(function(response){
console.log(response);
if (response.data.length>0) {

  showData(response.data);
  for (var i = 0; i < response.data.length; i++) {
  $("infoPage").innerHTML=response.data[i];
  }
  // $("#infoPage")[0].innerHTML=JSON.stringify(response.data[0]);

console.log(response.data);
}
  });
}
importDataLearned();

// function createNewArti(){
//   markov.buildCorpus();
//   var markovoptions = {
//     maxTries: 100000, // Give up if I don't have a sentence after 20 tries (default is 10)
//     prng: Math.random, // An external Pseudo Random Number Generator if you want to get seeded results
//     // filter: (result) => {
//     //   return
//     //     result.string.split(' ').length >= 0 //&& // At least 5 words
//     //     // result.string.endsWith('.')             // End sentences with a dot.
//     // }
//   }
//   console.log(markov.generate(markovoptions).string);
//
// };
