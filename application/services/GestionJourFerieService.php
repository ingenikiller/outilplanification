<?php

class GestionJourFerieService extends ServiceStub {

	public function getListePeriode($p_contexte){
		$anneeDebutPeriode=$p_contexte->m_dataRequest->getData('anneeDebutPeriode');
		$anneeFinPeriode=$p_contexte->m_dataRequest->getData('anneeFinPeriode');
		$l_clause="dateFerie BETWEEN CONCAT($anneeDebutPeriode,'-01-01') AND CONCAT($anneeFinPeriode,'-12-31')";
		$listeJour = new ListObject('ListeJourFerie');
        $listeJour->requestNoPage('Jourferie', $l_clause);
		$p_contexte->addDataBlockRow($listeJour);
	}
	
	public function getListe($p_contexte){
		$page=1;
        $numeroPage=$p_contexte->m_dataRequest->getData('numeroPage');
        if($numeroPage!=null && $numeroPage!=''){
        	$page=$numeroPage;
        }
        $listeJour = new ListObject('ListeJourFerie');
        $listeJour->request('Jourferie', null, $page);
		$p_contexte->addDataBlockRow($listeJour);
	}

	public function delete($p_contexte){
		$date=$p_contexte->m_dataRequest->getData('date');
		$jour = new JourFerie();
		$jour->dateFerrie = $date;
		$jour->load();
		$jour->delete();
	}

	public function getListeAnnee ($p_contexte) {
		$requete='SELECT DISTINCT annee FROM jourferie WHERE annee >= YEAR(CURDATE()) - 1 ORDER BY annee DESC ';
		$listePeriodes = new ListDynamicObject('ListeAnnees');
        $listePeriodes->request($requete);
        $p_contexte->addDataBlockRow($listePeriodes);
	}
	
	public function getListeJourAnnee($p_contexte){
		$annee=$p_contexte->m_dataRequest->getData('annee');
		$l_clause="dateFerie LIKE CONCAT($annee, '%') ORDER BY dateFerie";
		$listeJour = new ListObject('ListeJourFerie');
        $listeJour->request('Jourferie', $l_clause);
		$p_contexte->addDataBlockRow($listeJour);
	}
	
	public function creerJourAnnee($p_contexte) {
		$anneeCreation=$p_contexte->m_dataRequest->getData('anneeacreer');
		$derAnnee = $anneeCreation - 1;
		
		//recherche des jours de l'année précédente
		$req ="SELECT SUBSTR(dateFerie,5) AS decoup, nom FROM jourferie WHERE annee='$derAnnee'";
		$jours = ((UtilsRequete::requeteListe($req))->getData());
		//pour chaque jour, on en crée un nouveau pour la nouvelle annee
		for($i=0; $i<count($jours); $i++) {
			$jour = new Jourferie();
			$jour->annee= $anneeCreation;
			$jour->nom = $jours[$i]->nom;
			$jour->dateFerie = $anneeCreation . $jours[$i]->decoup;
			$jour->create();
		}
	}
	
	public function majJoursFeries($p_contexte) {
		$annee=$p_contexte->m_dataRequest->getData('annee');
		$i=0;
		while($p_contexte->m_dataRequest->getData('nom-'.$i) != null) {
			$jourferie = new Jourferie();
			$jourferie->annee=$annee;
			$jourferie->nom = $p_contexte->m_dataRequest->getData('nom-'.$i);
			$jourferie->load();
			$jourferie->dateFerie = $p_contexte->m_dataRequest->getData('dateFerie-'.$i);
			$jourferie->update();
			$i++;
		}
		$p_contexte->ajoutReponseAjaxOK();
	}
	
	public function update($p_contexte){
	    $jourFerieJson=$p_contexte->m_dataRequest->getDataJson('jourFerie');
	    /*$nom=$p_contexte->m_dataRequest->getData('nom');
		$annee=$p_contexte->m_dataRequest->getData('annee');
		$dateFerie=$p_contexte->m_dataRequest->getData('dateFerie');*/
		$jour = new Jourferie();
		$jour->nom = $jourFerieJson['nom'];
		$jour->annee = $jourFerieJson['annee'];
		$jour->load();
		$jour->fieldObjectJson($jourFerieJson);;
		$jour->update();
		$p_contexte->ajoutReponseAjaxOK();
	}
}

?>
