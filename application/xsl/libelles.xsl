<?xml version="1.0" encoding="ISO-8859-15"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:variable name="LBL.ACTIONS">Actions</xsl:variable>
	<xsl:variable name="LBL.AFFICHAGE">Affichage</xsl:variable>
	
	<!--xsl:variable name="LBL.AFFICHER">Afficher</xsl:variable>
	<xsl:variable name="LBL.ANNEES">Ann�es</xsl:variable>
	<xsl:variable name="LBL.CLE">Cl�</xsl:variable>
	<xsl:variable name="LBL.COMPTE">Compte</xsl:variable>
	<xsl:variable name="LBL.COMPTEDESTINATION">Compte destination</xsl:variable>
	<xsl:variable name="LBL.COMPTEPRINCIPAL">Compte principal</xsl:variable>
	<xsl:variable name="LBL.COMPTES">Comptes</xsl:variable>
	<xsl:variable name="LBL.CREERNOUVEAU">Cr�er un nouveau @1</xsl:variable>
	<xsl:variable name="LBL.CREEROPERATION">Cr�er une nouvelle @1</xsl:variable>
	<xsl:variable name="LBL.CREDIT">Cr�dit</xsl:variable-->
	
	
	<xsl:variable name="LBL.ANNEE">Ann�e</xsl:variable>
	<xsl:variable name="LBL.CREER">Cr�er</xsl:variable>
	<xsl:variable name="LBL.DATE">Date</xsl:variable>
	<xsl:variable name="LBL.DEBUT">D�but</xsl:variable>
	<xsl:variable name="LBL.EDITIONPERIODE">Edtion p�riode</xsl:variable>
	
	<!--xsl:variable name="LBL.DECONNEXION">D�connexion</xsl:variable>
	<xsl:variable name="LBL.DEPENSE">D�pense</xsl:variable>
	<xsl:variable name="LBL.DEPENSES">D�penses</xsl:variable>
	<xsl:variable name="LBL.DERNIEREANNEE">Derni�re ann�e</xsl:variable>
	<xsl:variable name="LBL.DERNIERMOIS">Dernier mois</xsl:variable>
	<xsl:variable name="LBL.DERNIERRELEVE">Dernier relev�</xsl:variable>
	<xsl:variable name="LBL.DESCRIPTION">Description</xsl:variable>
	<xsl:variable name="LBL.DETAILFLUX">D�tail flux</xsl:variable>
	<xsl:variable name="LBL.DIFFERENCE">Difference</xsl:variable>
	<xsl:variable name="LBL.EDITER">Editer</xsl:variable>
	<xsl:variable name="LBL.EDITIONLISTEPREVISION">Edtion liste pr�visions</xsl:variable>
	<xsl:variable name="LBL.EDITIONPREVISION">Edtion d'une pr�vision</xsl:variable>
	<xsl:variable name="LBL.EDITIONFLUX">Edtion d'un flux</xsl:variable>
	<xsl:variable name="LBL.EDITIONOPERATION">Edtion d'une op�ration</xsl:variable>
	<xsl:variable name="LBL.EDITIONSEGMENT">Edtion d'un segment</xsl:variable>
	<xsl:variable name="LBL.ENTREEEPARGNE">Entr�e �pargne</xsl:variable>
	<xsl:variable name="LBL.ENREGISTRER">Enregistrer</xsl:variable>
	<xsl:variable name="LBL.EQUILIBRER">Equilibrer</xsl:variable>
	<xsl:variable name="LBL.EPARGNE">Epargne</xsl:variable>
	<xsl:variable name="LBL.FERMER">Fermer</xsl:variable>
	<xsl:variable name="LBL.FLUX">Flux</xsl:variable-->
	<xsl:variable name="LBL.FIN">Fin</xsl:variable>
	
	<!--xsl:variable name="LBL.FLUXMAITRE">Flux maitre</xsl:variable>
	<xsl:variable name="LBL.INTERPRETEURSQL">Interpr�teur SQL</xsl:variable>
	<xsl:variable name="LBL.LISTEDESCOMPTES">Liste des comptes</xsl:variable>
	<xsl:variable name="LBL.LISTEFLUX">Liste des flux</xsl:variable>
	<xsl:variable name="LBL.LISTEOPERATION">Liste des op�rations</xsl:variable>
	<xsl:variable name="LBL.MENUSEG">Cl�;libelll� court;libell� long;ordre;</xsl:variable>
	<xsl:variable name="LBL.MODEDEPAIEMENT">Mode de r�glement</xsl:variable>
	<xsl:variable name="LBL.MODEDEPAIEMENTDEF">Mode de paiement par d�faut</xsl:variable-->
	<!--xsl:variable name="LBL.MODIFIER">Modifier</xsl:variable>
	<xsl:variable name="LBL.MONTANT">Montant</xsl:variable-->
	<xsl:variable name="LBL.MODIFIER">Modifier</xsl:variable>
	<xsl:variable name="LBL.LOGIN">Login</xsl:variable>
	<xsl:variable name="LBL.MOTDEPASSE">Mot de passe</xsl:variable>
	<xsl:variable name="LBL.NBJOURS">Nombre de jours</xsl:variable>
	<xsl:variable name="LBL.NOM">Nom</xsl:variable>
	<xsl:variable name="LBL.NON">Non</xsl:variable>
	<!--xsl:variable name="LBL.NORELEVE">No relev�</xsl:variable>
	<xsl:variable name="LBL.NUMEROCOMPTE">Num�ro de compte</xsl:variable>
	<xsl:variable name="LBL.NUMERORELEVE">Num�ro de relev�</xsl:variable>
	<xsl:variable name="LBL.OPERATION">Op�ration</xsl:variable>
	<xsl:variable name="LBL.OPERATIONS">Op�rations</xsl:variable-->
	<xsl:variable name="LBL.OUI">Oui</xsl:variable>
	<xsl:variable name="LBL.PERIODE">P�riode</xsl:variable>
	<!--xsl:variable name="LBL.PERIODICITE">P�riodicit�</xsl:variable>
	<xsl:variable name="LBL.PREMIERRELEVE">Premier relev�</xsl:variable>
	<xsl:variable name="LBL.PREMIEREANNEE">Premi�re ann�e</xsl:variable>
	<xsl:variable name="LBL.PREMIERMOIS">Premier mois</xsl:variable>
	<xsl:variable name="LBL.PREVISIONS">Pr�visions</xsl:variable>
	<xsl:variable name="LBL.PREVISIONSCOMPTE">Pr�visions du compte</xsl:variable>
	<xsl:variable name="LBL.RETOURALALISTE">Retour � la liste</xsl:variable>
	<xsl:variable name="LBL.RETOURCOMPTE">Retour au compte</xsl:variable>
	<xsl:variable name="LBL.SAISIEAUTRE">Saisie autre op�ration</xsl:variable>
	<xsl:variable name="LBL.SOLDEBASE">Solde de base</xsl:variable>
	<xsl:variable name="LBL.SORTIEEPARGNE">Sortie �pargne</xsl:variable>
	<xsl:variable name="LBL.SOLDE">Solde</xsl:variable>
	<xsl:variable name="LBL.STATISTIQUES">Statistiques</xsl:variable>
	<xsl:variable name="LBL.TOTALCREDITS">Total cr�dits</xsl:variable>
	<xsl:variable name="LBL.TOTALDEBITS">Total d�bits</xsl:variable>
	<xsl:variable name="LBL.VERIFICATION">V�rification</xsl:variable>
	<xsl:variable name="LBL.VISUALISER">Visualiser</xsl:variable>
	<xsl:variable name="LBL.INTEGRATION">Int�gration</xsl:variable>
	<xsl:variable name="LBL.LIBCOURT">Libell� court</xsl:variable>
	<xsl:variable name="LBL.LIBELLE">Libell�</xsl:variable>
	<xsl:variable name="LBL.LIBLONG">Libell� long</xsl:variable>
	<xsl:variable name="LBL.LOGIN">Login</xsl:variable>
	<xsl:variable name="LBL.NOUVEAU">Nouveau</xsl:variable>
	<xsl:variable name="LBL.PARAMETRAGE">Param�trage</xsl:variable>
	<xsl:variable name="LBL.PRENOM">Pr�nom</xsl:variable>
	<xsl:variable name="LBL.RECETTE">Recette</xsl:variable>
	<xsl:variable name="LBL.RECETTES">Recettes</xsl:variable>
	<xsl:variable name="LBL.SEGMENT">Segment</xsl:variable>
	<xsl:variable name="LBL.STATUT">Statut</xsl:variable>
	<xsl:variable name="LBL.STATUTMAITRE">Statut maitre</xsl:variable>
	<xsl:variable name="LBL.STATUTS">Statuts</xsl:variable>
	<xsl:variable name="LBL.SYNTHESE">Synth�se</xsl:variable>
	<xsl:variable name="LBL.TITRE">Titre</xsl:variable>
	<xsl:variable name="LBL.TOTAL">Total</xsl:variable>
	<xsl:variable name="LBL.TOTALDEPENSES">Total d�penses</xsl:variable>
	<xsl:variable name="LBL.TOTALPREVISIONS">Total pr�visions</xsl:variable>
	<xsl:variable name="LBL.TOTALRECETTES">Total recettes</xsl:variable-->
	<xsl:variable name="LBL.TYPE">Type</xsl:variable>
	<xsl:variable name="LBL.VALIDER">Valider</xsl:variable>
</xsl:stylesheet>