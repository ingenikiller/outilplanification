<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of GenrateurService
 *
 * @author ingeni
 */
class GestionJourService extends ServiceStub{
    //put your code here
    
	public function getListe($p_contexte){
		$anneeDebutPeriode=$p_contexte->m_dataRequest->getData('anneeDebutPeriode');
		$anneeFinPeriode=$p_contexte->m_dataRequest->getData('anneeFinPeriode');
		$l_clause="jour BETWEEN CONCAT($anneeDebutPeriode,'-01-01') AND CONCAT($anneeFinPeriode,'-12-31') and user=".$p_contexte->getUser()->userId;;
		$listeJour = new ListObject('ListeJour');
        $listeJour->requestNoPage('Jourconges', $l_clause);
		$p_contexte->addDataBlockRow($listeJour);
	}
	
	
    public function create(ContextExecution $p_contexte){
        $jourJson=$p_contexte->m_dataRequest->getDataJson('jour');
        $jour = new Jourconges();
        $jour->fieldObjectJson($jourJson);
		$jour->user = $p_contexte->getUser()->userId;
		$jour->create();
		$p_contexte->ajoutReponseAjaxOK();
    }
    
	public function update(ContextExecution $p_contexte){
	    $jourJson=$p_contexte->m_dataRequest->getDataJson('jour');
	    $jour = new Jourconges();
	    $jour->jour=$jourJson['jour'];
	    $jour->user = $p_contexte->getUser()->userId;
	    $jour->load();
        $jour->fieldObjectJson($jourJson);
		
		$jour->update();
		$p_contexte->ajoutReponseAjaxOK();
	}
	
	
	public function delete(ContextExecution $p_contexte){
	    $jourJson=$p_contexte->m_dataRequest->getDataJson('jour');
	    $jour = new Jourconges();
	    $jour->jour=$jourJson['jour'];
	    $jour->user = $p_contexte->getUser()->userId;
	    $jour->load();
	    $jour->fieldObjectJson($jourJson);
		$jour->delete();
		$p_contexte->ajoutReponseAjaxOK();
	}
	
}

?>