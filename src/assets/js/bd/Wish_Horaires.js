// JavaScript pour la gestion du calendrier
Wish_Horaires = function(varName, el, output, el_fin, language, gap_way, other_hour, calendar_hour) {
    this.varName = varName;        //Buffer
    this.hor_ob = '';        //Buffer
    this.hor_element = document.getElementById(el);   //Horaire Element
    if(el_fin) this.hor_fin = document.getElementById(el_fin); else this.hor_fin = null;

    if(gap_way!=undefined) {
        this.gap_way = gap_way;
        this.other_hour = document.getElementById(other_hour);
        if(calendar_hour) this.calendar_hour = calendar_hour;
        if(this.gap_way) this.getGap();
    } else this.other_hour = null;
    
    if(language)
        this.language = language;
    else
        this.language = 'fr';

    this.hor_heures = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30','06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30','12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];

    this.hor_oe = document.getElementById(output);    //Output Element
	this.element = el;
	this.output = output;
}

// A function to show the calendar.
// When user click on the date, it will set the content of t.
Wish_Horaires.prototype.hor_sh = function() {
    // Draw the hours
    this.hor_draw_hours();

    // To change the position properly, we must show it first.
    this.hor_oe.style.display = '';
    // Move the hours container!
	this.hor_oe.style.left = this.hor_getleft(this.hor_element) + 'px';
	this.hor_oe.style.top = this.hor_gettop(this.hor_element) + this.hor_element.offsetHeight + 'px';

    //Set the scroll
    this.hor_set_scroll();

	//On gère le clickoutside pour masquer le calendrier (Le premier click correspond à celui sur l'input)
	var thisElement = this;
    $("#"+this.output).bind("clickoutside",function(e){var t = $(e.target);if(!t.is("#"+thisElement.element) && e.target.className != "hor_head" && e.target.className != "horaire") thisElement.hor_hi();});
}

// Get the left the element.
Wish_Horaires.prototype.hor_getleft = function(el) {
	var tmp = el.offsetLeft;
	el = el.offsetParent
	while(el) {
		tmp += el.offsetLeft;
		el = el.offsetParent;
	}
	return tmp;
}
Wish_Horaires.prototype.hor_gettop = function(el) {
	var tmp = el.offsetTop;
	el = el.offsetParent
	while(el) {
		tmp += el.offsetTop;
		el = el.offsetParent;
	}
	return tmp;
}

Wish_Horaires.prototype.hor_set_scroll = function() {
    var start = 0;
    for (i = 0; i < 48; i ++) {if(this.hor_heures[i] == this.hor_element.value) {start = i;break;}}
    this.hor_oe.scrollTop = start*((this.hor_oe.scrollHeight-150)/42);
}

Wish_Horaires.prototype.hor_ob_clean = function() {this.hor_ob = '';}
Wish_Horaires.prototype.hor_echo = function(t) {this.hor_ob += t;}
Wish_Horaires.prototype.hor_ob_flush = function() {
	this.hor_oe.innerHTML = this.hor_ob;
	this.hor_ob_clean();
}

// Hour template
Wish_Horaires.prototype.hor_template_main_above = function() {
    switch(this.language) {
        case 'en':close = '[Close]';break;
        default:close = '[Fermer]';break;
    }
    return '<table cellpadding="3" cellspacing="1" class="hor_tbl"><tr><td class="hor_head" style="cursor: pointer" onclick="'+this.varName+'.hor_hi();" colspan="3">'+close+'</td></tr>';
}

Wish_Horaires.prototype.hor_template_hour_cell = function(h) {return '<tr><td class="hor_cell" onclick="'+this.varName+'.hor_onclick(\'' + h + '\')">' + h + '</td></tr>';}
Wish_Horaires.prototype.hor_template_main_below = function() {return '</tr></table>';}

// This one draws calendar...
Wish_Horaires.prototype.hor_draw_hours = function() {
    // First clean the output buffer.
	this.hor_ob_clean();
	// Here we go, do the header
	this.hor_echo(this.hor_template_main_above());

	for (i = 0; i < 48; i ++) this.hor_echo (this.hor_template_hour_cell(this.hor_heures[i]));

	// Do the footer
	this.hor_echo (this.hor_template_main_below());
	// And let's display..
	this.hor_ob_flush();
}

// Hide the hours.
Wish_Horaires.prototype.hor_hi = function() {
    this.hor_oe.style.display = 'none';
	$("#"+this.output).unbind("clickoutside"); //On supprime cet évènement
}

// Format the date to output.
Wish_Horaires.prototype.ds_format_hour = function(h, m) {
	// 2 digits month.
	m2 = '00' + m;
	m2 = m2.substr(m2.length - 2);
	// 2 digits day.
	h2 = '00' + h;
	h2 = h2.substr(h2.length - 2);
	// HH:MM
	return h2 + ':' + m2;
}

// When the user clicks the hour.
Wish_Horaires.prototype.hor_onclick = function(h) {
    //On met à jour l'heure de fin
    if(this.hor_fin) {
        for (i = 0; i < 48; i ++) {
            if(this.hor_heures[i] == h) {
                if(i >= 46) this.hor_fin.value = this.hor_heures[i-46]; else this.hor_fin.value = this.hor_heures[i+2];
                break;
            }
        }
    }

    // Hide the hours
    this.hor_hi();

    if (typeof(this.hor_element.value) != 'undefined') {
        this.hor_element.value = h; // Set the value of it, if we can.
        this.hor_element.focus();
        this.hor_element.onchange();
    } else if (typeof(this.hor_element.innerHTML) != 'undefined') {
        this.hor_element.innerHTML = h; // Maybe we want to set the HTML in it.
        this.hor_element.focus();
	    this.hor_element.onchange();
    } else alert(h);// I don't know how should we display it, just alert it to user.

    if(this.other_hour) this.updateGapHour();
}

// Calcule l'écart entre 2 heures
Wish_Horaires.prototype.getGap = function() {
    if(this.other_hour) {
        var ds_sh_debut = new Date();
        var ds_sh_fin = new Date();
        if(this.gap_way) {
            ds_sh_debut.setHours(parseInt((this.hor_element.value).split(":")[0], 10));
            ds_sh_debut.setMinutes(parseInt((this.hor_element.value).split(":")[1], 10));
            ds_sh_fin.setHours(parseInt((this.other_hour.value).split(":")[0], 10));
            ds_sh_fin.setMinutes(parseInt((this.other_hour.value).split(":")[1], 10));
        } else {
            ds_sh_debut.setHours(parseInt((this.other_hour.value).split(":")[0], 10));
            ds_sh_debut.setMinutes(parseInt((this.other_hour.value).split(":")[1], 10));
            ds_sh_fin.setHours(parseInt((this.hor_element.value).split(":")[0], 10));
            ds_sh_fin.setMinutes(parseInt((this.hor_element.value).split(":")[1], 10));
        }
        if(this.calendar_hour) this.calendar_hour.getGap();
        this.gap = ds_sh_fin.getTime() - ds_sh_debut.getTime();
    }
}

// Met à jour l'écart entre 2 heures
Wish_Horaires.prototype.updateGapHour = function() {
    if(this.gap_way) {
        if(this.other_hour) {
            var ds_sh_debut = new Date();
            ds_sh_debut.setHours(parseInt((this.hor_element.value).split(":")[0], 10));
            ds_sh_debut.setMinutes(parseInt((this.hor_element.value).split(":")[1], 10));
            ds_sh_debut.setTime(ds_sh_debut.getTime() + this.gap);
            if (typeof(this.other_hour.value) != 'undefined') this.other_hour.value = this.ds_format_hour(ds_sh_debut.getHours(),ds_sh_debut.getMinutes()); // Set the value of it, if we can.
            else if (typeof(this.other_hour.innerHTML) != 'undefined') this.other_hour.innerHTML = this.ds_format_hour(ds_sh_debut.getHours(),ds_sh_debut.getMinutes()); // Maybe we want to set the HTML in it.
        }
    } else {
        this.getGap();
        if(this.gap < 0) {
            if (typeof(this.hor_element.value) != 'undefined') {
                if (typeof(this.other_hour.value) != 'undefined') this.other_hour.value = this.hor_element.value;
                else if (typeof(this.other_hour.innerHTML) != 'undefined') this.other_hour.innerHTML = this.hor_element.value;
            } else if (typeof(this.hor_element.innerHTML) != 'undefined') {
                if (typeof(this.other_hour.value) != 'undefined') this.other_hour.value = this.hor_element.innerHTML;
                else if (typeof(this.other_hour.innerHTML) != 'undefined') this.other_hour.innerHTML = this.hor_element.innerHTML;
            }
            this.gap = 0;
        }
    }
}