/**
 * \file Wish_Forms.js
 * \brief Fichier de definition des methodes de la classe WishForms
 * \author Tanguy Lambert
 * \version 1.0
 * \date 19 aout 2010
 *
 * Ce fichier contient les methodes de verification des formulaires
 */

/**
 * \fn Wish_Forms
 * \brief Constructeur
 *
 * \param language : langue utilisee pour les messages
 * \param good_color : couleur de fond a appliquer aux items corrects
 * \param wrong_color : couleur de fond a appliquer aux items en erreurs
 */
Wish_Forms = function(language, good_color, wrong_color) {
	if(language)
		this.language = language;
	else
		this.language = 'fr';

	if(good_color)
		this.good_color = good_color;
	else
		this.good_color = '#FFFFFF';

	if(wrong_color)
		this.wrong_color = wrong_color;
	else
		this.wrong_color = '#FF9';
}

/**
 * \fn isFilled
 * \brief Test si les items ont ete correctement rempli
 *
 * \param itemsarray : tableau d'items a verifier
 * \return true si OK, false sinon
 *
 */
Wish_Forms.prototype.isFilled = function(itemsarray) {
	var etat = true;
	for( var i = 0; i < itemsarray.length; i++ ) {
		if( document.getElementById(itemsarray[i]) ) {
			if( document.getElementById(itemsarray[i]).value == '' ) {
				etat = false;
				document.getElementById(itemsarray[i]).style.backgroundColor = this.wrong_color;
			} else
				document.getElementById(itemsarray[i]).style.backgroundColor = this.good_color;
		}
	}

	if(!etat) {
		switch(this.language) {
			default:
				alert('Veuillez renseigner tous les champs obligatoires !');
				break;
			case 'en':
				alert('Please fill all needed items !');
				break;
		}
	}
	return etat;
}

/**
 * \fn checkPassword
 * \brief Test si les mots de passes sont identiques et respectent une taille minimale
 *
 * \param mdp : id du mot de passe
 * \param confmdp : id de la confirmation du mot de passe
 * \param size : nombre de caractere minimal pour le mot de passe (5 si non défini ou <= 0)
 * \param regexp : expression régulière des caractères autorisés pour les mots de passe (exemple: a-zA-Z0-9_-@%$€£<>&#)
 * \return true si OK, false sinon
 *
 */
Wish_Forms.prototype.checkPassword = function(mdp, confmdp, size, regexp) {
	if(!regexp)
		regexp = '.';

	if(!size || size <= 0)
		size = 6;

	var etat = true;
	if(document.getElementById(mdp)) {
		switch(this.language) {
			default:
				message_alert = 'Veuillez respecter le format requis pour votre mot de passe.';
				break;
			case 'en':
				message_alert = 'You have to fill a correct\'s format password.';
				break;
		}
		etat = this.checkRegExp(mdp, "^"+regexp+"{"+size+",}$", message_alert);
	}

	if(etat && document.getElementById(confmdp) ) {
		if( document.getElementById(mdp).value != document.getElementById(confmdp).value) {
			switch(this.language) {
				default:
					alert('La confirmation de votre mot de passe n\'est pas identique au mot de passe.');
					break;
				case 'en':
					alert('The password confirmation isn\'t the same than password.');
				break;
			}
			document.getElementById(confmdp).style.backgroundColor = this.wrong_color;
			document.getElementById(confmdp).value = '';
			etat = false;
		} else
			document.getElementById(confmdp).style.backgroundColor = this.good_color;
	}
	return etat;
}

/**
 * \fn checkSelectOptKw
 * \brief Test si un select est remplit en fonction d'un INPUT à saisir
 * \param select : id du select
 * \param input : id du input
 * \return true si OK, false sinon
 */
Wish_Forms.prototype.checkSelectOptKw = function(select, input) {
	switch(this.language) {
		default:
			message_alert = 'Veuillez saisir des caractères et sélectionner une option valide !';
			break;
		case 'en':
			message_alert = 'Please fill characters et select a valid option !';
			break;
	}

	if(this.checkRegExp(input, "^.{3,}$", message_alert)) {
		if(document.getElementById(select).value != "") {
			document.getElementById(input).style.backgroundColor = this.good_color;
			return true;
		} else {
			document.getElementById(input).style.backgroundColor = this.wrong_color;
			alert(message_alert);
		}
	}
	return false;
}

/**
 * \fn checkEmail
 * \brief Test si l'email est valide
 * \param email : id de l'email
 * \return true si OK, false sinon
 */
Wish_Forms.prototype.checkEmail = function(email) {
	switch(this.language) {
		default:
			message_alert = 'Entrez une adresse email valide !';
			break;
		case 'en':
			message_alert = 'Enter a valid email !';
			break;
	}
	return this.checkRegExp(email, "^([a-zA-Z0-9_-])+([.]?[a-zA-Z0-9_-]{1,})*@([a-zA-Z0-9-_]{2,}[.])+[a-zA-Z]{2,4}$", message_alert);
}

/**
 * \fn checkRegExp
 * \brief Test si un champ est conforme a une expression reguliere
 * \param id : identifiant du champ
 * \param verif : expression reguliere
 * \param msg : message a afficher en cas d'echec
 * \return true si succes, false sinon
 */
Wish_Forms.prototype.checkRegExp = function(id, verif, msg) {
	if(document.getElementById(id)) {
		var x 	= document.getElementById(id).value;
		var verif = RegExp(verif);
		if(verif.exec(x) == null) {
			document.getElementById(id).style.backgroundColor = this.wrong_color;
			document.getElementById(id).value = '';
			alert(msg);
			return false;
		} else {
			document.getElementById(id).style.backgroundColor = this.good_color;
			return true;
		}
	} else
		return true;
}

/**
 * \fn checkDate
 * \brief Test si une date est conforme au format jj/mm/aaaa
 * \param ddebut : identifiant de la date de début
 * \param dfin : identifiant de la date de fin (FACULTATIF)
 * \return true si Ok, false sinon
 */
Wish_Forms.prototype.checkDate = function(ddebut, dfin) {
	switch(this.language) {
		default:
			message_alert1 = 'Entrez une date valide !';
			message_alert2 = 'La date de fin est inférieure à celle de début !';
			break;
		case 'en':
			message_alert1 = 'Enter a valid date !';
			message_alert2 = 'The end schedule is lower than the start schedule !';
			break;
	}

	var etat = true;
	var date = [];
	if(document.getElementById(ddebut)) date.push(ddebut);
	if(dfin && document.getElementById(dfin)) date.push(dfin);
	for(i in date) {
		if(!this.checkRegExp(date[i], "^[0-9]{1,2}\/[0-9]{1,2}\/([0-9]{4})$", message_alert1))
			return false; // Si pas bon, retourne faux

		// On sépare la date en 3 variables pour vérification, parseInt() converti du texte en entier
		j = parseInt((document.getElementById(date[i]).value).split("/")[0], 10); // jour
		m = parseInt((document.getElementById(date[i]).value).split("/")[1], 10); // mois
		a = parseInt((document.getElementById(date[i]).value).split("/")[2], 10); // année

		// Si l'année n'est composée que de 2 chiffres on complète automatiquement
		if (a < 1000) {
			if (a < 89)	a+=2000; else a+=1900; // Si a < 89 alors on ajoute 2000 sinon on ajoute 1900
		}

		// Définition du dernier jour de février
		// Année bissextile si annnée divisible par 4 et que ce n'est pas un siècle, ou bien si divisible par 400
		if (a%4 == 0 && a%100 !=0 || a%400 == 0) fev = 29; else fev = 28;

		// Nombre de jours pour chaque mois
		nbJours = new Array(31,fev,31,30,31,30,31,31,30,31,30,31);

		// Enfin, retourne vrai si le jour est bien entre 1 et le bon nombre de jours, idem pour les mois, sinon retourn faux
		etat = ( m >= 1 && m <=12 && j >= 1 && j <= nbJours[m-1] );

		if(!etat) {
			document.getElementById(date[i]).style.backgroundColor = this.wrong_color;
			document.getElementById(date[i]).value = '';
			alert(message_alert1);
			break;
		} else
			document.getElementById(date[i]).style.backgroundColor = this.good_color;
	}

	if(etat && date.length == 2) {
		var debutDate = (document.getElementById(date[0]).value).split('/');
		var finDate = (document.getElementById(date[1]).value).split('/');

		var ds_sh_debut = new Date(parseInt(debutDate[2],10),parseInt(debutDate[1],10)-1,parseInt(debutDate[0],10));
		var ds_sh_fin = new Date(parseInt(finDate[2],10),parseInt(finDate[1],10)-1,parseInt(finDate[0],10));
		if(ds_sh_debut.getTime() - ds_sh_fin.getTime() > 0) {
			etat = false;
			document.getElementById(date[0]).style.backgroundColor = this.wrong_color;
			document.getElementById(date[1]).style.backgroundColor = this.wrong_color;
			alert(message_alert2);
		}
	}
	return etat;
}

/**
 * \fn checkHeure
 * \brief Test si une heure est conforme au format hh:mm
 * \param id : identifiant de l'heure
 * \return true si Ok, false sinon
 */
Wish_Forms.prototype.checkHour = function(id) {
	switch(this.language) {
		default:
			message_alert = 'Entrez une heure valide !';
			break;
		case 'en':
			message_alert = 'Enter a valid hour !';
			break;
	}

	var etat = true;
	if(document.getElementById(id)) {
		if(!this.checkRegExp(id, "^[0-9]{2}:[0-9]{2}$", message_alert))
			return false; // Si pas bon, retourne faux

		// On sépare l'heure en 2 variables pour vérification, parseInt() converti du texte en entier
		h = parseInt((document.getElementById(id).value).split(":")[0], 10); // heure
		m = parseInt((document.getElementById(id).value).split(":")[1], 10); // minute

		if(h <= 23 && h >= 0 && m <= 59 && m >= 0) etat = true; else etat = false;

		if( !etat ) {
			document.getElementById(id).style.backgroundColor = this.wrong_color;
			document.getElementById(id).value = '';
			alert(message_alert);
		} else
			document.getElementById(id).style.backgroundColor = this.good_color;
	}
	return etat;
}

/**
 * \fn checkHoraires
 * \brief Test si une tranche horaire est conforme
 * \param hdebut : identifiant de l'heure de début
 * \param hfin : identifiant de l'heure de fin
 * \param ddebut : identifiant de mla date de début
 * \param dfin : identifiant de la date de fin
 * \return true si Ok, false sinon
 */
Wish_Forms.prototype.checkHoraires = function(hdebut, hfin, ddebut, dfin) {
	var etat = true;
	if(this.checkDate(ddebut) && this.checkDate(dfin) && this.checkHour(hdebut) && this.checkHour(hfin)) {
		var debutDate = (document.getElementById(ddebut).value).split('/');
		var finDate = (document.getElementById(dfin).value).split('/');

		var ds_sh_debut = new Date(parseInt(debutDate[2],10),parseInt(debutDate[1],10)-1,parseInt(debutDate[0],10));
		var ds_sh_fin = new Date(parseInt(finDate[2],10),parseInt(finDate[1],10)-1,parseInt(finDate[0],10));

		ds_sh_debut.setHours(parseInt((document.getElementById(hdebut).value).split(":")[0], 10));
		ds_sh_debut.setMinutes(parseInt((document.getElementById(hdebut).value).split(":")[1], 10));
		ds_sh_fin.setHours(parseInt((document.getElementById(hfin).value).split(":")[0], 10));
		ds_sh_fin.setMinutes(parseInt((document.getElementById(hfin).value).split(":")[1], 10));

		if(ds_sh_debut.getTime() - ds_sh_fin.getTime() > 0) etat = false;

		if(!etat) {
			switch(this.language) {
				default:
					alert('La date de fin est inférieure à celle de début !');
					break;
				case 'en':
					alert('The end schedule is lower than the start schedule !');
					break;
			}
		}
	} else etat = false;
	return etat;
}

/**
 * \fn hide_elements
 * \brief Rend invisible les items
 *
 * \param idarray : tableau d'id d'items
 */
Wish_Forms.prototype.hide_elements = function(idarray, display) {
	if(display == undefined) display = '';
	for( var i = 0; i < idarray.length; i++ ){if( document.getElementById(idarray[i])) {if(display != '') document.getElementById(idarray[i]).style.display = 'none'; else document.getElementById(idarray[i]).style.visibility = 'hidden';}}
}

/**
 * \fn show_elements
 * \brief Rend visible les items
 *
 * \param idarray : tableau d'id d'items
 */
Wish_Forms.prototype.show_elements = function(idarray, display) {
	if(display == undefined) display = '';
	for( var i = 0; i < idarray.length; i++ ) {if( document.getElementById(idarray[i])) {if(display != '') document.getElementById(idarray[i]).style.display = display; else document.getElementById(idarray[i]).style.visibility = 'visible';}}
}

/**
 * \fn select_item
 * \brief Cette fonction sélectionne le bon item dans la liste
 * \param select : identifiant du select
 * \param optvalue valeur à sélectionner
 *
 */
Wish_Forms.prototype.select_item = function(select, optvalue) {document.getElementById(select).value = optvalue;}

/**
 * \fn selectforce_item
 * \brief Cette fonction sélectionne le bon item dans la liste et si il n'existe pas alors elle l'ajoute
 * \param select : tableau d'id d'items
 * \param optvalue valeur à sélectionner
 * \param opttext texte à afficher si la valeur n'existe pas
 *
 */
Wish_Forms.prototype.selectforce_item = function(select, optvalue, opttext, notforce)
{
	var state = false;
	if(notforce == undefined) notforce = false;
	for(i = 0; i < document.getElementById(select).options.length; i++) {if( document.getElementById(select).options[i].value == optvalue ) {document.getElementById(select).options[i].selected = true;state = true;break;}}
	if(!state && !notforce) {
		document.getElementById(select).options[document.getElementById(select).options.length] = new Option(opttext, optvalue);
		this.selectforce_item(select, optvalue);
	}
}

/**
 * \fn updateVisibilityOnChange
 * \brief Cette methode modifie la visibilité des éléments en paramètres en fonction des valeurs définis pour "visible" et "non-visible"
 * \param el_select select dotn on vérifie la valeur
 * \param array_show tableau des valeurs visibles
 * \param array_hide tableau des valeurs non-visibles
 * \param array_elements tableau des éléments où il faut modifier la visibilité
 */
Wish_Forms.prototype.updateVisibilityOnChange = function(el_select, array_show, array_hide, array_elements, chkInput, display) {
	if(typeof chkInput === 'string') {
		switch(chkInput) {
			case 'value': testValue = el_select;break;
		}
	} else {if(chkInput) testValue = el_select.checked; else testValue = el_select.value};
	if(display == undefined) display = '';
	for(i in array_show) {if(testValue == array_show[i]) {this.show_elements(array_elements, display);break;}}
	for(i in array_hide) {if(testValue == array_hide[i]) {this.hide_elements(array_elements, display);break;}}
}

/**
 * \fn remove_liste
 * \brief Vide entièrement une liste
 * \param select : identifiant du champ select
 */
Wish_Forms.prototype.remove_liste = function(select) {while(document.getElementById(select).options.length > 0) document.getElementById(select).options[0] = null;}

/**
 * \fn add_option
 * \brief Ajoute les caracteres '[]' a la fin du nom d'un champ select pour permettre au serveur web de récuperer les données lors d'un POST
 * \param select : identifiant du champ select
 */
Wish_Forms.prototype.add_option = function(select, text, value, disabled) {var newItem=document.getElementById(select).options.length;document.getElementById(select).options[newItem] = new Option(text, value);if(disabled)document.getElementById(select).options[newItem].disabled=disabled;}

/**
 * \fn add_itemliste
 * \brief Ajoute la liste a un champ de select (en evitant de recopier les doublons)
 * \param select : identifiant du champ select
 * \param liste : liste ['value':'text']
 */
Wish_Forms.prototype.add_itemliste = function(select, liste)
{
	var etat = true;
	for( i in liste) {
		etat = true;
		for(j = 0; j < document.getElementById(select).options.length; j++) {if(document.getElementById(select).options[j].value == i) {etat = false;break;}}
		if(etat) document.getElementById(select).options[document.getElementById(select).options.length] = new Option(liste[i], i);
	}
}

/**
 * \fn add_item
 * \brief Ajoute les champs sélectionnés d'un select a un autre select (en evitant de recopier les doublons)
 * \param selectstart : identifiant du select de départ
 * \param selectend : identifiant du select de recopie
 * \param maxselection : nombre de valeurs maximum que peut contenir le champ select de recopie
 */
Wish_Forms.prototype.add_item = function(selectstart, selectend, maxselection, ignoreitem)
{
	if(!maxselection) maxselection = -1;

	for(i = 0; i < document.getElementById(selectstart).options.length; i++) {
		if( document.getElementById(selectstart).options[i].selected ) {
			etat = true;
			for(j = 0; j < document.getElementById(selectend).options.length; j++) {if((document.getElementById(selectend).options[j].value == document.getElementById(selectstart).options[i].value) || (document.getElementById(selectend).options.length == maxselection)) {etat = false;break;}}
			if(etat || (ignoreitem && document.getElementById(selectstart).options[i].value == ignoreitem)) document.getElementById(selectend).options[document.getElementById(selectend).options.length] = new Option(document.getElementById(selectstart).options[i].text,document.getElementById(selectstart).options[i].value);
		}
	}
}

/**
 * \fn delete_item
 * \brief Supprime les champs sélectionnés d'un select
 * \param select : identifiant du select
 */
Wish_Forms.prototype.delete_item = function(select) {for(i = 0; i < document.getElementById(select).options.length; i++) {if( document.getElementById(select).options[i].selected ) {document.getElementById(select).options[i] = null;i=-1;}}}

/**
 * \fn up_item
 * \brief Monte les items sélectionnés de 1 cran au-dessus des autres
 * \param select : identifiant du select
 */
Wish_Forms.prototype.up_item = function(select)
{
	//On construit la liste des items sélectionnés
	for(i = 0; i < document.getElementById(select).options.length; i++) {
		if( document.getElementById(select).options[i].selected ) {
			if(document.getElementById(select).options[i-1]) {
				lastvalue = document.getElementById(select).options[i].value;
				document.getElementById(select).options[i].value = document.getElementById(select).options[i-1].value;
				document.getElementById(select).options[i-1].value = lastvalue;

				lasttext = document.getElementById(select).options[i].text;
				document.getElementById(select).options[i].text = document.getElementById(select).options[i-1].text;
				document.getElementById(select).options[i-1].text = lasttext;

				document.getElementById(select).options[i].selected = false;
				document.getElementById(select).options[i-1].selected = true;
			}
		}
	}
}

/**
 * \fn down_item
 * \brief Descend les items sélectionnés de 1 cran en dessous des autres
 * \param select : identifiant du select
 */
Wish_Forms.prototype.down_item = function(select)
{
	j = 0;
	listeSel = new Array();

	//On construit la liste des items sélectionnés
	for(i = 0; i < document.getElementById(select).options.length; i++) {if( document.getElementById(select).options[i].selected ) {listeSel[j] = i;j++;}}

	//On parcourt cette liste par le bas
	for(i = listeSel.length-1; i >= 0; i--) {
		if(document.getElementById(select).options[listeSel[i]+1]) {
			lastvalue = document.getElementById(select).options[listeSel[i]].value;
			document.getElementById(select).options[listeSel[i]].value = document.getElementById(select).options[listeSel[i]+1].value;
			document.getElementById(select).options[listeSel[i]+1].value = lastvalue;

			lasttext = document.getElementById(select).options[listeSel[i]].text;
			document.getElementById(select).options[listeSel[i]].text = document.getElementById(select).options[listeSel[i]+1].text;
			document.getElementById(select).options[listeSel[i]+1].text = lasttext;

			document.getElementById(select).options[listeSel[i]].selected = false;
			document.getElementById(select).options[listeSel[i]+1].selected = true;
		}
	}
}

/**
 * \fn get_selection
 * \brief Ajoute les caracteres '[]' a la fin du nom d'un champ select pour permettre au serveur web de récuperer les données lors d'un POST
 * \param select : identifiant du champ select
 */
Wish_Forms.prototype.getSelection = function(select)
{
	for(i = 0; i < document.getElementById(select).options.length; i++) document.getElementById(select).options[i].selected = true;
	document.getElementById(select).name = document.getElementById(select).name.concat("[]");
}

/**
 * \fn copyCheckInputValue
 * \brief Copie la valeur d'une checkbox dans un input text si la check box est activé, sinon met une chaine vide
 */
Wish_Forms.prototype.copyCheckInputValue = function(idinputchk, idinputtext) {if(document.getElementById(idinputchk).checked == true) document.getElementById(idinputtext).value = document.getElementById(idinputchk).value; else document.getElementById(idinputtext).value = '';}


/**
 * \fn fill_listeRegExp
 * \brief Remplit un select avec une liste dont les items vérifies l'expression régulière sur la valeur d'un élément
 * \param el element "select" contenant la valeur
 * \param select element "select" a remplir
 * \param liste liste à traiter et à ajouter si les indices correspondent à l'expression régulière
 * \param startrefexp debut de l'expressionréguliere
 * \param allitems valeur de l'option pour laquelle on remplit le select de TOUS les items
 * \param type true si compétences, false si mobilités
 */
Wish_Forms.prototype.fill_listeRegExp = function(el, select, liste, startregexp, allitems)
{
	this.remove_liste(select);
	if(!startregexp) startregexp = "";
	var verif = RegExp(startregexp+el.value);
	if(allitems && el.value == allitems) {
		document.getElementById(select).options[document.getElementById(select).options.length] = new Option('','');
		for(i in liste) document.getElementById(select).options[document.getElementById(select).options.length] = new Option(liste[i],i);
	} else {
		for(i in liste) if(verif.exec(i)) document.getElementById(select).options[document.getElementById(select).options.length] = new Option(liste[i],i);
	}

	if(document.getElementById(select).options.length > 0)
		document.getElementById(select).options[0].selected = true;
}

/**
 * \fn find_itemRegExp
 * \brief Trouve l'indice dans la liste qui répond à l'expression régulière de l'item
 * \param item item à tester
 * \param liste liste à traiter
 * \param startrefexp debut de l'expressionréguliere
 * \return -1 si aucun résultat sinon la valeur de l'indice
 */
Wish_Forms.prototype.find_itemRegExp = function(item, liste, startregexp)
{
	if(!startregexp) startregexp = "";
	var result = '-1';
	for(i in liste) {
		var verif = RegExp(startregexp+i);
		if(verif.exec(item))
			result = i;
	}
	return result;
}

/**
 * \fn find_item
 * \brief Trouve le label d'un item dans une liste
 * \param item valeur de la competence
 * \param liste liste à traiter
 * \return retourne la valeur si aucun resultat, sinon le label de la competence
 */
Wish_Forms.prototype.find_item = function(item, liste) {for(i in liste) {if( i == item )return liste[i];}return item;}

/**
 * \fn update_itemListeView
 * \brief Met à jour un champ texte d'une liste avec le label demandé
 * \param liste liste de valeurs à trouver
 * \param liste liste de toutes les valeurs possibles
 * \param separator caracteres de separation à positionner entre les labels
 * \param id identifiant du champ texte
 * \param trunc valeur positive = on tronque, avec les caracteres trun_chars, si le nombre de résultats atteint cette valeur, sinon on ne fait rien
 */
Wish_Forms.prototype.update_itemListeView = function(liste_temp, liste, separator, id, trunc_value, trunc_chars, prefix)
{
	if(!prefix) prefix = '';
	value = '';
	j = 0;
	for(i in liste_temp) {
		if( value == '')
			value = prefix + this.find_item(liste_temp[i], liste);
		else {
			if(!(trunc_value==undefined) && (j+1) >= trunc_value) {
				value += trunc_chars;
				break;
			} else
				value += separator + prefix + this.find_item(liste_temp[i], liste);
			j++;
		}
	}
	document.getElementById(id).innerHTML = value;
}

/**
 * \fn LimiterTextArea
 * \brief Limite le nombre de caractères max. dans un textarea
 * \param varName variable javascript Wish_Forms
 * \param nom_controletexte id du controle textarea
 * \param nbcar
 * \param nom_controledecompte id de l'élément affichant les caractères restants
 */
Wish_Forms.prototype.LimiterTextArea = function(varName, nom_controletexte, nbcar, nom_controledecompte)
{
	var moncontroletexte = document.getElementById(nom_controletexte);
	if (moncontroletexte) {
		moncontroletexte.onclick = function(){varName.TextAreaEstRempli(moncontroletexte, nbcar, nom_controledecompte)};
		moncontroletexte.onblur = function(){varName.TextAreaEstRempli(moncontroletexte, nbcar, nom_controledecompte)};
		moncontroletexte.onkeyup = function(){varName.TextAreaEstRempli(moncontroletexte, nbcar, nom_controledecompte)};
		moncontroletexte.onkeypress = function(){varName.TextAreaEstRempli(moncontroletexte, nbcar, nom_controledecompte)};
		this.TextAreaEstRempli(moncontroletexte, nbcar, nom_controledecompte);
	}
}

/**
 * \fn TextAreaEstRempli
 * \brief test si le contrôle est plein et met à jour le décompte
 * \param nom_controletexte id du controle textarea
 * \param nbcar
 * \param nom_controledecompte id de l'élément affichant les caractères restants
 * \return true si le textarea est plein
 */
Wish_Forms.prototype.TextAreaEstRempli = function(moncontroletexte, nbcar, nom_controledecompte)
{
	var etat = false;
	var moncontroledecompte = document.getElementById(nom_controledecompte);
	if(moncontroletexte) {
		if(moncontroletexte.value.length <= nbcar) etat=true; else moncontroletexte.value = moncontroletexte.value.substr(0, nbcar);
		if(moncontroledecompte){if(moncontroledecompte.type) moncontroledecompte.value = this.NbCarRestant(moncontroletexte, nbcar); else moncontroledecompte.innerHTML = this.NbCarRestant(moncontroletexte, nbcar);}
	}
	return etat;
}

/**
 * \fn NbCarRestant
 * \brief Calcule le nombre de caractere restant
 * \param nom_controletexte id du controle textarea
 * \param nbcar
 * \return le nombre de caracteres
 */
Wish_Forms.prototype.NbCarRestant = function(moncontroletexte, nbcar) {if (moncontroletexte.value.length) return new Number(nbcar - moncontroletexte.value.length); else return new Number(nbcar);}

/**
 * \fn SetMailTo
 * \brief Construit la référence d'une balise <a> qui ouvre l'application de mail par défaut et envoit un mail groupés aux profils sélectionnés
 * \param liste Tableau contenant tous les profils de la page avec leur identifiant et leur email
 * \param nameTag Nom des balises checjbox de la page
 */
Wish_Forms.prototype.SetMailTo = function(liste, nameTag)
{
	var dest='';
	var liste_el = document.getElementsByName(nameTag);
	for(var i=0; i < liste_el.length; i++) {
		if(liste_el.item(i).checked) {
			if(liste[liste_el.item(i).value] != '') {
				if(dest != '') dest += ',';
				dest += liste[liste_el.item(i).value];
			}
		}
	}
	return 'mailto:'+dest;
}

/**
 *  \fn SetInputEmpty
 *  \brief annule la valeur d'un input si sa valeur actuelle est égale à la valeur passée en paramètre
 *
 *  \param el input à modifier
 *  \param value valeur à tester
 */
Wish_Forms.prototype.SetInputEmpty = function(el, valeur) {if(el.value == valeur) el.value = '';}

/**
 * \fn GetKeyPress
 * \brief Indique si un évènement lors d'une pression sur une touche du clavier peut générer une sauvegarde de la page
 */
Wish_Forms.prototype.isKeyPressSaveEvent = function(event) {
	evt = event||window.event // IE support
	var node = evt.target||evt.srcElement // IE Support
	var ctrlDown = evt.ctrlKey||evt.metaKey // Mac support

	// Check for Ctrll+s, Cmd+s, enter
	if((ctrlDown && evt.keyCode == 83) || (evt.keyCode == 13 && node.nodeName != 'TEXTAREA')) return true; else return false;
}
