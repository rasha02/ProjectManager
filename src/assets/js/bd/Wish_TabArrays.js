// JavaScript Document
/* \file Wish_TabArrays.js
 * \brief Fichier de definition des methodes de la classe Wish_TabArrays
 * \author Tanguy Lambert
 * \version 1.0
 * \date 19 aout 2010
 *
 * Ce fichier contient les methodes de gestion des tableaux
 */
/**
 * \fn Wish_TabArrays
 * \brief Constructeur
 * \param tbody identifiant du body du tableau
 * \param tligne préfixe des identifiants des lignes
 * \param tname Attribut nom des input cachés contenant les valeurs uniques des lignes
 */
Wish_TabArrays = function(tbody, tligne, tname) {
    this.tligne = tligne;
    this.tname = (tname === undefined) ? '' : tname;
    this.tableau = document.getElementById(tbody);
    
    this.index = 1;
    this.numCell = 0;
    this.defaultValue = false;
}

/**
 * \fn delete_row
 * \brief supprime une ligne du tableau
 * \param tchild identifiant de la ligne à supprimer
 *
 */
Wish_TabArrays.prototype.delete_row = function(tchild)
{
    var row = document.getElementById(tchild).rowIndex;
    this.tableau.deleteRow(row);
}

/**
 * \fn insert_row
 * \brief Ajoute une ligne au tableau
 * \param delta nombre de ligne à ignorer avant l'ajout
 * \param fromtop si true on ajote en haut du tableau, sinon en bas
 *
 */
Wish_TabArrays.prototype.insert_row = function(classname, identifier, delta, fromtop, display)
{
    if(identifier)
        this.index = identifier;
    
    if(!delta)
        delta = 0;
    
    if(fromtop)
        this.ligne = this.tableau.insertRow(0+delta);
    else {
        this.ligne = this.tableau.insertRow(this.tableau.rows.length-1+delta);
    }

    if(classname) this.ligne.className = classname;
    if(display) this.ligne.style.display = display;

    this.ligne.id = this.tligne+this.index;//On construit l'identifiant de la ligne
    this.numCell = 0;
}

/**
 * \fn insert_cell
 * \brief Ajoute une cellule à une ligne
 * \param ligne variable ligne à laquelle on ajoute une cellule
 *
 */
Wish_TabArrays.prototype.insert_cell = function(innerhtml, width, align, classname, colspan, rowspan, cellId)
{
    var newCell = this.ligne.insertCell(this.numCell);
    if(align) newCell.align=align;
    if(width) newCell.width=width;
    if(classname) newCell.className = classname;
    if(colspan) newCell.colSpan = colspan;
    if(rowspan) newCell.rowSpan = rowspan;
    if(cellId) newCell.id = this.ligne.id+cellId;
    newCell.innerHTML = innerhtml;
    this.numCell++;
}

/**
 * \fn getNextIndex
 * \brief
 * \param
 *
 */
Wish_TabArrays.prototype.getNextIndex = function(start)
{
    var tmpIndex = this.index = (start === undefined) ? 1 : start;
    if(this.tname !== '') {
        var valeursDOM = [].slice.call(document.querySelectorAll('[name^='+this.tname+']'));
        var valeurs = [];
        valeursDOM.forEach(function(dom){valeurs.push(dom.getAttribute('value'));});
        
        while(valeurs.filter(function(existing) { return existing == tmpIndex; }).length > 0) tmpIndex++;
        this.index = tmpIndex;
        return valeurs.length + 1;
    } else {
        while(document.getElementById(this.tligne+this.index)) this.index++;
        return this.index - tmpIndex + 1;
    }
}

/**
 * \fn setArrayValue
 * \brief
 * \param
 *
 */
Wish_TabArrays.prototype.setArrayValue = function(defaultValue, tabValue)
{
    this.defaultValue = false;
    if(tabValue.length == defaultValue.length)
        return tabValue;
    else {
        this.defaultValue = true;
        return defaultValue;
    }
}