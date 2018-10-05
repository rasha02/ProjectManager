function showMessageValidation(state, url, language, cplt, docSave, idselect, tabQuestions)
{
    if(tabQuestions === undefined) tabQuestions = [];

    htmlQuestions = '';
    switch(language) {
        default:
            if(cplt && cplt != '') cplt = 'Cette action s\'appliquera au manager :'+cplt; else cplt = '';
            if(state == 1 && tabQuestions.length > 0) {
                htmlQuestions = '<br /><br /><table width="100%" style="table-layout: fixed">';
                for (var i = 0; i < tabQuestions.length; i++) {
                    addPaddingTop = (i > 0) ? 'padding-top: 5px' : '';
                    htmlQuestions += '<tr><td align="left" width="70%" style="overflow-wrap: break-word"><input class="hiddeninput" type="text" id="valquestiontxt_' + i + '" name="valquestiontxt_' + i + '" value="' + tabQuestions[i] + '" /><span class="legende">' + tabQuestions[i] + '&nbsp;<span style="color:#FF0000;">*</span></span></td><td width="15%" ' + addPaddingTop + ' ><input type="radio" value="1" id="valquestionradioyes_' + i + '" name="valquestionradio_' + i + '" /><label for="valquestionradioyes_' + i + '">&nbsp;<span class="legende">oui</span></label></td><td width="15%" ' + addPaddingTop + ' ><input type="radio" value="0" id="valquestionradiono_' + i + '" name="valquestionradio_' + i + '" /><label for="valquestionradiono_' + i + '">&nbsp;<span class="legende">non</span></label></td></tr>';
                }
                htmlQuestions += '<tr><td colspan="3">&nbsp;</td></tr><tr><td align="left" colspan="3"><span style="color:#FF0000;">*</span>&nbsp;<span style="font-size:10px;">Obligatoire</span></td></tr></table>';
            }
            break;
        case 'en':
            if(cplt && cplt != '') cplt = 'This action will apply to the manager :'+cplt; else cplt = '';
            if(state == 1 && tabQuestions.length > 0) {
                htmlQuestions = '<br /><br /><table width="100%">';
                for (var i = 0; i < tabQuestions.length; i++) {
                    addPaddingTop = (i > 0) ? 'padding-top: 5px' : '';
                    htmlQuestions += '<tr><td align="left" width="70%" style="overflow-wrap: break-word"><input class="hiddeninput" type="text" id="valquestiontxt_' + i + '" name="valquestiontxt_' + i + '" value="' + tabQuestions[i] + '" /><span class="legende">' + tabQuestions[i] + '&nbsp;<span style="color:#FF0000;">*</span></span></td><td width="15%"  ' + addPaddingTop + ' ><input type="radio" value="1" id="valquestionradioyes_' + i + '" name="valquestionradio_' + i + '" /><label for="valquestionradioyes_' + i + '">&nbsp;<span class="legende">yes</span></label></td><td width="15%" ' + addPaddingTop + ' ><input type="radio" value="0" id="valquestionradiono_' + i + '" name="valquestionradio_' + i + '"  /><label for="valquestionradiono_' + i + '">&nbsp;<span class="legende">no</span></label></td></tr>';
                }
                htmlQuestions += '<tr><td colspan="3">&nbsp;</td></tr><tr><td align="left" colspan="3"><span style="color:#FF0000;">*</span>&nbsp;<span style="font-size:10px;">Mandatory</span></td></tr></table>';
            }
            break;
    }

    if(docSave) {eForm = '';tButton = 'button';} else {eForm = '</form>';tButton = 'submit';}
    switch(state) {
        case 0:
            if(docSave) {sForm = '';onclickFunction = ' onclick="validate_document(0,\''+url+'\');"';} else {sForm = '<form name="valmotif" id="valmotif" method="post" action="'+url+'&vtype=rejet">';onclickFunction = '';}
            switch(language) {
                default:setMessageModal(sForm+cplt+'Une fois ce document rejeté, un message sera automatiquement envoyé au validateur précédent.<br/><br/>Veuillez indiquer le type & motif de votre rejet :<br/><br/><select class="longselection" name="type_refus" id="type_refus"><option value="0">Rejet pour correction du validateur N-1</option><option value="2">Rejet pour correction de tous les validateurs</option><option value="1">Rejet définitif</option></select><br /><br /><textarea class="mediumarea" name="motif_refus" id="motif_refus"></textarea><br /><br />Voulez-vous rejeter le document ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="'+tButton+'" value="Oui" id="byes_modalmessage"'+onclickFunction+' /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="Non" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>'+eForm);break;
                case 'en':setMessageModal(sForm+cplt+'Once the document is dismissed, a message will be automatically sent to the previously validator.<br/><br/>Please indicate your type & reason for rejection :<br/><br/><select class="mediumselection" name="type_refus" id="type_refus"><option value="0">Rejection for correction of N-1 validator</option><option value="2">Rejection for correction of all validators</option><option value="1">Definitive rejection</option></select><br /><br /><textarea class="mediumarea" name="motif_refus" id="motif_refus"></textarea><br /><br />Do you want to reject this document ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="'+tButton+'" value="Yes" id="byes_modalmessage"'+onclickFunction+' /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="No" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>'+eForm);break;
            }
            break;
        case 1:
            if(docSave) {sForm = '';onclickFunction = ' onclick="validate_document(1,\''+url+'\','+tabQuestions.length+');"';} else {sForm = '<form name="valmotif" id="valmotif" method="post" action="'+url+'&vtype=validation">';onclickFunction = '';}
            switch(language) {
                default:setMessageModal(sForm+cplt+'Une fois ce document validé, un message sera automatiquement envoyé au validateur suivant.'+htmlQuestions+'<br/><br/>Voulez-vous valider le document ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="'+tButton+'" value="Oui" id="byes_modalmessage"'+onclickFunction+' /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="Non" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>'+eForm);break;
                case 'en':setMessageModal(sForm+cplt+'Once the document is validated, a message will be automatically sent to the next validator.'+htmlQuestions+'<br/><br/>Do you want to validate this document ?<table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="'+tButton+'" value="Yes" id="byes_modalmessage"'+onclickFunction+' /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="No" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>'+eForm);break;
            }
            break;
        case 2:
            if(docSave) {sForm = '';onclickFunction = ' onclick="validate_document(2,\''+url+'\');"';} else {sForm = '<form name="valmotif" id="valmotif" method="post" action="'+url+'&vtype=devalidation">';onclickFunction = '';}
            switch(language) {
                default:setMessageModal(sForm+cplt+'Cette action autorisera de nouveau la validation et le rejet.<br/><br/>Voulez-vous invalider le document ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="'+tButton+'" value="Oui" id="byes_modalmessage"'+onclickFunction+' /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="Non" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>'+eForm);break;
                case 'en':setMessageModal(sForm+cplt+'This action will allow the validation and rejection.<br/><br/>Do you want to invalidate this document ?<table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="'+tButton+'" value="Yes" id="byes_modalmessage"'+onclickFunction+' /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="No" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>'+eForm);break;
            }
            break;
    }
    if(cplt != '' && idselect != '0' && document.getElementById('id_selval')) document.getElementById('id_selval').value = idselect;
}

function validate_document(state, url, tabQuestionsLength)
{
    if(tabQuestionsLength === undefined) tabQuestionsLength = 0;

    url_comp = '';
    switch(state) {
        case 0:
            url_comp = '&vtype=rejet';
            url_comp += '&motif_refus='+document.getElementById('motif_refus').value+'&type_refus='+document.getElementById('type_refus').value;
            if(document.getElementById('id_selval')) url_comp += '&id_selval='+document.getElementById('id_selval').value;
            closeMessageModal();
            document.getElementById('fiche').action += url_comp;
            document.getElementById('fiche').submit();
            break;
        case 1:
            url_comp = '&vtype=validation';
            if(document.getElementById('id_selval')) url_comp += '&id_selval='+document.getElementById('id_selval').value;
            valState = true;
            if(state == 1 && tabQuestionsLength > 0) {
                for (var i = 0; i < tabQuestionsLength; i++) {
                    if(document.getElementById('valquestiontxt_' + i)) url_comp += '&valquestiontxt_' + i + '='+document.getElementById('valquestiontxt_' + i).value;
                    if(document.getElementById('valquestionradioyes_' + i) && document.getElementById('valquestionradioyes_' + i).checked) url_comp += '&valquestionradio_' + i + '=1';
                    if(document.getElementById('valquestionradiono_' + i) && document.getElementById('valquestionradiono_' + i).checked) url_comp += '&valquestionradio_' + i + '=0';

                    if((!document.getElementById('valquestionradioyes_' + i) || !document.getElementById('valquestionradioyes_' + i).checked) &&
                        (!document.getElementById('valquestionradiono_' + i) || !document.getElementById('valquestionradiono_' + i).checked))
                        valState = false
                }
            }

            if(valState) {
                closeMessageModal();
                document.getElementById('fiche').action += url_comp;
                document.getElementById('fiche').submit();
            }
            break;
        case 2:
            url_comp = '&vtype=devalidation';
            if(document.getElementById('id_selval')) url_comp += '&id_selval='+document.getElementById('id_selval').value;
            closeMessageModal();
            document.getElementById('fiche').action += url_comp;
            document.getElementById('fiche').submit();
            break;
        case 3:url_comp = '&vtype=pdf';window.location = url+url_comp;break;
        case 4:
            url_comp = '&vtype=pdf&param=1&idprj='+document.getElementById('msgmodal_selprj').value;
            if( document.getElementById('msgmodal_seltypeh') ) {for(i = 0; i < document.getElementById('msgmodal_seltypeh').options.length; i++) if(document.getElementById('msgmodal_seltypeh').options[i].selected) url_comp += '&reftypeh[]='+document.getElementById('msgmodal_seltypeh').options[i].value;}
            if( document.getElementById('showintcontact') && document.getElementById('showintcontact').checked == true ) url_comp += '&showintcontact=1';
            if( document.getElementById('showcomment') && document.getElementById('showcomment').checked == true ) url_comp += '&showcomment=1';
            if( document.getElementById('showtypehname') && document.getElementById('showtypehname').checked == true ) url_comp += '&showtypehname=1';
            if( document.getElementById('onlyrefact') && document.getElementById('onlyrefact').checked == false ) url_comp += '&onlyrefact=1';
            closeMessageModal();
            window.location = url+url_comp;
            break;
        case 5:
            if( document.getElementById('om_type') ) url_comp += '&ordertype='+document.getElementById('om_type').value;
            if( document.getElementById('om_action') ) url_comp += '&orderaction='+document.getElementById('om_action').value;
            if( document.getElementById('om_crmliste') ) url_comp += '&crmliste='+document.getElementById('om_crmliste').value;
            closeMessageModal();
            window.location = url+url_comp;
            break;
        case 6:
            if( document.getElementById('prj_pdfperiod') ) url_comp += '&pdfperiod='+document.getElementById('prj_pdfperiod').value;
            closeMessageModal();
            window.location = url+url_comp;
            break;
        case 7:
            url_comp = '&idcmd='+document.getElementById('msgmodal_selcmd').value;
            closeMessageModal();
            window.location = url+url_comp;
            break;
    }
}

/**
 * \fn exporter_document
 * \brief Demande de choisir une période pour laquelle on va construire le PDF des temps
 * \param jsMensualites tableau contenant les périodes à choisir
 * \param url adresse web du serveur qui va traiter la requête
 * \param language langue du site
 */
function showMessageExportation(url, reference, language)
{
	selectTxt = '';
    jQuery.each(reference, function(i, val) {selectTxt += '<option value="'+i+'">'+val+'</option>';});
    if(selectTxt != '') {
        switch(language) {
            default:selectTxt = 'Veuillez sélectionner le type d\'export :<br/><br/><select id="exp_type" class="longselection">'+selectTxt+'</select><br /><br />';break;
            case 'en':selectTxt = 'Please select the type of export :<br/><br/><select id="exp_type" class="longselection">'+selectTxt+'</select><br /><br />';break;
        }
    }
    switch(language) {
        default:confirm(selectTxt+'Désirez-vous procéder à l\'exportation ?', 'exporter_document(\''+url+'\')', '', this.language);break;
        case 'en':confirm(selectTxt+'Désirez-vous procéder à l\'exportation ?', 'exporter_document(\''+url+'\')', '', this.language);break;
    }
}
function exporter_document(url) {window.location = url+'&exp_type='+document.getElementById('exp_type').value;}

/**
 * \fn showPrjPDF
 * \brief Demande de choisir une période pour laquelle on va construire le PDF des temps
 * \param jsMensualites tableau contenant les périodes à choisir
 * \param url adresse web du serveur qui va traiter la requête
 * \param language langue du site
 */
function showPrjPDF(jsMensualites, url, language)
{
    selectTxt = '';
    jQuery.each(jsMensualites, function(i, val) {selectTxt += '<option value="'+i+'">'+val+'</option>';});

    switch(language)
    {
        default:
            setMessageModal('Veuillez sélectionner la période désirée :<br/><br/><select name="pdfperiod" id="prj_pdfperiod" class="normalselection">'+selectTxt+'</select><br/><br/>Voulez-vous afficher le PDF ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Oui" onclick="validate_document(6,\''+url+'\');" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="Non" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>');
            break;
        case 'en':
            setMessageModal('Please select the desired period :<br/><br/><select name="pdfperiod" id="prj_pdfperiod" class="normalselection">'+selectTxt+'</select><br/><br/>Do you want to show the PDF ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Yes" onclick="validate_document(6,\''+url+'\');" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="No" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>');
            break;
    }
}

/**
 * \fn showOrderMissionPDF
 * \brief Demande de choisir un type d'ordre de mission
 * \param orderType tableau contenant les types d'ordres de missions
 * \param url adresse web du serveur qui va traiter la requête
 * \param language langue du site
 */
function showOrderMissionPDF(orderType, crmListe, url, language)
{
    selectTxt1 = '';
    jQuery.each(orderType, function(i, val) {selectTxt1 += '<option value="'+i+'">'+val+'</option>';});

    selectTxt2 = '';
    jQuery.each(crmListe, function(i, val) {selectTxt2 += '<option value="'+i+'">'+val+'</option>';});

    switch(language)
    {
        default:
            setMessageModal('Veuillez sélectionner le type d\'ordre de mission désiré et le contact crm associé :<br/><br/><select name="ordertype" id="om_type" class="longselection">'+selectTxt1+'</select><br/><br/><select name="crmliste" id="om_crmliste" class="longselection">'+selectTxt2+'</select><br/><br/>Voulez-vous <select name="orderaction" id="om_action" class="mediumselection"><option value="0" selected="selected">afficher</option><option value="1">envoyer à la ressource par mail</option></select> le PDF ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Oui" onclick="validate_document(5,\''+url+'\');" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="Non" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>');
            break;
        case 'en':
            setMessageModal('Please select the desired mission order type and the associated crm contact:<br/><br/><select name="ordertype" id="om_type" class="longselection">'+selectTxt1+'</select><br/><br/><select name="crmliste" id="om_crmliste" class="longselection">'+selectTxt2+'</select><br/><br/>Do you want to <select name="orderaction" id="om_action" class="mediumselection"><option value="0" selected="selected">show</option><option value="1">send to the resource by mail</option></select> the PDF ?<br /><br /><table width="100%"><tr><td width="21%">&nbsp;</td><td width="25%"><input type="button" value="Yes" onclick="validate_document(5,\''+url+'\');" id="byes_modalmessage" /></td><td width="8%">&nbsp;</td><td width="25%"><input type="button" value="No" onclick="closeMessageModal();" id="bno_modalmessage" /></td><td width="21%">&nbsp;</td></tr></table>');
            break;
    }
}

/**
 * \fn updateNewPeriodeAbsence
 * \brief Construit le tableau des jours du mois sélectionné pour permettre à l'utilisateur de choisir ses jours d'absences
 */
function updateNewPeriodeAbsence(oData) {
    var ligne_entete = '';
    var ligne_uo = '';
    nodes = oData.getElementsByTagName("periode");
    jours = oData.getElementsByTagName("jour");
    if(nodes.length == 1 && jours.length == nodes[0].getAttribute("duree")) {
        //On construit la ligne du Mois
        for (var i=0; i<nodes[0].getAttribute("duree"); i++) {
            ligne_entete += '<th class="bg_titres" width="25px" scope="col">'+(i+1)+'</th>';

            switch(jours[i].getAttribute("type")) {
                case '1':classJour="bg_alterne_weekend";break;
                case '2':classJour="bg_alterne_holliday";break;
                default:classJour="bg_alterne_ouvre";break;
            }
            ligne_uo += '<td class="'+classJour+'" align="middle"><input id="abs_jrs_'+i+'" type="text" class="veryveryshortinput" value="" maxlength="4" /></td>';
        }
    }
    document.getElementById('ligne_newperiode').innerHTML =  '<table width="100%"><tr>'+ligne_entete+'</tr><tr class="bg_alterne_soft_full">'+ligne_uo+'</tr></table>';
}

/**
 * \fn addNewPeriode
 * \brief Ajoute les périodes d'absences en fonction des jours sélectionnés
 * \param agencyUO Nombre d'UO de l'agence de l'utilisateur
 * \param mois Mois de la période considérée
 * \param annee Année de la période considérée
 */
function addNewPeriode(agencyUO, mois, annee, language) {
    var i = 0;
    var j = 0;
    var searchPeriode = true;
    var tabPeriodes = [];
	var error = false;
    while(document.getElementById('abs_jrs_'+i)) {
        realUO = document.getElementById('abs_jrs_'+i).value.replace(',','.')/agencyUO;
        if(!isNaN(realUO)) {
            // 2 digits month.
            m2 = '00' + mois;
            m2 = m2.substr(m2.length - 2);
            // 2 digits day.
            d2 = '00' + (i+1);
            d2 = d2.substr(d2.length - 2);
            // YYYY-MM-DD
            dateJour = d2 + '/' + m2 + '/' + annee;

            pushPeriode = false;
            if(searchPeriode) {//On recherche la prochaine période
                dureePeriode = realUO;
                switch(realUO) {
                    case 0:break;
                    case 1:
                        searchPeriode = false;
                        dateDebut = dateJour;
                        if(!document.getElementById('abs_jrs_'+(i+1))) {//Si on est au dernier jour du mois, on ajouter cette période
                            dateFin = dateJour;
                            pushPeriode = true;
                        }
                        break;
                    default:
                        dateDebut = dateJour;
                        dateFin = dateJour;
                        pushPeriode = true;
                        break;
                }
            } else {//On est dans une période
                dureePeriode += realUO;
                switch(realUO) {
                    case 0://Nouvelle période
                        if(i == 0)
                            dateFin = dateJour;
                        else {
                            dF = '00' + i;
                            dF = dF.substr(dF.length - 2);
                            dateFin = dF + '/' + m2 + '/' + annee;
                        }
                        pushPeriode = true;
                        searchPeriode = true;
                        break;
                    case 1:
                        if(!document.getElementById('abs_jrs_'+(i+1))) {//Si on est au dernier jour du mois, on ajouter cette période
                            dateFin = dateJour;
                            pushPeriode = true;
                        }
                        break;
                    default://La journée n'est pas complète, on termine la période
                        dateFin = dateJour;
                        pushPeriode = true;
                        searchPeriode = true;
                        break;
                }
            }

            if(pushPeriode) {//On ajoute une nouvelle période
				var tmpDF = dateFin.split('/');
				var tmpDD = dateDebut.split('/');
				var tmp = 1 + (new Date(tmpDF[2],tmpDF[1],tmpDF[0]) - new Date(tmpDD[2],tmpDD[1],tmpDD[0])) / 86400000;
				if(tmp < dureePeriode || (tmp-1) > dureePeriode) error = true;
                tabPeriodes[j] = [];
                tabPeriodes[j].push(dateDebut);
                tabPeriodes[j].push(dateFin);
                tabPeriodes[j].push(dureePeriode);
                j++;
            }
        }
        i++;
    }

	if(!error && tabPeriodes.length == 0) {
		switch(language) {
			case 'en':alert('Please fill leaves days !');break;
			default:alert('Veuillez saisir des jours d\'absences !');break;
		}
	} else if(error) {
		switch(language) {
			case 'en':alert('You cannot fill more days than the real days number on your leaves periods !');break;
			default:alert('Vous ne pouvez pas saisir plus de jours que le nombre de jours réels sur vos périodes d\'absences !');break;
		}
	} else {
		i = 0;while(document.getElementById('abs_jrs_'+i)) {document.getElementById('abs_jrs_'+i).value = "";i++;}
		var description = (document.getElementById('abs_description').value).replace(/&/gi,'&amp;').replace(/</gi,'&lt;').replace(/>/gi,'&gt;').replace(/"/gi,'&quot;');
		jQuery.each(tabPeriodes, function(k, period) {wtabDemande.add_demande([0,document.getElementById('abs_typeh').value,description,period[0],period[1],period[2]]);});
	}
}
