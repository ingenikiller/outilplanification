$.fn.singleAndDouble = function(singleClickFunc, doubleClickFunc) {
	var timeOut = 200;
	var timeoutID = 0;
	var ignoreSingleClicks = false;
  
	this.on('click', function(event) {
		if (!ignoreSingleClicks) {
			clearTimeout(timeoutID);

			timeoutID = setTimeout(function() {
				singleClickFunc(event);
			}, timeOut);
		}
	});
  
	this.on('dblclick', function(event) {
		clearTimeout(timeoutID);
		ignoreSingleClicks = true;

		setTimeout(function() {
			ignoreSingleClicks = false;
		}, timeOut);

		doubleClickFunc(event);
	});
};

var singleClickCalled = false;



$(document).ready(function() {
	alimenterPeriodes();
	
	$( "#radio" ).controlgroup({
      icon: false,
	  direction: "vertical"
    });
	
	$( function() {
		$( "#modeHisto" ).checkboxradio();
  } );
	
});

var tabJour=["D", 'L', 'M', 'M', 'J', 'V', 'S'];
var tabMois=["Janvier", 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
//var tabCouleur={'inactif': 'jour_ouvre', "rtt1":"rtt_jour", "rtt2":"rtt_demi",'conges1':"conges_jour", 'conges2':"conges_demi", 'cpa1':"cpa_jour", 'cpa2':"cpa_demi"};

/*
$("<style>")
    .prop("type", "text/css")
    .html("\
    #my-window {\
        position: fixed;\
        z-index: 102;\
        display:none;\
        top:50%;\
        left:50%;\
    }")
    .appendTo("head");
	Noticed the back slashes? They are used to join strings that are on new lines. Leaving them out generates an error.
*/
/*********************************
 * recherche et affiche les  
 * périodes de congés/rtt
 *********************************/
function alimenterPeriodes() {

	$.ajax({
		url: "index.php?domaine=periode&service=getlisteactive",
		async: true,
		dataType: 'json',
		success : function(resultat, statut, erreur){
			//nombre de périodes
			var nb=resultat.racine.ListePeriodes.totalLigne;
			//tableau des périodes
			var tabJson = resultat.racine.ListePeriodes.data;
			
			var tabAnnees = Array();
			tabAnnees['debut']=(tabJson[0].debut).substr(0, 4);
			tabAnnees['fin']=tabJson[nb - 1].fin.substr(0, 4);
			
			for(i=0; i<nb; i++) {
				var codeLigne = tabJson[i].debut + tabJson[i].typePeriode;
				var totalDispo = Number(tabJson[i].nbjour);
				var totalPositionne = Number(tabJson[i].total);
				var totalPris = 0;
				if(tabJson[i].JoursPris.data[0] != null) {
					totalPris = Number(tabJson[i].JoursPris.data[0].total);
				}
				var reste = totalDispo - totalPositionne;
				var styleRow='';
				if(totalDispo == totalPositionne) {
					styleRow='periodeComplete';
				} else {
					if (totalDispo < totalPositionne) {
						styleRow='periodeTropSaisi';
					} else {
						styleRow='periodeIncomplete';
					}
				}
				
				var frac = 0;
				if(tabJson[i].JoursFrac.data != null){
					frac = reste + Number(tabJson[i].JoursFrac.data[0].total);
				}
				
				//si la période est déjà affichée
				if( $("#totalPositionne"+codeLigne).length) {
					$("#totalPositionne"+codeLigne).text(tabJson[i].total);
					$("#reste"+codeLigne).text(reste);
					
					$('#periode'+codeLigne).removeClass();
					$('#periode'+codeLigne).addClass(styleRow);
				} else {
					//sinon, n initialise l'affichage
					var row = $('<tr id="'+'periode'+codeLigne+'" class="'+styleRow+'"/>');
					row.append($("<td/>").text(tabJson[i].debut));
					row.append($("<td/>").text(tabJson[i].fin));
					//nbjourouvres
					//console.log(getNbJoursOuvres(tabJson[i].debut, tabJson[i].fin));
					row.append($("<td/>").text(tabJson[i].typePeriode));
					row.append($('<td align="right" id="'+"totalDispo"+codeLigne+'"/>').text(totalDispo));
					row.append($('<td align="right" id="'+"totalPositionne"+codeLigne+'"/>').text(totalPositionne));
					row.append($('<td align="right" id="'+"reste"+codeLigne+'" style="font-weight:bold;"/>').text(reste));
					row.append($('<td align="right"/>').text(totalPris));
					if(tabJson[i].typePeriode=='conges') {
						row.append($('<td align="right" id="'+"frac"+codeLigne+'"/>').text(frac));
					} else {
						row.append($('<td align="right" id="'+"frac"+codeLigne+'"/>').text('NA'));
					}
					
					$("#tableauPeriodes").append(row);
				}
			}
			peuplerCalendrier(tabAnnees);
			alimenteJours(tabAnnees['debut'], tabAnnees['fin']);
			alimenteJoursFeries(tabAnnees['debut'], tabAnnees['fin']);
			traiteWeekendEvent();
		}
	});
}

function getNbJoursOuvres(dateDeb, dateFin) {
	 //var debut=jr_get_value('date_debut');
  //var fin=jr_get_value('date_fin');
 	//
   
    var start = new Date(dateDeb);
    var end = new Date(dateFin);
 
    // initial total
    var totalBusinessDays = 0;
 
    // normalize both start and end to beginning of the day
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
 
    var current = new Date(start);
    current.setDate(current.getDate() + 1);
    var day;
  
    // loop through each day, checking
    while (current <= end) {
         
        day = current.getDay();
       
        if (day >= 1 && day <= 5)
        {
 
            ++totalBusinessDays;
             
 
       
        }
           
 
        current.setDate(current.getDate() + 1);
    }
     
    totalBusinessDays=totalBusinessDays+1;
     
    return totalBusinessDays;
}


function traiteWeekendEvent() {
	$( "td[type|='jour']" ).addClass('jour_ouvre');
	$( "td[jour|='S']" ).removeClass();
	$( "td[jour|='S']" ).addClass('jour_ferme');
	$( "td[jour|='D']" ).removeClass();
	$( "td[jour|='D']" ).addClass('jour_ferme');
	
	$("td[type|='jour']").singleAndDouble(
		function(event) {
			singleClickCalled = true;

			$('#message').html('Single Click Captured');
			modifieCase(event.currentTarget.id, determineTypeConges(1));
			setTimeout(function() {
				singleClickCalled = false;
			}, 300);
		},
		function(event) {
			if (singleClickCalled) {
				// This is actually an error state
				// it should never happen. The timeout would need
				// to be adjusted because it may be too close
				//$('#message').html('Single & Double Click Captured');
			}
			else {
				$('#message').html('Double Click Captured');
				modifieCase(event.currentTarget.id, determineTypeConges(2));
			}
			singleClickCalled = false;
		}
	);
}


/*********************************
 * alimenter le tableau des jours
 *********************************/
function peuplerCalendrier(tabAnnees) {
	var anneeDeb = Number(tabAnnees['debut']);
	var anneeFin = Number(tabAnnees['fin']);
	
	for (var annee=anneeDeb; annee<=anneeFin; annee++){
		
		//génère la première ligne du tableau
		$("#tableauCalendrier").append(genereLigneNumerosJours());
		$("#tableauCalendrier").append(premiereLigneAnnee(annee));
		
		for (var mois=1; mois<=11; mois++){
			$("#tableauCalendrier").append(ajouteMois(annee, mois));
		}
	}
	$("#tableauCalendrier").append(genereLigneNumerosJours());
}

/*********************************
 * génère la ligne de numéros de
 * jour
 *********************************/
function genereLigneNumerosJours(){
	var ligne=$("<tr/>");
	ligne.append($("<td/><td/>"));
	for(var i=1; i<=31; i++) {
		var dateJour = new Date();
		var classe='';
		if( i==dateJour.getDate()) {
			classe='th_mois_encours';
		}
		var casetab = $("<th class="+classe+"/>").text(i);
		ligne.append( casetab );
	}
	return ligne;
}

/*********************************
 * génère la première ligne de
 * l'année avec année et mois
 *********************************/
function premiereLigneAnnee(annee){
	var ligne=$("<tr/>");
	ligne.append($("<th rowspan=12 />").text(annee));
	ligne.append($("<th/>").text(tabMois[0]));
	//alert("ligne "+annee+" "+ligne);
	//$("#tableauCalendrier").append(ligne);
	ajouteJoursMois(ligne, annee, 0);
	return ligne;
}

/*********************************
 * génère une ligne de mois
 *********************************/
function ajouteMois(annee, mois){
	var ligne=$("<tr/>");
	//ligne.append($("<td/>").text(annee));
	
	var dateJour = new Date();
	var classe = '';
	if(annee==dateJour.getFullYear() && mois==dateJour.getMonth()) {
		classe='class="th_mois_encours"';
	}
	
	ligne.append($('<th '+classe+'/>').text(tabMois[mois]));
	ajouteJoursMois(ligne, annee, mois);
	return ligne;
}

/*********************************
 * génère la liste des jours d'un
 * mois
 *********************************/
function ajouteJoursMois(ligne, annee, mois){
	for(var j=1; j<=31; j++){
		var date = new Date(annee, mois, j);
		//vérifie la génération de la date: si le jour de la date et le jour voulu sont différents, la date n'existe pas
		if(date.getDate() == j){
			var jour = date.getDay();
			ligne.append($("<td id=\""+annee+'-'+pad(mois+1, 2, '0')+'-'+pad(j, 2, '0')+"\" jour=\""+tabJour[jour]+ "\" type=\"jour\" typePeriode=\"inactif\"/>").append('<img src="application/images/'+tabJour[jour]+'.png"/>'));//text(tabJour[jour])); //""));
			//ligne.append($("<td id=\""+annee+'-'+pad(mois+1, 2, '0')+'-'+pad(j, 2, '0')+"\" jour=\""+tabJour[jour]+ "\" type=\"jour\" typePeriode=\"inactif\">"+tabJour[jour]+"</td>"));
			//.append('<img src="application/images/'+tabJour[jour]+'.png"/>'));//text(tabJour[jour])); //""));
		}
	}
}


/*********************************
 * effectue un pad à gauche sur un
 * nombre
 *********************************/
function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


/*********************************
 * détermine le type de congés par
 * rapport au type de jour et au 
 * nombre de clics
 *********************************/
function determineTypeConges(nbClicks){
	var typeJour = $('input[name=radioChoixType]:checked').val();
	
	if(typeJour=='inactif'){
		return 'inactif';
	} else {
		return typeJour+nbClicks;
	}
}


/*********************************
 * décide de la mise à jour de la
 * couleur d'une case
 *********************************/
function modifieCase(idCase, typeJour){
	//si le jour est un jour fermé (samedi, dimanche ou férié)
	var jourSemaine = $("td[id|='"+idCase+"']").attr('jour');
	if ($('#'+idCase).hasClass('jour_ferme') || $('#'+idCase).hasClass('jour_ferie')) {
		return false;
	}
	
	//compare la date du jour avec la date sélectionnée
	var dateSelectionnee = new Date(idCase.substring(0,4), Number(idCase.substring(5,7))-1, idCase.substring(8,10));
	var dateJour = new Date();
	//si la date du jour est supérieure à la date saisie et que la saisie antérieure n'est pas activée
	if(dateJour > dateSelectionnee && $('#modeHisto').prop('checked')==false) {
		return false;
	}
	
	var typePeriodeActuel = $("td[id|='"+idCase+"']").attr('typePeriode');
	
	if(typePeriodeActuel=='' || typePeriodeActuel==undefined){
		majCaseJour(idCase, typeJour);
	} else {
		majCaseJour(idCase, typeJour);
	}
}


/*********************************
 * modifie la couleur d'une case 
 * par rapport au type de jour
 *********************************/
function majCaseJour(idCase, typeJour){
	var typeActuel = $("td[id|='"+idCase+"']").attr('typePeriode');
	
	if(typeJour==typeActuel){
		return;
	}
	
	if(typeJour=='inactif'){
		ajaxMajJour(idCase, 'delete', typeJour);
	} else {
		if(typeActuel == 'inactif') {
			ajaxMajJour(idCase, 'create', typeJour);
		} else {
			ajaxMajJour(idCase, 'update', typeJour);
		}
	}
	
	$("td[id|='"+idCase+"']").removeClass();
	coloreCase(idCase, typeJour);
}


/*********************************
 * modifie la couleur d'une case 
 * par rapport au type de jour
 *********************************/
function coloreCase(idCase, typeJour) {
	//$("td[id|='"+idCase+"']").addClass(tabCouleur[typeJour]);
	$("td[id|='"+idCase+"']").addClass(determineClasseJour(typeJour));
	$("td[id|='"+idCase+"']").attr('typePeriode', typeJour);
}

function determineClasseJour(typeJour) {
	if(typeJour=='inactif') {
		return 'jour_ouvre';
	}
	var indice = typeJour.substring(typeJour.length - 1, typeJour.length);
	var tab={1:"_jour", 2:"_demi"};
	return typeJour.substring(0, typeJour.length-1)+tab[indice];
	
}


function ajaxMajJour(jour, action, typePeriode){
	
	var dataJson=new Object();
	dataJson.jour=jour;
	dataJson.typePeriode=typePeriode;
	$.ajax({
		url: "index.php?domaine=jour&service="+action,
		//async: true,
		dataType: 'json',
		type: "POST",
		data: {jour: JSON.stringify(dataJson)},
		success : function(resultat, statut, erreur){
			if(traiteRetourAjax(resultat)) {
				majPeriodes();				
			}
		}
	});
}

/*********************************
 * recherche et affiche les  
 * périodes de congés/rtt
 *********************************/
function majPeriodes() {
	$.ajax({
		url: "index.php?domaine=periode&service=getlisteactive",
		async: true,
		dataType: 'json',
		success : function(resultat, statut, erreur){
			//nombre de périodes
			var nb=resultat.racine.ListePeriodes.totalLigne;
			//tableau des périodes
			var tabJson = resultat.racine.ListePeriodes.data;
			for(i=0; i<nb; i++) {
				var codeLigne = tabJson[i].debut + tabJson[i].typePeriode;
				var totalDispo = Number(tabJson[i].nbjour);
				var totalPositionne = Number(tabJson[i].total);
				
				var reste = totalDispo - totalPositionne;
				var styleRow='';
				if(totalDispo == totalPositionne) {
					styleRow='periodeComplete';
				} else {
					if (totalDispo < totalPositionne) {
						styleRow='periodeTropSaisi';
					} else {
						styleRow='periodeIncomplete';
					}
				}
				
				$("#totalPositionne"+codeLigne).text(totalPositionne);
				$("#reste"+codeLigne).text(reste);
				
				
				var frac = 0;
				if(tabJson[i].jourFrac != null){
					frac = reste + Number(tabJson[i].jourFrac.data.total);
				}
				
				
				if(tabJson[i].typePeriode=='conges') {
					$("#frac"+codeLigne).text(frac);
				}
				
				
				$('#periode'+codeLigne).removeClass();
				$('#periode'+codeLigne).addClass(styleRow);
			}
		}
	});
}

/*********************************
 * recherche et affiche les  
 * jours de congés/rtt
 *********************************/
function alimenteJours(anneeDebutPeriode, anneeFinPeriode) {
	var params='anneeDebutPeriode='+anneeDebutPeriode+'&anneeFinPeriode='+anneeFinPeriode;
	$.ajax({
		url: "index.php?domaine=jour&service=getListe",
		async: true,
		dataType: 'json',
		data: params,
		success : function(resultat, statut, erreur){
			var nb=resultat.racine.ListeJour.totalLigne;
			var tabJson = resultat.racine.ListeJour.data;
			for(i=0; i<nb; i++) {
				var caseId = tabJson[i].jour;
				var typePeriode = tabJson[i].typePeriode;
				coloreCase(caseId, typePeriode);
			}
		}
	});
}

/*********************************
 * recherche et affiche les  
 * jours fériés
 *********************************/
function alimenteJoursFeries(anneeDebutPeriode, anneeFinPeriode) {
	var params='anneeDebutPeriode='+anneeDebutPeriode+'&anneeFinPeriode='+anneeFinPeriode;
	$.ajax({
		url: "index.php?domaine=jourferie&service=getlisteperiode",
		async: true,
		dataType: 'json',
		data: params,
		success : function(resultat, statut, erreur){
			var nb=resultat.racine.ListeJourFerie.totalLigne;
			var tabJson = resultat.racine.ListeJourFerie.data;
			for(i=0; i<nb; i++) {
				var caseId = tabJson[i].dateFerie;
				$( "#"+caseId ).removeClass();
				$( "#"+caseId ).addClass('jour_tableau jour_ferie');
			}
		}
	});
}

function activeF1(event){
	bloqueTouchesFonctions(event);
	$('input:radio[name="radioChoixType"][value="inactif"]').click();
	return false;
}

function activeF2(event){
	bloqueTouchesFonctions(event);
	$('input:radio[name="radioChoixType"][value="rtt"]').click();
	return false;
}

function activeF3(event){
	bloqueTouchesFonctions(event);
	$('input:radio[name="radioChoixType"][value="conges"]').click();
	return false;
}
function activeF4(event){
	bloqueTouchesFonctions(event);
	$('input:radio[name="radioChoixType"][value="cpa"]').click();
	return false;
}
