// JavaScript Document
// Type =
//0 : Créer un projet à partir d'une ressource
//1 : Créer un projet à partir d'un produit
//2 : Créer un projet à partir d'un contact CRM
//3 : Créer un projet à partir d'une prestation acquise (On configure la cession)
//4 : Créer un besoin à partir d'une société CRM
//5 : Créer une action à partir d'une société CRM
//6 : Créer un achat à partir d'une société CRM
//7 : Créer un projet à partir d'une société CRM
//8 : Créer un besoin à partir d'un produit
//9 : Créer un besoin à partir d'une ressource
//10 : Créer un besoin à partir d'un candidat
//11 : Créer un contact CRM à partir du module de recherche CRM
//12 : Créer un projet à partir d'un besoin (AT)* en cliquant sur le bouton Créer Projet
//13 : Créer un besoin à partir du module de recherche des besoins
//14 : Créer un projet à partir du module de recherche des projets
//15 : Créer un projet à partir d'un candidat
//16 : Créer un avantage à partir d'un projet
//17 : Créer un avantage à partir d'une ressource
//18 : Créer un contrat RH à partir d'une ressource
//19 : Créer un besoin à partir d'un devis (App WDevis)
//20 : Créer un projet à partir d'un besoin (Forfait, Recrutement)* en cliquant sur le bouton Créer Projet
//21 : Créer un projet à partir d'un besoin (AT)* en le basculant à l'état Gagné
//22 : Créer un projet à partir d'un besoin (Forfait, Recrutement)* en le basculant à l'état Gagné
//23 : Créer un projet à partir d'un besoin (AT)* en le basculant à l'état Gagné : Clic sur NON on rétablit l'état initial du besoin
//24 : Créer un projet à partir d'un besoin (Forfait, Recrutement)* en le basculant à l'état Gagné : Clic sur NON on rétablit l'état initial du besoin
//25 : Créer une commande à partir d'un projet en cliquant sur bouton global Créer Commande (Pas celui des onglets Prestations/Achats)
//26 : Créer un compte manager à partir du module Managers
//27 : Créer un compte manager à partir du module Managers : Clic sur NON on vide la liste des ressources
//28 : Positionner un produit sur un besoin
//29 : Positionner un produit sur un projet
//30 : Créer des actions multiples depuis une fiche Candidat (Présentation Client)
//31 : Créer des actions multiples depuis une fiche Ressource (Présentation Client)
//32 : Créer des actions multiples depuis une fiche Ressource (Suivi de Mission)
//33 : Créer des actions multiples depuis une fiche contact CRM (Présentation Client)
//34 : Créer des actions multiples depuis une fiche contact CRM (Suivi de Mission)
//35 : Créer des actions multiples depuis une fiche Besoin (Présentation Client)
//36 : Créer des actions multiples depuis une fiche Projet (Suivi de Mission)
//37 : Créer des actions multiples : Clic sur NON on enregistre tout de même l'action sans créer d'actions multiples
function createObjectProfile(wforms, wajax, webpath, urlcreation, language, crmcontact, ressource, candidat, produit, keywords, type, addData) {
	var labelAll = '', labelIntitule = '', labelLegende = '', selItems = '', typeCRM = 1, labelObject = '', labelOption1 = '', labelOption2 = '', aoTitle = '', preLabel = '', actionNo = 'closeMessageModal();', obligatoire = true;
	switch(language) {default:labelLegende = 'Pour remplir la zone de sélection : Tapez 3 caractères minimum';break;case 'en':labelLegende = '3 characters minimum';break;}
	var i, typeArray = [0,1,2,7,8,9,10,14,15];
	if(typeArray.indexOf(type) > -1) {
		typeArray = [0,9,10];
		if(typeArray.indexOf(type) > -1 || ressource) for(i in addData) if(addData[i][2] == 1 || addData[i][2] == 2) selItems += '<option value="'+addData[i][0]+'" data-type="'+addData[i][2]+'">'+addData[i][1]+'</option>';

		typeArray = [0,9,10,15];
		if(typeArray.indexOf(type) > -1 || ressource || candidat) for(i in addData) if(addData[i][2] == 3) selItems += '<option value="'+addData[i][0]+'" data-type="'+addData[i][2]+'">'+addData[i][1]+'</option>';

		typeArray = [1,8];
		if(typeArray.indexOf(type) > -1 || produit) for(i in addData) if(addData[i][2] == 4) selItems += '<option value="'+addData[i][0]+'" data-type="'+addData[i][2]+'">'+addData[i][1]+'</option>';
	}

	//On construit le paramètre RET
	var queries, ret = '';
    queries = urlcreation.replace(/^\?/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        if(split[0] == 'ret') {
        	ret = 'ret='+split[1];
        	break;
        }
    }

	if(typeof crmcontact == "string" || crmcontact) {
		var newCRM = '';
		if(type == 11) {
			typeCRM = 0;
			switch(language) {
				default:
					labelIntitule = 'Société <span style="color:#FF0000;">*</span>';
					newCRM = 'Vous ne trouvez pas votre société CRM ? <a class="lien" href="tableau-de-bord/fiche-crmsociete" style="font-size:9px">Créer une nouvelle Société CRM</a>';
					break;
				case 'en':
					labelIntitule = 'Company <span style="color:#FF0000;">*</span>';
					newCRM = 'You don\'t find your CRM company ? <a class="lien" href="tableau-de-bord/fiche-crmsociete" style="font-size:9px">Create a new CRM Company</a>';
					break;
			}
		} else {
			typeCRM = 1;
			var crmSubString = '';
			newCRM = 'Vous ne trouvez pas votre contact CRM ? <a class="lien"  style="font-size:9px">Créer un nouveau contact CRM</a>';

			if(typeof crmcontact == "string")
				crmSubString = 'href="tableau-de-bord/fiche-crmcontact?idsociete='+crmcontact.substring(4) + ((ret != '') ? '&'+ret : '') + '"';
			else
				crmSubString = 'href="#" onclick="closeMessageModal();createObjectProfile(\''+wforms+'\',\''+wajax+'\',\''+webpath+'\',\'/tableau-de-bord/fiche-crmcontact'+((ret != '') ? '?'+ret : '')+'\',\''+language+'\',true,false,false,false,\'\',11);return false;"';
			switch(language) {
				default:
					labelIntitule = 'Contact CRM <span style="color:#FF0000;">*</span>';
					newCRM = 'Vous ne trouvez pas votre contact CRM ? <a class="lien" '+crmSubString+' style="font-size:9px">Créer un nouveau contact CRM</a>';
					break;
				case 'en':
					labelIntitule = 'CRM Contact <span style="color:#FF0000;">*</span>';
					newCRM = 'You don\'t find your CRM contact ? <a class="lien" '+crmSubString+' style="font-size:9px">Create a new CRM Contact</a>';
					break;
			}
		}
		if(typeof crmcontact == "string")
			labelAll += '<tr><td align="left">'+labelIntitule+'</td><td align="left" colspan="3"><select class="mediumselection" id="crmliste" name="crmliste"></select></td></tr>';
		else {
			labelAll += '<tr><td align="left">'+labelIntitule+'</td><td id="keywordscrm_colonne" align="left"><input class="veryshortinput" type="text" id="crmkeywords" onkeyup="if(this.value.length < 3) '+wforms+'.remove_liste(\'crmliste\');'+wajax+'.launchRequestOnKeyUp(this,3,\''+webpath+'/tableau-de-bord/rapports-activite/update-liste/crm?vs=crmliste&c=\'+document.getElementById(\'crmkeywords\').value+\'&t='+typeCRM+'&s=1\', updateListesItems);" /></td><td align="left" colspan="2"><select class="mediumselection" id="crmliste" name="crmliste"></select></td></tr>'+
			            '<tr><td>&nbsp;</td><td colspan="3" style="font-size:9px;text-align:left">('+labelLegende+')</td></tr>';
		}
		labelAll += '<tr><td>&nbsp;</td><td colspan="3" style="font-size:9px;text-align:left;">'+newCRM+'</td></tr>';
		if(ressource || produit) labelAll += '<tr><td colspan="4">&nbsp;</td></tr>';
	}

	if(ressource) {
		var newRessource = '';
		switch(language) {
			default:
				labelRessource = 'Ressource <span style="color:#FF0000;">*</span>';
				newRessource = 'Vous ne trouvez pas votre ressource ? <a class="lien" href="tableau-de-bord/fiche-ressource'+((ret != '') ? '?'+ret : '')+'" style="font-size:9px">Créer une nouvelle Ressource</a>';
				break;
			case 'en':
				labelRessource = 'Resource <span style="color:#FF0000;">*</span>';
				newRessource = 'You don\'t find your resource ? <a class="lien" href="tableau-de-bord/fiche-ressource'+((ret != '') ? '?'+ret : '')+'" style="font-size:9px">Create a new Resource</a>';
				break;
		}
		labelAll += '<tbody id="tableressource_rows" style="display:none"><tr><td align="left">'+labelRessource+'</td><td align="left"><input class="veryshortinput" type="text" id="ressourcekeywords" onkeyup="if(this.value.length < 3) '+wforms+'.remove_liste(\'ressourceliste\');'+wajax+'.launchRequestOnKeyUp(this,3,\''+webpath+'/tableau-de-bord/rapports-activite/update-liste/ressources?vs=ressourceliste&r=\'+document.getElementById(\'ressourcekeywords\').value, updateListesItems);" /></td><td align="left" colspan="2"><select class="mediumselection" id="ressourceliste" name="ressourceliste"></select></td></tr>'+
		            '<tr><td>&nbsp;</td><td colspan="3" style="font-size:9px;text-align:left">('+labelLegende+')</td></tr>'+
		            '<tr><td>&nbsp;</td><td colspan="3" style="font-size:9px;text-align:left;">'+newRessource+'</td></tr></tbody>';
	}

	if(candidat) {
		var newCandidat = '';
		switch(language) {
			default:
				labelCandidat = 'Candidat <span style="color:#FF0000;">*</span>';
				newCandidat = 'Vous ne trouvez pas votre candidat ? <a class="lien" href="tableau-de-bord/fiche-candidat'+((ret != '') ? '?'+ret : '')+'" style="font-size:9px">Créer un nouveau Candidat</a>';
				break;
			case 'en':
				labelCandidat = 'Candidate <span style="color:#FF0000;">*</span>';
				newCandidat = 'You don\'t find your candidate ? <a class="lien" href="tableau-de-bord/fiche-candidat'+((ret != '') ? '?'+ret : '')+'" style="font-size:9px">Create a new Candidate</a>';
				break;
		}
		labelAll += '<tbody id="tablecandidat_rows" style="display:none"><tr><td align="left">'+labelCandidat+'</td><td align="left"><input class="veryshortinput" type="text" id="candidatkeywords" onkeyup="if(this.value.length < 3) '+wforms+'.remove_liste(\'candidatliste\');'+wajax+'.launchRequestOnKeyUp(this,3,\''+webpath+'/tableau-de-bord/rapports-activite/update-liste/candidats?vs=candidatliste&c=\'+document.getElementById(\'candidatkeywords\').value, updateListesItems);" /></td><td align="left" colspan="2"><select class="mediumselection" id="candidatliste" name="candidatliste"></select></td></tr>'+
		            '<tr><td>&nbsp;</td><td colspan="3" style="font-size:9px;text-align:left">('+labelLegende+')</td></tr>'+
		            '<tr><td>&nbsp;</td><td colspan="3" style="font-size:9px;text-align:left;">'+newCandidat+'</td></tr></tbody>';
	}

	if(produit || type == 28 || type == 29) {
		var newProduit = '';
		switch(language) {
			default:
				labelIntitule = 'Produit <span style="color:#FF0000;">*</span>';
				newProduit = 'Vous ne trouvez pas votre produit ? <a class="lien" href="tableau-de-bord/fiche-produit'+((ret != '') ? '?'+ret : '')+'" style="font-size:9px">Créer un nouveau Produit</a>';
				break;
			case 'en':
				labelIntitule = 'Product <span style="color:#FF0000;">*</span>';
				newProduit = 'You don\'t find your product ? <a class="lien" href="tableau-de-bord/fiche-produit'+((ret != '') ? '?'+ret : '')+'" style="font-size:9px">Create a new Product</a>';
				break;
		}
		labelAll += '<tbody id="tableproduit_rows"' + ((produit) ? ' style="display:none"' : '') + '><tr><td align="left">'+labelIntitule+'</td><td align="left"><input class="veryshortinput" type="text" id="produitkeywords" onkeyup="if(this.value.length < 3) '+wforms+'.remove_liste(\'produitliste\');'+wajax+'.launchRequestOnKeyUp(this,3,\''+webpath+'/tableau-de-bord/rapports-activite/update-liste/produits?vs=produitliste&o=\'+document.getElementById(\'produitkeywords\').value, updateListesItems);" /></td><td align="left" colspan="2"><select class="mediumselection" id="produitliste" name="produitliste"></select></td></tr>'+
		            '<tr><td>&nbsp;</td><td colspan="3" style="font-size:9px;text-align:left">('+labelLegende+')</td></tr>'+
		            '<tr><td>&nbsp;</td><td colspan="3" style="font-size:9px;text-align:left;">'+newProduit+'</td></tr></tbody>';
	}

	if(type == 12 || type == 20 || type == 21 || type == 22) {
		switch(language) {default:labelIntitule = 'Positionnement <span style="color:#FF0000;">*</span>';labelOption1='Aucun';labelOption2='Sélectionner...';break;case 'en':labelIntitule = 'Positioning <span style="color:#FF0000;">*</span>';labelOption1='None';labelOption2='Select...';break;}
		if(type == 20 || type == 22) selectPos = '<select class="normalselection" id="typepliste" onchange="if(this.value == 0)document.getElementById(\'posliste\').style.visibility=\'hidden\'; else document.getElementById(\'posliste\').style.visibility=\'visible\';"><option value="0" selected="selected">'+labelOption1+'</option><option value="1">'+labelOption2+'</option></select>&nbsp;'; else selectPos = '';
		labelAll += '<tr><td align="left">'+labelIntitule+'</td><td colspan="3" align="left">'+selectPos+'<select class="mediumselection" id="posliste" name="posliste" style="visibility:'+((type == 20 || type == 22)?'hidden':'visible')+'"></select></td></tr>';
		if(type == 22 || type == 21) {
			actionNo = 'launchObjectCreation('+((type == 21)?23:24)+');';
			switch(language) {
				default:
					preLabel = 'Transformer un besoin dans l\'état "'+addData[0]+'" va créer un projet !<br /><br />Veuillez sélectionner le collaborateur qui va travailler sur ce projet :';
					labelAll += '<tr><td align="left" colspan="4"><p class="legende">Si votre collaborateur n\'est pas présent dans cette liste, veuillez le <a class="lien" href="'+addData[2]+'">positionner</a> sur le besoin.</p></td></tr><tr><td align="left" colspan="4">&nbsp;</td></tr>';
					break;
				case 'en':
					preLabel = 'Transform an opportunity into the state "'+addData[0]+'" will create a project !<br /><br />Please select the employee that will work on this project :';
					break;
			}
		}
	}

	if(type == 16) {
		switch(language) {default:labelIntitule = 'Ressource <span style="color:#FF0000;">*</span>';break;case 'en':labelIntitule = 'Resource <span style="color:#FF0000;">*</span>';break;}
		labelAll += '<tr><td align="left">'+labelIntitule+'</td><td colspan="3" align="left"><select class="mediumselection" id="ressourceliste" name="ressourceliste"></select></td></tr><tr><td colspan="4">&nbsp;</td></tr>';
	}

	if(type == 16 || type == 17) {
		switch(language) {default:labelIntitule = 'Type d\'avantage <span style="color:#FF0000;">*</span>';labelOption1='Non-contractuel';labelOption2='Contractuel';break;case 'en':labelIntitule = 'Advantage type <span style="color:#FF0000;">*</span>';labelOption1='Not Contractual';labelOption2='Contractual';break;}
		labelAll += '<tr><td align="left">'+labelIntitule+'</td><td colspan="3" align="left"><select class="normalselection" id="typealiste" onchange="if(this.value == 0)document.getElementById(\'contratliste\').style.visibility=\'hidden\'; else document.getElementById(\'contratliste\').style.visibility=\'visible\';"><option value="0" selected="selected">'+labelOption1+'</option><option value="1">'+labelOption2+'</option></select>&nbsp;<select class="mediumselection" id="contratliste" name="contratliste" style="visibility:hidden"></select></td></tr>';
	}

	if(type == 18) {
		switch(language) {default:labelIntitule = 'Objet à créer <span style="color:#FF0000;">*</span>';labelOption1='Nouveau Contrat';labelOption2='Nouvel Avenant';break;case 'en':labelIntitule = 'Object to create <span style="color:#FF0000;">*</span>';labelOption1='New Contract';labelOption2='New Amendment';break;}
		labelAll += '<tr><td align="left">'+labelIntitule+'</td><td colspan="3" align="left"><select class="normalselection" id="typecliste" onchange="if(this.value == 0)document.getElementById(\'contratliste\').style.visibility=\'hidden\'; else document.getElementById(\'contratliste\').style.visibility=\'visible\';"><option value="0" selected="selected">'+labelOption1+'</option><option value="1">'+labelOption2+'</option></select>&nbsp;<select class="mediumselection" id="contratliste" name="contratliste" style="visibility:hidden"></select></td></tr>';
	}

	if(type == 19) {
		switch(language) {default:labelIntitule = 'Besoin/Opportunité <span style="color:#FF0000;">*</span>';break;case 'en':labelIntitule = 'Opportunity <span style="color:#FF0000;">*</span>';break;}
		labelAll += '<tr><td align="left">'+labelIntitule+'</td><td id="keywordsao_colonne" align="left"><input class="veryshortinput" type="text" id="aokeywords" onkeyup="if(this.value.length < 3) '+wforms+'.remove_liste(\'aoliste\');'+wajax+'.launchRequestOnKeyUp(this,3,\''+webpath+'/tableau-de-bord/rapports-activite/update-liste/besoins?vs=aoliste&b=\'+document.getElementById(\'aokeywords\').value, updateListesItems);" /></td><td align="left" colspan="2"><select class="mediumselection" id="aoliste" name="aoliste"></select></td></tr>'+
		            '<tr><td></td><td colspan="3" style="font-size:9px;text-align:left">('+labelLegende+')</td></tr>';
	}

	if(type == 25) {
		switch(language) {default:labelIntitule = 'Prestations/Achats corrélées <span style="color:#FF0000;">*</span>';labelOption1='Aucun';break;case 'en':labelIntitule = 'Deliveries/Purchases correlated <span style="color:#FF0000;">*</span>';labelOption1='None';break;}
		labelAll += '<tr><td align="left">'+labelIntitule+'</td><td colspan="3" align="left"><select  multiple="multiple" id="cmdliste" name="cmdliste[]"></select></td></tr>';
	}

	if(type == 26) {
		actionNo = 'launchObjectCreation(27);';
		obligatoire = false;
		switch(language) {
			default:
				labelIntitule = 'Ressource';
				preLabel = 'Souhaitez-vous transformer une ressource existante en manager ?';
				break;
			case 'en':
				labelIntitule = 'Resource';
				preLabel = 'Do you to transform an existing resource into manager ?';
				break;
		}
		labelAll += '<tr><td align="left">'+labelIntitule+'</td><td align="left"><input class="veryshortinput" type="text" id="ressourcekeywords" onkeyup="if(this.value.length < 3) '+wforms+'.remove_liste(\'ressourceliste\');'+wajax+'.launchRequestOnKeyUp(this,3,\''+webpath+'/tableau-de-bord/rapports-activite/update-liste/ressources?vs=ressourceliste&nm=1&r=\'+document.getElementById(\'ressourcekeywords\').value, updateListesItems);" /></td><td align="left" colspan="2"><select class="mediumselection" id="ressourceliste" name="ressourceliste"></select></td></tr>'+
		            '<tr><td></td><td colspan="3" style="font-size:9px;text-align:left">('+labelLegende+')</td></tr>';
	}

	if(type == 30 || type == 31 || type == 33) {
		if(addData != '1') actionNo = 'launchObjectCreation(37);';
		switch(language) {
			default:
				labelIntitule = 'Besoin/Opportunité <span style="color:#FF0000;">*</span>';
				preLabel = 'Veuillez renseigner les données suivantes afin de créer une action sur les fiches Besoin &amp; CRM concernées :';
				break;
			case 'en':
				labelIntitule = 'Opportunity <span style="color:#FF0000;">*</span>';
				preLabel = 'Please fill the following data in order to create an action on concerned Opportunity &amp; CRM profiles :';
				break;}
		labelAll += '<tr><td align="left">'+labelIntitule+'</td><td colspan="3" align="left"><select class="mediumselection" id="aoliste" name="aoliste"'+((type == 33) ? 'onchange="changeTypeAction(\''+wforms+'\',\''+wajax+'\',\''+webpath+'\','+type+')"' : '')+'></select></td></tr><tr><td colspan="4">&nbsp;</td></tr>';
	}

	if(type == 32 || type == 34) {
		if(addData != '1') actionNo = 'launchObjectCreation(37);';
		switch(language) {
			default:
				labelIntitule = 'Projet <span style="color:#FF0000;">*</span>';
				preLabel = 'Veuillez renseigner les données suivantes afin de créer une action sur les fiches Projet &amp; CRM concernées :';
				break;
			case 'en':
				labelIntitule = 'Project <span style="color:#FF0000;">*</span>';
				preLabel = 'Please fill the following data in order to create an action on concerned Project &amp; CRM profiles :';
				break;}
		labelAll += '<tr><td align="left">'+labelIntitule+'</td><td colspan="3" align="left"><select class="mediumselection" id="projetliste" name="projetliste"'+((type == 34) ? 'onchange="changeTypeAction(\''+wforms+'\',\''+wajax+'\',\''+webpath+'\','+type+')"' : '')+'></select></td></tr><tr><td colspan="4">&nbsp;</td></tr>';
	}

	if(type == 35 || type == 33) {
		if(addData != '1') actionNo = 'launchObjectCreation(37);';
		switch(language) {
			default:
				labelIntitule = 'Ressource/Candidat <span style="color:#FF0000;">*</span>';
				preLabel = 'Veuillez renseigner les données suivantes afin de créer une action sur les fiches Ressource/Candidat &amp; CRM concernées :';
				break;
			case 'en':
				labelIntitule = 'Resource/Candidate <span style="color:#FF0000;">*</span>';
				preLabel = 'Please fill the following data in order to create an action on concerned Resource/Candidate &amp; CRM profiles :';
				break;}
		labelAll += '<tr><td align="left">'+labelIntitule+'</td><td colspan="3" align="left"><select class="mediumselection" id="ressourceliste" name="ressourceliste"></select></td></tr><tr><td colspan="4">&nbsp;</td></tr>';
	}

	if(type == 36 || type == 34) {
		if(addData != '1') actionNo = 'launchObjectCreation(37);';
		switch(language) {
			default:
				labelIntitule = 'Ressource <span style="color:#FF0000;">*</span>';
				preLabel = 'Veuillez renseigner les données suivantes afin de créer une action sur les fiches Ressource &amp; CRM concernées :';
				break;
			case 'en':
				labelIntitule = 'Resource <span style="color:#FF0000;">*</span>';
				preLabel = 'Please fill the following data in order to create an action on concerned Resource &amp; CRM profiles :';
				break;}
		labelAll += '<tr><td align="left">'+labelIntitule+'</td><td colspan="3" align="left"><select class="mediumselection" id="ressourceliste" name="ressourceliste"></select></td></tr><tr><td colspan="4">&nbsp;</td></tr>';
	}

	if(selItems != '') {
		selItems = '<select name="aotype" id="aotype" class="normalselection" onchange="changeAOTypeCreation('+wforms+');">'+selItems+'</select>';
		switch(language) {default:selItems = '<tr><td align="left">Type de projet</td><td colspan="3" align="left">'+selItems+'</td></tr>';break;case 'en':selItems = '<tr><td align="left">Project type</td><td colspan="3" align="left">'+selItems+'</td></tr>';break;}
	}

	typeArray = [0,1,2,3,7,8,9,10,14,15];
	switch(language) {
		default:
			switch(type) {
				case 4:case 8:case 9:case 10:case 13:labelObject='le besoin';break;
				case 5:labelObject='l\'action';break;
				case 6:labelObject='l\'achat';break;
				case 11:labelObject='le contact CRM';break;
				case 16:case 17:labelObject='l\'avantage';break;
				case 18:labelObject='le contrat/avenant';break;
				case 19:labelObject='le devis';break;
				case 25:labelObject='la commande';break;
				case 26:labelObject='un manager à partir de cette ressource';break;
				case 27:case 28:labelObject='le positionnement';break;
				case 30:case 31:case 32:case 33:case 34:case 35:case 36:labelObject='une action sur les fiches concernées';break;
				default:labelObject='le projet';break;
			}
			if(typeArray.indexOf(type) > -1) aoTitle = '<tr><td align="left">Titre du besoin/opportunité d\'affaires <span style="color:#FF0000;">*</span></td><td colspan="3" align="left"><input type="text" class="mediuminput" maxlength="150" name="aotitle" id="aotitle" value="" /></td></tr><tr><td colspan="3">&nbsp;</td></tr>'; else aoTitle = '';
			if(preLabel == '') preLabel = 'Veuillez renseigner les données suivantes afin de créer '+labelObject+' :';
			setMessageModal('<form id="newproject" name="newproject" action="'+webpath+urlcreation+'" method="post" onsubmit="return false;">'+preLabel+'<br/><br/><table>'+aoTitle+selItems+'<tr><td colspan="4">&nbsp;</td></tr>'+labelAll+'<tr><td colspan="4">&nbsp;</td></tr>'+(obligatoire ? '<tr><td colspan="4" align="left"><span style="color:#FF0000;">*</span>&nbsp;<span style="font-size:10px;">Obligatoire</span></td></tr>' : '') + '</table><br/><br/>Voulez-vous créer '+labelObject+' ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Oui" onclick="launchObjectCreation('+type+');" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="Non" onclick="'+actionNo+'" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table></form>');
			break;
		case 'en':
			switch(type) {
				case 4:case 8:case 9:case 10:case 13:labelObject='the opportunity';break;
				case 5:labelObject='the action';break;
				case 6:labelObject='the purchase';break;
				case 11:labelObject='the CRM Contact';break;
				case 16:case 17:labelObject='the advantage';break;
				case 18:labelObject='the contract/amendment';break;
				case 19:labelObject='the quotation';break;
				case 25:labelObject='the order';break;
				case 26:labelObject='a manager from this resource';break;
				case 27:case 28:labelObject='the product';break;
				case 30:case 31:case 32:case 33:case 34:case 35:case 36:labelObject='an action on concerned profiles';break;
				default:labelObject='the positioning';break;
			}
			if(typeArray.indexOf(type) > -1) aoTitle = '<tr><td align="left">Opportunity title <span style="color:#FF0000;">*</span></td><td colspan="3" align="left"><input type="text" class="mediuminput" maxlength="150" name="aotitle" id="aotitle" value="" /></td></tr><tr><td colspan="3">&nbsp;</td></tr>'; else aoTitle = '';
			if(preLabel == '') preLabel = 'Please fill the following data in order to create '+labelObject+' :';
			setMessageModal('<form id="newproject" name="newproject" action="'+webpath+urlcreation+'" method="post" onsubmit="return false;">'+preLabel+'<br/><br/><table>'+aoTitle+selItems+'<tr><td colspan="4">&nbsp;</td></tr>'+labelAll+'<tr><td colspan="4">&nbsp;</td></tr>'+(obligatoire ? '<tr><td colspan="4" align="left"><span style="color:#FF0000;">*</span>&nbsp;<span style="font-size:10px;">Mandatory</span></td></tr>' : '') + '</table><br/><br/>Do you want to create '+labelObject+' ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Yes" onclick="launchObjectCreation('+type+');" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="No" onclick="'+actionNo+'" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table></form>');
			break;
	}
	if(ressource) document.getElementById('aotype').value = '1'; else if(produit) document.getElementById('aotype').value = '4';
	changeAOTypeCreation(window[wforms]);
	if(typeof crmcontact == "string") {
		window[wforms].remove_liste('crmliste');
		window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/crm?vs=crmliste&c='+crmcontact+'&t=1&s=0', updateListesItems);
	}
	if((type == 12 || type == 20 || type == 21 || type == 22) && keywords != '') {
		window[wforms].remove_liste('posliste');
		window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/positionnements?vs=posliste&n='+keywords+'&et%5B%5D=0&et%5B%5D=1&et%5B%5D=3&et%5B%5D=4&et%5B%5D=5&et%5B%5D=6&et%5B%5D=7&et%5B%5D=8&et%5B%5D=9', updateListesItems);
	}
	if(type == 16 && keywords != '') {
		window[wforms].remove_liste('ressourceliste');
		window[wforms].remove_liste('contratliste');
		window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/ressources?vs=ressourceliste&r='+keywords, updateListesItems);
		window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/missions?vs=contratliste&m='+keywords+'%20COMP'+document.getElementById('ressourceliste').value, updateListesItems);
	}
	if((type == 17 || type == 18) && keywords != '') {
		window[wforms].remove_liste('contratliste');
		window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/contrats?vs=contratliste&a='+keywords, updateListesItems);
	}
	if(type == 25) {
		window[wforms].remove_liste('cmdliste');
		window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/missions?vs=cmdliste&fulldata=1&multiselect=1&m='+keywords, updateListesItems);
		window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/achats?vs=cmdliste&fulldata=1&multiselect=1&a='+keywords, updateListesItems);
		$('#cmdliste').multiselect({minWidth:'300',dropdown:false,selectedList:0,noneSelectedText:labelOption1,language:language}).multiselectfilter();
	}
	if(type == 30 || type == 31 || type == 33) {
		window[wforms].remove_liste('aoliste');
		window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/besoins?vs=aoliste&b='+keywords, function(oData) {
			updateListesItems(oData);
			if(type == 33) changeTypeAction(wforms, wajax, webpath, type);
		});
	}
	if(type == 32 || type == 34) {
		window[wforms].remove_liste('projetliste');
		window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/projets?vs=projetliste&p='+keywords, function(oData) {
			updateListesItems(oData);
			if(type == 34) changeTypeAction(wforms, wajax, webpath, type);
		});
	}
	if(type == 35) {
		window[wforms].remove_liste('ressourceliste');
		window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/ressources?vs=ressourceliste&r='+keywords, updateListesItems);
		window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/candidats?vs=ressourceliste&noempty=1&c='+keywords, updateListesItems);
	}
	if(type == 36) {
		window[wforms].remove_liste('ressourceliste');
		window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/ressources?vs=ressourceliste&r='+keywords, updateListesItems);
	}
}

function changeTypeAction(wforms, wajax, webpath, type) {
	window[wforms].remove_liste('ressourceliste');
	tabID = document.getElementById((type == 33) ? 'aoliste' : 'projetliste').value.split('_');
	if(tabID.length == 2 && tabID[1] > 0) {
		if(type == 33) {
			window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/ressources?vs=ressourceliste&r=AO'+tabID[1], updateListesItems);
			window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/candidats?vs=ressourceliste&noempty=1&c=AO'+tabID[1], updateListesItems);
		} else
			window[wajax].makeRequest(webpath+'/tableau-de-bord/rapports-activite/update-liste/ressources?vs=ressourceliste&r=PRJ'+tabID[1], updateListesItems);
	}
}

function createProjectCession(wforms, wajax, webpath, language, crm, aotitle, addData) {
	//console.log('A'+document.getElementById('aotype').value);
	var labelClient, labelCRM;
	if(crm) {
		switch(language) {default:labelClient = 'Client';labelLegende = '3 caractères minimum';break;case 'en':labelClient = 'Customer';labelLegende = '3 characters minimum';break;}
		labelCRM = '<tr><td colspan="4">&nbsp;</td></tr>'+
		           '<tr><td align="left">'+labelClient+'</td><td id="keywordscrm_colonne" align="left"><input class="veryshortinput" type="text" id="crmkeywords" onkeyup="if(this.value.length < 3) '+wforms+'.remove_liste(\'crmliste\');'+wajax+'.launchRequestOnKeyUp(this,3,\''+webpath+'/tableau-de-bord/rapports-activite/update-liste/crm?vs=crmliste&c=\'+document.getElementById(\'crmkeywords\').value+\'&t=1&s=1\', updateListesItems);" /></td><td align="left" colspan="2"><select class="normalselection" id="crmliste" name="crmliste"></select></td></tr>'+
		           '<tr><td>&nbsp;</td><td colspan="3" style="font-size:9px;">('+labelLegende+')</td></tr>';
	}
	else labelCRM = '';

	var i, selItems = '';
	for(i in addData) if(addData[i][2] == 1) selItems += '<option value="'+addData[i][0]+'" data-type="'+addData[i][2]+'"'+((i == 0)?'selected="selected"':'')+'>'+addData[i][1]+'</option>';

	switch(language) {
		default:setMessageModal('Veuillez renseigner les données suivantes afin de créer le projet de la ressource cédée :<br/><br/><table><tr><td align="left">Titre du besoin <span style="font-size:9px">(Obligatoire)</span></td><td colspan="3" align="left"><input type="text" class="mediuminput" maxlength="150" name="aotitle" id="aotitle" value="'+aotitle+'" /></td></tr><tr><td colspan="4">&nbsp;</td></tr><tr><td align="left">Type de projet</td><td colspan="3" align="left"><select name="aotype" id="aotype" class="normalselection">'+selItems+'</select></td></tr>'+labelCRM+'</table><br/><br/>Voulez-vous créer le projet ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Oui" onclick="launchObjectCreation(3);" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="Non" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>');break;
		case 'en':setMessageModal('Please fill the following data in order to create the project of transfered resource :<br/><br/><table><tr><td align="left">Opportunity title <span style="font-size:9px">(Mandatory)</span></td><td colspan="3" align="left"><input type="text" class="mediuminput" maxlength="150" name="aotitle" id="aotitle" value="'+aotitle+'" /></td></tr><tr><td colspan="4">&nbsp;</td></tr><tr><td align="left">Project type</td><td colspan="3" align="left"><select name="aotype" id="aotype" class="normalselection">'+selItems+'</select></td></tr>'+labelCRM+'</table><br/><br/>Do you want to create the project ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Yes" onclick="launchObjectCreation(3);" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="No" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>');break;
	}
}

function changeAOTypeCreation(wforms) {
	if(document.getElementById('aotype')) {
		if(!window.ActiveXObject) document.getElementById('aotype').focus();
		var aotype = $('#aotype').find(':selected').attr('data-type');
		wforms.updateVisibilityOnChange(aotype,['4'],['1','2','3'],['tableproduit_rows'], 'value', 'table-row-group');
		if(document.getElementById('tablecandidat_rows')) {
			wforms.updateVisibilityOnChange(aotype,['1'],['2','3','4'],['tableressource_rows'], 'value', 'table-row-group');
			wforms.updateVisibilityOnChange(aotype,['3'],['1','2','4'],['tablecandidat_rows'], 'value', 'table-row-group');
		}
		else
			wforms.updateVisibilityOnChange(aotype,['1','3'],['2','4'],['tableressource_rows'], 'value', 'table-row-group');
	}
}

function launchObjectCreation(type) {
	var formCreation = 'newproject';
	var etatCreation = false;
	var aotype = document.getElementById('aotype')?$('#aotype').find(':selected').attr('data-type'):0;
	var tabID;
	switch(type) {
		case 0://Projet à partir d'une ressource
			if(document.getElementById('aotitle').value != '' && (!document.getElementById('crmliste') || document.getElementById('crmliste').value != '')) etatCreation = true;
			break;
		case 1://Projet à partir d'un produit
			if(document.getElementById('aotitle').value != '' && (!document.getElementById('crmliste') || document.getElementById('crmliste').value != '')) etatCreation = true;
			break;
		case 2://Projet à partir d'un contact CRM
			if(document.getElementById('aotitle').value != '' && aotype == '4' && document.getElementById('produitliste').value != '') etatCreation = true;else if(document.getElementById('aotitle').value != '' && aotype == '2') etatCreation = true;else if(document.getElementById('aotitle').value != '' && ((aotype == '1' && document.getElementById('ressourceliste').value != '') || (aotype == '3' && document.getElementById('candidatliste').value != ''))) etatCreation = true;
			break;
		case 3://Projet à partir d'une cession
			if(document.getElementById('aotitle').value != '') {
				if(document.getElementById('crmliste')) crmListe = '&crmliste='+document.getElementById('crmliste').value; else crmListe = '';
				etatCreation = true;
				formCreation = 'fiche';
				document.getElementById(formCreation).action += crmListe+'&aotitle='+document.getElementById('aotitle').value+'&aotype='+document.getElementById('aotype').value;
			}
			break;
		case 4://Besoin à partir d'une société CRM
			tabID = document.getElementById('crmliste').value.split('_');
			if(tabID.length == 3 && tabID[2] > 0) {
				etatCreation = true;
				document.getElementById(formCreation).action += '&idcrmcontact='+tabID[2];
			}
			break;
		case 5://Action à partir d'une société CRM
			tabID = document.getElementById('crmliste').value.split('_');
			if(tabID.length == 3 && tabID[2] > 0) {
				etatCreation = true;
				document.getElementById(formCreation).action += '?ret=crmcontact_'+tabID[2]+'_0';
			}

			break;
		case 6://Achat à partir d'une société CRM
			tabID = document.getElementById('crmliste').value.split('_');
			if(tabID.length == 3 && tabID[2] > 0) {
				etatCreation = true;
				document.getElementById(formCreation).action += '&idcrmcontact='+tabID[2];
			}
			break;
		case 7://Projet à partir d'une société CRM
			tabID = document.getElementById('crmliste').value.split('_');
			if(tabID.length == 3 && tabID[2] > 0) {
				if(aotype == '4' && document.getElementById('produitliste').value != '') etatCreation = true;else if(document.getElementById('aotitle').value != '' && aotype == '2') etatCreation = true;else if(document.getElementById('aotitle').value != '' && ((aotype == '1' && document.getElementById('ressourceliste').value != '') || (aotype == '3' && document.getElementById('candidatliste').value != ''))) etatCreation = true;
				document.getElementById(formCreation).action += '&id='+tabID[2];
			}
			break;
		case 8://Besoin à partir d'un produit
			if(document.getElementById('aotitle').value != '') {
				if(document.getElementById('crmliste')) {
					tabID = document.getElementById('crmliste').value.split('_');
					if(tabID.length == 3 && tabID[2] > 0) {
						etatCreation = true;
						document.getElementById(formCreation).action += '&idcrmcontact='+tabID[2];
					}
				} else etatCreation = true;
			}
			break;
		case 9://Besoin à partir d'une ressource
			if(document.getElementById('aotitle').value != '' && (!document.getElementById('crmliste') || document.getElementById('crmliste').value != '')) etatCreation = true;
			break;
		case 10://Besoin à partir d'un candidat
			if(document.getElementById('aotitle').value != '' && (!document.getElementById('crmliste') || document.getElementById('crmliste').value != '')) etatCreation = true;
			break;
		case 11://Contact à partir de la liste CRM
			tabID = document.getElementById('crmliste').value.split('_');
			if(tabID.length == 3 && tabID[2] > 0 && document.getElementById('crmliste').value != '') {
				etatCreation = true;
				var queries = document.getElementById(formCreation).action.replace(/^\?/, '').split('&');
				document.getElementById(formCreation).action += ((queries.length > 1) ? '&' : '?') + 'idsociete='+tabID[2];
			}
			break;
		case 12:case 21:case 23://Projet à partir d'une fiche Besoin (AT, RECRUTEMENT)
			tabID = document.getElementById('posliste').value.split('_');
			if(tabID.length == 2 && tabID[1] > 0 && document.getElementById('posliste').value != '') {
				etatCreation = true;
				if(type == 21 || type == 23) formCreation = 'fiche';
				if(type == 21) document.getElementById(formCreation).action += '&newproject=1';
				document.getElementById(formCreation).action += '&idpos='+tabID[1];
			} else if(type == 23) {
				etatCreation = true;
				formCreation = 'fiche';
			}
			break;
		case 13://Besoin à partir du module Besoins
			if(document.getElementById('crmliste')) {
				tabID = document.getElementById('crmliste').value.split('_');
				if(tabID.length == 3 && tabID[2] > 0) {
					etatCreation = true;
					document.getElementById(formCreation).action += '?idcrmcontact='+tabID[2];
				}
			} else etatCreation = true;
			break;
		case 14://Projet à partir du module Projets
			tabID = document.getElementById('crmliste').value.split('_');
			if(tabID.length == 3 && tabID[2] > 0) {
				if(aotype == '4' && document.getElementById('produitliste').value != '') etatCreation = true;else if(document.getElementById('aotitle').value != '' && aotype == '2') etatCreation = true;else if(document.getElementById('aotitle').value != '' && ((aotype == '1' && document.getElementById('ressourceliste').value != '') || (aotype == '3' && document.getElementById('candidatliste').value != ''))) etatCreation = true;
			}
			break;
		case 15://Projet à partir d'une fiche Candidat
			if(document.getElementById('aotitle').value != '' && (!document.getElementById('crmliste') || document.getElementById('crmliste').value != '')) etatCreation = true;
			break;
		case 16://Avantage à partir d'une fiche Projet
			tabID = document.getElementById('ressourceliste').value.split('_');
			if(tabID.length == 2 && tabID[1] > 0 && document.getElementById('ressourceliste').value != '') {
				document.getElementById(formCreation).action += '&idressource='+tabID[1];
				if(document.getElementById('typealiste').value == '0')
					etatCreation = true;
				else {
					tabTmp = document.getElementById('contratliste').value.split('_');
					if(tabTmp.length == 2 && tabTmp[1] > 0 && document.getElementById('contratliste').value != '') {
						etatCreation = true;
						document.getElementById(formCreation).action += '&idmission='+tabTmp[1];
					}
				}
			}
			break;
		case 17://Avantage à partir d'une fiche Ressource
			if(document.getElementById('typealiste').value == '0') etatCreation = true;else {
				tabID = document.getElementById('contratliste').value.split('_');
				if(tabID.length == 2 && tabID[1] > 0 && document.getElementById('contratliste').value != '') {
					etatCreation = true;
					document.getElementById(formCreation).action += '&idcontrat='+tabID[1];
				}
			}
			break;
		case 18://Contrat à partir d'une fiche Ressource
			if(document.getElementById('typecliste').value == '0') etatCreation = true;else {
				tabID = document.getElementById('contratliste').value.split('_');
				if(tabID.length == 2 && tabID[1] > 0 && document.getElementById('contratliste').value != '') {
					etatCreation = true;
					document.getElementById(formCreation).action += '&idcontrat='+tabID[1];
				}
			}
			break;
		case 19://Besoin à partir du module Devis
			tabID = document.getElementById('aoliste').value.split('_');
			if(tabID.length == 2 && tabID[1] > 0 && document.getElementById('aoliste').value != '') {
				etatCreation = true;
				document.getElementById(formCreation).action += '&idao='+tabID[1];
			}
			break;
		case 20:case 22:case 24://Projet à partir d'une fiche Besoin (FORFAIT)
			if(type == 22 || type == 24) formCreation = 'fiche';
			if(type == 22) document.getElementById(formCreation).action += '&newproject=1';
			if(document.getElementById('typepliste').value == '0') etatCreation = true; else {
				tabID = document.getElementById('posliste').value.split('_');
				if(tabID.length == 2 && tabID[1] > 0 && document.getElementById('posliste').value != '') {
					etatCreation = true;
					document.getElementById(formCreation).action += '&idpos='+tabID[1];
				}
			}
			break;
		case 25://Commande à partir d'un projet
			etatCreation = true;
			break;
		case 26:case 27://On créé un manager à partir du module Comptes
			etatCreation = true;
			document.getElementById(formCreation).method = 'get';
			//On transforme une ressource
			if(type == 27) wforms.remove_liste('ressourceliste');
			break;
		case 28:case 29://Positionnement d'un produit à partir d'un besoin/projet
			if(document.getElementById('produitliste')) {
				tabID = document.getElementById('produitliste').value.split('_');
				if(tabID.length == 2 && tabID[1] > 0) {
					etatCreation = true;
					document.getElementById(formCreation).action += '&idproduit='+tabID[1];
				}
			} else etatCreation = true;
			break;
		case 30:case 31:
			tabID = document.getElementById('aoliste').value.split('_');
			if(tabID.length == 2 && tabID[1] > 0 && document.getElementById('aoliste').value != '') {
				var lastForm = formCreation;
				formCreation = 'fiche';
				document.getElementById(formCreation).action = document.getElementById(lastForm).action + '&ret=besoin_' + tabID[1] + '_1';
				wforms.selectforce_item('type', 52, ''); //Présentation Client sur un besoin
				etatCreation = true;
			}
			break;
		case 32:
			tabID = document.getElementById('projetliste').value.split('_');
			if(tabID.length == 2 && tabID[1] > 0 && document.getElementById('projetliste').value != '') {
				var lastForm = formCreation;
				formCreation = 'fiche';
				document.getElementById(formCreation).action = document.getElementById(lastForm).action + '&ret=projet_' + tabID[1] + '_3';
				window['wforms'].selectforce_item('type', 32, '');//Suivi de mission sur un projet
				etatCreation = true;
			}
			break;
		case 33:
			tabIDA = document.getElementById('aoliste').value.split('_');
			tabIDB = document.getElementById('ressourceliste').value.split('_');
			if(tabIDA.length == 2 && tabIDA[1] > 0 && document.getElementById('aoliste').value != '' && tabIDB.length == 2 && tabIDB[1] > 0 && document.getElementById('ressourceliste').value != '') {
				var lastForm = formCreation;
				formCreation = 'fiche';
				if(tabIDB[0] == 'c')
					document.getElementById(formCreation).action = document.getElementById(lastForm).action + '&idcandidat=' + tabIDB[1] + '&ret=besoin_' + tabIDA[1] + '_1';
				else
					document.getElementById(formCreation).action = document.getElementById(lastForm).action + '&idressource=' + tabIDB[1] + '&ret=besoin_' + tabIDA[1] + '_1';
				window['wforms'].selectforce_item('type', 52, '');//Présentation Client sur un besoin
				etatCreation = true;
			}
			break;
		case 34:
			tabIDA = document.getElementById('projetliste').value.split('_');
			tabIDB = document.getElementById('ressourceliste').value.split('_');
			if(tabIDA.length == 2 && tabIDA[1] > 0 && document.getElementById('projetliste').value != '' && tabIDB.length == 2 && tabIDB[1] > 0 && document.getElementById('ressourceliste').value != '') {
				var lastForm = formCreation;
				formCreation = 'fiche';
				document.getElementById(formCreation).action = document.getElementById(lastForm).action + '&idressource=' + tabIDB[1] + '&ret=projet_' + tabIDA[1] + '_3';
				window['wforms'].selectforce_item('type', 32, '');//Suivi de mission sur un projet
				etatCreation = true;
			}
			break;
		case 35:
			tabID = document.getElementById('ressourceliste').value.split('_');
			if(tabID.length == 2 && tabID[1] > 0 && document.getElementById('ressourceliste').value != '') {
				var lastForm = formCreation;
				formCreation = 'fiche';
				if(tabID[0] == 'c')
					document.getElementById(formCreation).action = document.getElementById(lastForm).action + '&idcandidat=' + tabID[1];
				else
					document.getElementById(formCreation).action = document.getElementById(lastForm).action + '&idressource=' + tabID[1];
				window['wforms'].selectforce_item('type', 52, '');//Présentation Client sur un besoin
				etatCreation = true;
			}
			break;
		case 36:
			tabID = document.getElementById('ressourceliste').value.split('_');
			if(tabID.length == 2 && tabID[1] > 0 && document.getElementById('ressourceliste').value != '') {
				var lastForm = formCreation;
				formCreation = 'fiche';
				document.getElementById(formCreation).action = document.getElementById(lastForm).action + '&idressource=' + tabID[1];
				window['wforms'].selectforce_item('type', 32, '');//Suivi de mission sur un projet
				etatCreation = true;
			}
			break;
		case 37:
			etatCreation = true;
			formCreation = 'fiche';
			break;
	}
	if(etatCreation) {document.getElementById(formCreation).submit();closeMessageModal();}
}

function createPackageMission(url, id, language) {
	switch(language) {
		default:
			setMessageModal('Sélectionnez votre action&nbsp;:&nbsp;<select class="mediumselection" id="createpackage"><option value="'+url+'/tableau-de-bord/fiche-projet/positionner?id='+id+'&ret=projet_'+id+'_3">Affecter des ressources sur ce projet</option><option value="'+url+'/tableau-de-bord/fiche-mission?ret=projet_'+id+'_3">Créer un groupement de prestations</option></select><br /><br />Voulez-vous poursuivre ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Oui" onclick="window.location=document.getElementById(\'createpackage\').value;closeMessageModal();" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="Non" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>');
			break;
		case 'en':
			setMessageModal('Select an action&nbsp;:&nbsp;<select class="mediumselection" id="createpackage"><option value="'+url+'/tableau-de-bord/fiche-projet/positionner?id='+id+'&ret=projet_'+id+'_3">Assign resources to this project</option><option value="'+url+'/tableau-de-bord/fiche-mission?ret=projet_'+id+'_3">Create a deliveries groupment</option></select><br /><br />Do you want to pursuit ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Yes" onclick="window.location=document.getElementById(\'createpackage\').value;closeMessageModal();" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="No" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>');
			break;
	}
}

/**
 * \brief addNotation
 * \param wtabNotation variable Wish_TabArrays
 * \param tabCriteres tableau contenant la liste des critères d'évaluation
 * \param tabEvaluations tableau contenant la liste des notes possibles
 * \language langue de l'interface
 */
function addNotation(wforms, callback_function, tabCriteres, tabEvaluations, language) {
	var msgHTML = '';
	jQuery.each(tabCriteres, function(i, critere) {
		if(i == 0) msgHTML += '<table>';
		msgHTML += '<tr style="height:25px;min-height:25px;max-height:25px;"><td align="left">'+critere+'</td><td width="120px" align="right"> <select class="shortselection" id="msgevalnotation_'+i+'">';
		jQuery.each(tabEvaluations, function(j, eval) {msgHTML += '<option value="'+j+'">'+eval+'</option>';});
		msgHTML += '</select></td></tr>';
	});
	if(msgHTML != '') msgHTML += '</table>';

	switch(language) {
		default:confirm('Evaluation du candidat :<br/><br/>'+msgHTML+'<br/>Commentaires :<br/><br/><textarea class="normalarea" id="msgevalcomment"></textarea><div style="font-size:9px"><span id="decompte_evalcomment"></span> caractères restants</div><br/><br/>Souhaitez-vous évaluer ce candidat ?',callback_function,'');break;
		case 'en':confirm('Candidate evaluation :<br/><br/>'+msgHTML+'<br/>Comments :<br/><br/><textarea class="normalarea" id="msgevalcomment"></textarea><div style="font-size:9px"><span id="decompte_evalcomment"></span> remain characters</div><br/><br/>Do you want to evaluate this candidate ?',callback_function,'');break;
	}
	wforms.LimiterTextArea(wforms, 'msgevalcomment', 250, 'decompte_evalcomment');
}

/**
 * \brief Message de confirmation pour transformer une mission en achat de prestation
 */
function confirmPurchaseDelivery(url, language) {
	var msg = '';
	switch(language) {
		default:
			msg += 'Vous allez transformer cette prestation en achat de prestation :<br/><br/><ul style="margin-left:10px;padding-left:10px"><li style="list-style-type:disc;text-align:left;color:#F90;margin-bottom:10px"><p style="font-size:14px;color:#000">Vous pourrez donc piloter les paiements de ce fournisseur via la fiche achat correspondante</p></li><li style="list-style-type:disc;text-align:left;color:#F90;margin-bottom:10px"><p style="font-size:14px;color:#000">Les coûts de cette prestation ne seront plus inclus dans les coûts de production<span style="font-size:10px"><br />(Seul les paiements "Confirmés" & "Réglés" seront pris en compte)</span></p></li></ul><br/>Assurez vous d\'avoir bien défini les données de cette prestation car celles-ci seront reprises automatiquement afin de pré-remplir l\'achat & proposer un échéancier de paiement.<br /><br />Voulez-vous transformer cette prestation en achat de prestation ?';
			break;
		case 'en':
			msg += 'You are going to transform this delivery into deliery\'s purchase :<br/><br/><ul style="margin-left:10px;padding-left:10px"><li style="list-style-type:disc;text-align:left;color:#F90;margin-bottom:10px"><p style="font-size:14px;color:#000">You will be able to manage payments provider on the purchase profile</p></li><li style="list-style-type:disc;text-align:left;color:#F90;margin-bottom:10px"><p style="font-size:14px;color:#000">Delivery\'s costs won\'t be included into production\'s costs<span style="font-size:10px"><br />(Only "Confirmed" & "Paid" payments will be included)</span></p></li></ul><br/>Please fill correctly this delivery\'s data because these ones will be used to fill the purchase profile and to generate automatically a schedule of payments.<br /><br />Do you want to transform this delivery into delivery\'s purchase ?';
			break;
	}
	confirm(msg,url,'');
}

/**
 * \brief Gère le tableau des cv/pj etc
 * if API, typeFiche = 'api/<apiNAME>?signed_request=<urlencode(SIGNED_REQUEST)>'
 */
function addFileTabArrays(varTab, varAjax, arrayValue, idFiche, ongletFiche, typeFiche, appviewer, cv, urlBase, language, nodelete) {
	var tabValue,
	    bjoin, bupload, bdelete, labelLegende,
	    urlFichier, urlUpdate,
	    hrefFile, imgFile,
	    delTag,
	    innerHTML,
	    typeFicheParts = typeFiche.split('/'),
	    hrefBase ='',
	    urlPath = urlBase,
	    urlParams = [],
	    nbMaxFiles = 10;

	varTab.getNextIndex();
	tabValue = varTab.setArrayValue([0,false,''], arrayValue);
	varTab.insert_row("bg_alterne_soft_full", varTab.index,1);

	// default: nbMaxFiles = 10
	if (cv == -2 || typeFicheParts[0] === 'api') nbMaxFiles = 20;
	else if (cv == -1)               nbMaxFiles = 50;
	else if (cv)                     nbMaxFiles = 5;

	switch(language) {
		default:
			bjoin = 'Joindre';
			bupload = 'Télécharger';
			bdelete = 'Supprimer';
			if(cv == -1) labelLegende = 'Max.&nbsp;' + nbMaxFiles + '&nbsp;justificatifs (15Mo&nbsp;max.)';
			else if(cv > 0)  labelLegende = 'Max.&nbsp;' + nbMaxFiles + '&nbsp;CVs (Word/PDF&nbsp;15Mo&nbsp;max.)';
			else         labelLegende = 'Max.&nbsp;' + nbMaxFiles + '&nbsp;documents (15Mo&nbsp;max.)';
			break;

		case 'en':
			bjoin = 'Attach';
			bupload = 'Upload';
			bdelete = 'Delete';
			if(cv == -1) labelLegende = 'Max.&nbsp;' + nbMaxFiles + '&nbsp;attachments (15Mo&nbsp;max.)';
			else if(cv > 0)  labelLegende = 'Max.&nbsp;' + nbMaxFiles + '&nbsp;CVs (Word/PDF&nbsp;15Mb&nbsp;max.)';
			else         labelLegende = 'Max.&nbsp;' + nbMaxFiles + '&nbsp;documents (15Mb&nbsp;max.)';
			break;
	}

	switch (typeFicheParts[0]) {
		case 'api':
			if (typeof window.BM.signedRequest === 'undefined') {
				console.warn('CAUTION: addFileTabArrays() called with "api" typeFiche but "signed_request" var does not exist !!!');
			}
			else {
				// update typeFicheParts[1] (remove queryStr)
				urlParams.push('signed_request=' + encodeURIComponent(window.BM.signedRequest));
			}

			urlPath += '/api' + (typeFicheParts[1] ? '/' + typeFicheParts[1] : '') + '/' + (tabValue[1] ? 'fichier' : 'updatefile');
			break;
		case 'temps':
		case 'frais':
		case 'absence':
			urlPath += '/tableau-de-bord/fiche-' + typeFicheParts[0];
			urlParams.push('vtype=' + (tabValue[1] ? 'fichier' : 'updatefile'));
			break;
		default:
			urlPath += '/tableau-de-bord/fiche-' + typeFicheParts[0] + '/' + (tabValue[1] ? 'fichier' : 'updatefile');
	}

	if(tabValue[1]) {
		if(appviewer != '') {
			urlParams.push('id=' + idFiche, 'appviewer=' + appviewer, 'idfile=' + tabValue[0], 'onglet=' + ongletFiche);
			hrefFile = 'javascript:requestFilesProfile('+varAjax+',\'' + urlPath + (urlParams.length ? '?' + urlParams.join('&') : '') + '\')';
			imgFile = 'marketplace/logo/api/'+appviewer+'.png';
		}
		else {
			urlParams.push('id=' + idFiche, 'idfile=' + tabValue[0], 'onglet=' + ongletFiche);
			hrefFile = urlPath + (urlParams.length ? '?' + urlParams.join('&') : '');
			if(cv && cv != -1) imgFile = 'cv.png'; else imgFile = 'fichier.png';
		}

		if(nodelete) {
			delTag = '';
		}
		else {
			var startUploadArgs = [
				"'" + varTab.index + "'",
				"'confirm_del'",
				"'" + tabValue[0] + "'",
				"'" + idFiche + "'",
				"'" + ongletFiche + "'",
				"'" + typeFiche + "'",
				cv,
				"'" + urlBase + "'",
				"'" + varAjax + "'",
				"'" + language + "'"
			];

			delTag =
				'<a class="bnavigationico" style="float:left" href="javascript:Wish_StartUpload('+ startUploadArgs.join(',') + ');">' +
					'<img src="images/supprimer.png" alt="Supprimer" title="'+bdelete+'" />' +
				'</a>';
		}

		varTab.insert_cell(tabValue[2], '220px', false, false);
		varTab.insert_cell('<a class="bnavigationico" style="float:left" href="'+hrefFile+'"><img src="images/'+imgFile+'" alt="Télécharger document" title="'+bupload+'" /></a>'+delTag+'<span class="progress_bar" id="progress_bar_'+varTab.index+'" style="float:left"><img src="images/loader.gif" /></span>', false, false, false);
	}
	else {
		urlParams.push('todo=join', 'id=' + idFiche, 'index=' + varTab.index, 'onglet=' + ongletFiche);
		innerHTML =
			'<form id="file_update" action="' + urlPath + (urlParams.length ? '?' + urlParams.join('&') : '') + '" method="post" enctype="multipart/form-data" target="upload_target" onsubmit="Wish_StartUpload('+varTab.index+');">'+
					'<input type="file" name="file" style="float:left;margin-right:3px;" />' +
					'<input class="bactionico bjoin" type="submit" value="'+bjoin+'" style="float:left" />' +
					'<span class="progress_bar" id="progress_bar_'+varTab.index+'" style="float:left">' +
						'<img src="images/loader.gif" />' +
					'</span><br/>'+
					'<p class="legende">'+labelLegende+'</p>' +
				'</form>'+
				'<iframe id="upload_target" name="upload_target" style="width:0;height:0;border:0px solid #fff;"></iframe>';
		varTab.insert_cell(innerHTML, '100%', false, false, 2);
	}
}

function Wish_UpdateFile(oData) {
	var nodes = oData.getElementsByTagName("file");
	if (nodes[0]) {
		Wish_StopUpload(
			nodes[0].getAttribute("value"),
			nodes[0].getAttribute("index"),
			nodes[0].getAttribute("todo"),
			nodes[0].getAttribute("filename"),
			nodes[0].getAttribute("idfile"),
			nodes[0].getAttribute("idfiche"),
			nodes[0].getAttribute("ongletfiche"),
			nodes[0].getAttribute("typefiche"),
			nodes[0].getAttribute("appviewer"),
			nodes[0].getAttribute("urlbase"),
			nodes[0].getAttribute("baction"),
			nodes[0].getAttribute("vajax"),
			nodes[0].getAttribute("vtab"),
			nodes[0].getAttribute("language")
		);
	}
}

function Wish_StartUpload(index, todo, idfile, idFiche, ongletFiche, typeFiche, cv, urlBase, vajax, language){
	typeFiche = typeFiche || '';

	var urlUpdate, confirmLabel;

	var typeFicheParts = typeFiche.split('/'), hrefBase ='';
	var urlPath = urlBase, urlParams = [];

	switch (typeFicheParts[0]) {
		case 'api':
			if (typeof window.BM.signedRequest === 'undefined') {
				console.warn('CAUTION: Wish_StartUpload() called with "api" typeFiche but "signed_request" var does not exist !!!');
			}
			else {
				// update typeFicheParts[1] (remove queryStr)
				urlParams.push('signed_request=' + encodeURIComponent(window.BM.signedRequest));
			}
			urlPath += '/api' + (typeFicheParts[1] ? '/' + typeFicheParts[1] : '') + '/updatefile';
			break;

		case 'temps':
		case 'frais':
		case 'absence':
			urlPath += '/tableau-de-bord/fiche-' + typeFicheParts[0];
			urlParams.push('vtype=updatefile');
			break;

		default:
			urlPath += '/tableau-de-bord/fiche-' + typeFicheParts[0] + '/updatefile';
	}

	switch(todo) {
		case 'delete':
			document.getElementById('progress_bar_'+index).style.visibility = 'visible';
			urlParams.push('todo=delete', 'id='+idFiche, 'idfile='+idfile, 'index='+index, 'onglet='+ongletFiche);

			window[vajax].makeRequest(urlPath + (urlParams.length ? '?' + urlParams.join('&') : ''), Wish_UpdateFile);
			break;

		case 'confirm_del':
			switch(language) {
				default:
					if (cv && cv != -1 && cv != -2)
						confirmLabel = 'Voulez-vous supprimer ce CV ?';
					else
						confirmLabel = 'Voulez-vous supprimer cette pièce jointe ?';
					break;
				case 'en':
					if(cv && cv != -1 && cv != -2)
						confirmLabel = 'Do you want to delete this CV ?';
					else
						confirmLabel = 'Do you want to delete this attachment ?';
					break;
			}

			var startUploadArgs = [
				"'" + index + "'",
				"'delete'",
				"'" + idfile + "'",
				"'" + idFiche + "'",
				"'" + ongletFiche + "'",
				"'" + typeFiche + "'",
				cv,
				"'" + urlBase + "'",
				"'" + vajax + "'",
				"'" + language + "'"
			];

			confirm(confirmLabel,'Wish_StartUpload('+ startUploadArgs.join(',') +')','');
			break;

		default:
			document.getElementById('progress_bar_'+index).style.visibility = 'visible';
			break;
	}
}

function Wish_StopUpload(result, index, todo, filename, idfile, idFiche, ongletFiche, typeFiche, appviewer, urlBase, baction, vajax, vtab, language){
	baction = baction || '';

	document.getElementById('progress_bar_'+index).style.visibility = 'hidden';
	//vtab = eval(vtab); // aaargh :'( ça fait peur tt de même !!!
	vtab = window[vtab];

	if (result != '0') {
		if (typeFiche == 'temps' || typeFiche == 'frais' || typeFiche == 'absence')
			urlFichier = '?vtype=fichier&';
		else
			urlFichier = '/fichier?';

		switch(todo) {
			case 'delete':
				if(idfile >= 0) {
					if(baction != '') {
						document.getElementById(baction).style.visibility = 'visible';

						if(appviewer != '')
							document.getElementById(baction).href = 'javascript:requestFilesProfile('+vajax+',\''+urlBase+'/tableau-de-bord/fiche-'+typeFiche+urlFichier+'id='+idFiche+'&appviewer='+appviewer+'&onglet='+ongletFiche+'\')';
						else {
							if(idfile == 0)
								document.getElementById(baction).href = 'javascript:requestFilesProfile('+vajax+',\''+urlBase+'/tableau-de-bord/fiche-'+typeFiche+urlFichier+'id='+idFiche+'&onglet='+ongletFiche+'&list=1\');';
							else
								document.getElementById(baction).href = urlBase+'/tableau-de-bord/fiche-'+typeFiche+urlFichier+'id='+idFiche+'&idfile='+idfile+'&onglet='+ongletFiche;
						}
					}
				}
				else if(baction != '')
					document.getElementById(baction).style.visibility = 'hidden';

				vtab.delete_row(vtab.tligne+index);
				if(result == '2')
					vtab.add_file([]);
				break;
			case 'join':
				if(baction != '') {
					document.getElementById(baction).style.visibility = 'visible';
					if(appviewer != '')
						document.getElementById(baction).href = 'javascript:requestFilesProfile('+vajax+',\''+urlBase+'/tableau-de-bord/fiche-'+typeFiche+urlFichier+'id='+idFiche+'&appviewer='+appviewer+'&onglet='+ongletFiche+'\')';
					else {
						if(vtab.index == 1)
							document.getElementById(baction).href = urlBase+'/tableau-de-bord/fiche-'+typeFiche+urlFichier+'id='+idFiche+'&idfile='+idfile+'&onglet='+ongletFiche;
						else
							document.getElementById(baction).href = 'javascript:requestFilesProfile('+vajax+',\''+urlBase+'/tableau-de-bord/fiche-'+typeFiche+urlFichier+'id='+idFiche+'&onglet='+ongletFiche+'&list=1\');';
					}
				}
				vtab.delete_row(vtab.tligne+index);
				vtab.add_file([idfile,true,filename]);
				if(result == '2') vtab.add_file([]);
				break;
		}
	} else {
		switch(todo) {
			case 'join':
				switch(language) {
					default:alert('Le téléchargement a échoué, assurez-vous d\'avoir sélectionné un format correct de document.');break;
					case 'en':alert('Download failed, make sure you have selected the correct format document');break;
				}
				break;
			case 'quota-max':window.location = urlBase+'/erreurs/quota-max';break;
		}
	}
}

/**
 * \brief requestFilesProfile
 * Interroge l'URL via AJAX pour récupérer la liste des CVs/Documents de la fiche
 */
function requestFilesProfile(vajax, url) {vajax.makeRequest(url, getFileProfile);}

/**
 * \brief getCVProfil
 * Retour de la fonction AJAX précédente contenant la liste des CVs/Documents du profil/fiche
 */
function getFileProfile(oData) {
	if($(oData).find('appviewerid').text() != '') {
		if($(oData).find('result').text() == '1') {
			var tabFile = [];
			$(oData).find('file').each(function() {tabFile.push([$(this).find('name').text(), $(this).find('url').text(), $(this).find('viewerembedded').text(), $(this).find('viewernormal').text(), $(this).find('categorie').text()]);});
			manageViewerApp(true, tabFile, $(oData).find('appviewerid').text(), $(oData).find('appviewername').text(), $(oData).find('embedded').text(), $(oData).find('language').text());
		} else {
			switch($(oData).find('language').text()) {
				default:alert('<strong style="color:#FF0000">Impossible de récupérer les documents dans le viewer !</strong><br /><br />Veuillez vous diriger vers la <a class="lien" href="tableau-de-bord/fiche-app?id='+$(oData).find('appviewer').text()+'">fiche de l\'app</a> et contacter l\'éditeur.');break;
				case 'en':alert('<strong style="color:#FF0000">Unable to get documents into the viewer !</strong><br /><br />Please go to the <a class="lien" href="tableau-de-bord/fiche-app?id='+$(oData).find('appviewer').text()+'">app profile</a> and contact the editor.');break;
			}
		}
	} else if($(oData).find('result').text() == '1') {
		var select = '';
		$(oData).find('file').each(function() {select += '<option value="'+$(this).find('url').text()+'">'+$(this).find('name').text()+'</option>';});
		switch($(oData).find('language').text()) {
			default:setMessageModal('Sélectionnez le document à télécharger : <select class="mediumselection" id="selfileprofile">'+select+'</select><br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Télécharger" onclick="window.location=document.getElementById(\'selfileprofile\').value;closeMessageModal();" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="Annuler" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>');break;
			case 'en':setMessageModal('Select document to download : <select class="mediumselection" id="selfileprofile">'+select+'</select><br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Download" onclick="window.location=document.getElementById(\'selfileprofile\').value;closeMessageModal();" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="Cancel" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>');break;
		}
	}
}

/**
 * \brief manageViewerApp
 */
function manageViewerApp(action, tabFile, appid, appname, embedded, language) {
	if(action) {
		if(embedded == '1') {
			if(tabFile.length > 0) {
				top.document.getElementById('div_modalmessage').style.width = '1024px';
				top.document.getElementById('div_modalmessage').style.marginLeft = '-521px';
				top.document.getElementById('div_modalmessage').style.height = '90%';
				var selectDoc = '';
				var bmImg = 'fichier.png';
				if(tabFile.length > 1) {
					selectDoc += '<select class="mediumselection" id="bmviewer_selfile" onchange="changeViewerFile(this);">';
					jQuery.each(tabFile, function(i, val) {selectDoc += '<option value="'+val[1]+'" viewerembedded="'+val[2]+'" viewernormal="'+val[3]+'" categorie="'+val[4]+'">'+val[0]+'</option>';});
					selectDoc += '</select>';
				}
				if(tabFile[0][4] == '0' || tabFile[0][4] == '3') bmImg = 'cv.png';

				var selectLabel = '', altImg1, altImg2, bClose;
				switch(language) {
					default:
						altImg1 = "Télécharger le document";
						altImg2 = "Ouvrir la visionneuse dans une nouvelle fenêtre";
						bClose = "Fermer";
						appname = '<a class="lien" href="tableau-de-bord/fiche-app?id='+appid+'">Visionneuse : '+appname+'</a>';
						if(selectDoc != '') selectLabel = 'Sélectionnez le document :';break;
					case 'en':
						altImg1 = "Download document";
						altImg2 = "Open the viewer in a new window";
						bClose = "Close";
						appname = '<a class="lien"  href="tableau-de-bord/fiche-app?id='+appid+'">Viewer : '+appname+'</a>';
						if(selectDoc != '') selectLabel = 'Select document :';break;
				}
				setMessageModal('<table width="100%"><tr style="height:25px;min-height:25px;max-height:25px;"><td><strong>'+appname+'</strong></td><td>&nbsp;</td><td width="180px">'+selectLabel+'</td><td width="260px">'+selectDoc+'</td><td width="30px"><a id="bmviewer_href" href="'+tabFile[0][1]+'"><img id="bmviewer_img" src="images/'+bmImg+'" alt="'+altImg1+'" title="'+altImg1+'" height="25px" width="25px" style="margin-bottom:-8px" /></a></td><td width="30px"><a id="bmviewer_app" href="'+tabFile[0][3]+'" target="_blank"><img id="bmviewer_img" src="images/marketplace/logo/api/'+appid+'.png" alt="'+altImg2+'" title="'+altImg2+'" height="25px" width="25px" style="margin-bottom:-8px" /></a></td><td width="60px">&nbsp;</td><td width="60px"><input type="button" value="'+bClose+'" onclick="manageViewerApp(false);" id="bok_modalmessage" style="font-size:11px;width:50px;min-width:50px;" /></td></tr></table><iframe id="bmviewer_frame" name="bmviewer_frame" src="'+tabFile[0][2]+'&iframeHeight='+top.document.getElementById('div_modalmessage').offsetHeight+'" scrolling="yes" marginwidth="0" marginheight="0" frameborder="0" style="overflow:visible;min-width:1020px;width:100%;display:block;min-height:95%;height:95%;max-height:95%"></iframe>');
				if(tabFile.length > 1) document.getElementById('bmviewer_selfile').value = tabFile[0][1];
			}
		} else {
			if(tabFile.length > 1) {
				var select = '';
				jQuery.each(tabFile, function(i, val) {select += '<option value="'+val[3]+'">'+val[0]+'</option>';});
				switch(language) {
					default:setMessageModal('Sélectionnez le document à visionner : <select <select class="mediumselection" id="bmviewer_selfile">'+select+'</select><br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Visionner" onclick="window.open(document.getElementById(\'bmviewer_selfile\').value);closeMessageModal();" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="Annuler" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>');break;
					case 'en':setMessageModal('Select document to render : <select class="mediumselection" id="bmviewer_selfile">'+select+'</select><br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Render" onclick="window.open(document.getElementById(\'bmviewer_selfile\').value);closeMessageModal();" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="Cancel" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>');break;
				}
			} else window.open(tabFile[0][3]);
		}
	} else {
		closeMessageModal();
		top.document.getElementById('div_modalmessage').style.width = '600px';
		top.document.getElementById('div_modalmessage').style.marginLeft = '-300px';
		top.document.getElementById('div_modalmessage').style.height = '';
	}
}
function changeViewerFile(select) {
	document.getElementById('bmviewer_href').href = select.value;
	if(select.options[select.selectedIndex].getAttribute('categorie') == '0' || select.options[select.selectedIndex].getAttribute('categorie') == '3') document.getElementById('bmviewer_img').src = 'images/cv.png'; else document.getElementById('bmviewer_img').src = 'images/fichier.png';
	document.getElementById('bmviewer_frame').src = select.options[select.selectedIndex].getAttribute('viewerembedded');
	document.getElementById('bmviewer_app').href = select.options[select.selectedIndex].getAttribute('viewernormal');
}
