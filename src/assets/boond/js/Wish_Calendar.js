// JavaScript pour la gestion du calendrier
Wish_Calendar = function(varName, el, output, container, language, gap_way, other_date, calendar_date) {
    this.varName = varName;        //Buffer
    this.ds_ob = '';        //Buffer
    this.ds_element = document.getElementById(el);   //Calendar Element
    if(gap_way!=undefined) {
        this.gap_way = gap_way;
        this.other_date = document.getElementById(other_date);
        if(calendar_date) this.calendar_date = calendar_date;
        if(this.gap_way) this.getGap();
    }

    this.ds_i_date = new Date();
    this.ds_c_month = this.ds_i_date.getMonth() + 1;
    this.ds_c_year = this.ds_i_date.getFullYear();

    if(language)
        this.language = language;
    else
        this.language = 'fr';

    switch(this.language) {
        case 'en':
            this.ds_monthnames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            this.ds_daynames = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];
            break;
        default:
            this.ds_monthnames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            this.ds_daynames = ['Lun', 'Mar', 'Me', 'Jeu', 'Ven', 'Sam', 'Dim'];
            break;
    }

    this.ds_oe = document.getElementById(output);    //Output Element
    this.ds_ce = document.getElementById(container); //Container
	this.element = el;
	this.container = container;
}

// A function to show the calendar.
// When user click on the date, it will set the content of t.
Wish_Calendar.prototype.ds_sh = function(nomove, year) {
	if(nomove===undefined) nomove = false;
	// Make a new date, and set the current month and year.
        var inputDate 	= this.ds_element.value;
        var verif = RegExp("^[0-9]{1,2}\/[0-9]{1,2}\/([0-9]{4})$");
        if(verif.exec(inputDate) == null)
            var ds_sh_date = new Date();
        else {
            inputDate = inputDate.split('/');
            var ds_sh_date = new Date(parseInt(inputDate[2],10),parseInt(inputDate[1],10)-1,parseInt(inputDate[0],10));
        }

	this.ds_c_month = ds_sh_date.getMonth() + 1;
	this.ds_c_year = ds_sh_date.getFullYear();
	if(verif.exec(inputDate) == null && year !== undefined) this.ds_c_year = year;


	// Draw the calendar
	this.ds_draw_calendar(this.ds_c_month, this.ds_c_year);

	// To change the position properly, we must show it first.
	this.ds_ce.style.display = '';
	// Move the calendar container!
	if(!nomove) {
		this.ds_ce.style.left = this.ds_getleft(this.ds_element) + 'px';
		this.ds_ce.style.top = this.ds_gettop(this.ds_element) + this.ds_element.offsetHeight + 'px';
	}

	//On gère le clickoutside pour masquer le calendrier (Le premier click correspond à celui sur l'input)
	var thisElement = this;
	$("#"+this.container).bind("clickoutside",function(e){var t = $(e.target);if(!t.is("#"+thisElement.element) && e.target.className != "ds_head" && e.target.className != "calendrier") thisElement.ds_hi();});

}

// Get the left and the top of the element.
Wish_Calendar.prototype.ds_getleft = function(el) {
	var tmp = el.offsetLeft;
	el = el.offsetParent
	while(el) {
		tmp += el.offsetLeft;
		el = el.offsetParent;
	}
	return tmp;
}
Wish_Calendar.prototype.ds_gettop = function(el) {
	var tmp = el.offsetTop;
	el = el.offsetParent
	while(el) {
		tmp += el.offsetTop;
		el = el.offsetParent;
	}
	return tmp;
}

Wish_Calendar.prototype.ds_ob_clean = function() {
	this.ds_ob = '';
}
Wish_Calendar.prototype.ds_ob_flush = function() {
	this.ds_oe.innerHTML = this.ds_ob;
	this.ds_ob_clean();
}
Wish_Calendar.prototype.ds_echo = function(t) {
	this.ds_ob += t;
}

// Calendar template
Wish_Calendar.prototype.ds_template_main_above = function(t) {
    var close = '[Fermer]';

    switch(this.language) {
        case 'en':
            close = '[Close]';
            break;
    }

	return '<table cellpadding="3" cellspacing="1" class="ds_tbl">'
	     + '<tr>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="'+this.varName+'.ds_py();">&lt;&lt;</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="'+this.varName+'.ds_pm();">&lt;</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="'+this.varName+'.ds_hi();" colspan="3">'+close+'</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="'+this.varName+'.ds_nm();">&gt;</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="'+this.varName+'.ds_ny();">&gt;&gt;</td>'
		 + '</tr>'
	     + '<tr>'
		 + '<td colspan="7" class="ds_head">' + t + '</td>'
		 + '</tr>'
		 + '<tr>';
}

Wish_Calendar.prototype.ds_template_day_row = function(t) {
	return '<td class="ds_subhead">' + t + '</td>';
	// Define width in CSS, XHTML 1.0 Strict doesn't have width property for it.
}

Wish_Calendar.prototype.ds_template_new_week = function() {
	return '</tr><tr>';
}

Wish_Calendar.prototype.ds_template_blank_cell = function(colspan) {
	return '<td colspan="' + colspan + '"></td>'
}

Wish_Calendar.prototype.ds_template_day = function(d, m, y) {
	return '<td class="ds_cell" onclick="'+this.varName+'.ds_onclick(' + d + ',' + m + ',' + y + ')">' + d + '</td>';
	// Define width the day row.
}

Wish_Calendar.prototype.ds_template_main_below = function() {
	return '</tr>'
	     + '</table>';
}

// This one draws calendar...
Wish_Calendar.prototype.ds_draw_calendar = function(m, y) {
    // First clean the output buffer.
	this.ds_ob_clean();
	// Here we go, do the header
	this.ds_echo (this.ds_template_main_above(this.ds_monthnames[m - 1] + ' ' + y));
	for (i = 0; i < 7; i ++) {
		this.ds_echo (this.ds_template_day_row(this.ds_daynames[i]));
	}
	// Make a date object.
	var ds_dc_date = new Date(y, m-1, 1);
	if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
		days = 31;
	} else if (m == 4 || m == 6 || m == 9 || m == 11) {
		days = 30;
	} else {
		days = (y % 4 == 0) ? 29 : 28;
	}

	var first_day = ds_dc_date.getDay();
	var first_loop = 1;
	// Start the first week
	this.ds_echo (this.ds_template_new_week());
	// If monday is not the first day of the month, make a blank cell...
	if(first_day != 1) {
            if(first_day == 0)
                this.ds_echo (this.ds_template_blank_cell(6));
            else
                this.ds_echo (this.ds_template_blank_cell(first_day-1));
        }
	var j = first_day;
	for (i = 0; i < days; i ++) {
		// Today is monday, make a new week.
		// If this monday is the first day of the month,
		// we've made a new row for you already.
		if (j == 1 && !first_loop) {
			// New week!!
			this.ds_echo (this.ds_template_new_week());
		}
		// Make a row of that day!
		this.ds_echo (this.ds_template_day(i + 1, m, y));
		// This is not first loop anymore...
		first_loop = 0;
		// What is the next day?
		j ++;
		j %= 7;

	}
	// Do the footer
	this.ds_echo (this.ds_template_main_below());
	// And let's display..
	this.ds_ob_flush();
}

// Hide the calendar.
Wish_Calendar.prototype.ds_hi = function() {
	this.ds_ce.style.display = 'none';
	$("#"+this.container).unbind("clickoutside"); //On supprime cet évènement
}

// Moves to the next month...
Wish_Calendar.prototype.ds_nm = function() {
	// Increase the current month.
	this.ds_c_month ++;
	// We have passed December, let's go to the next year.
	// Increase the current year, and set the current month to January.
	if (this.ds_c_month > 12) {
		this.ds_c_month = 1;
		this.ds_c_year++;
	}
	// Redraw the calendar.
	this.ds_draw_calendar(this.ds_c_month, this.ds_c_year);
}

// Moves to the previous month...
Wish_Calendar.prototype.ds_pm = function() {
	this.ds_c_month = this.ds_c_month - 1; // Can't use dash-dash here, it will make the page invalid.
	// We have passed January, let's go back to the previous year.
	// Decrease the current year, and set the current month to December.
	if (this.ds_c_month < 1) {
		this.ds_c_month = 12;
		this.ds_c_year = this.ds_c_year - 1; // Can't use dash-dash here, it will make the page invalid.
	}
	// Redraw the calendar.
	this.ds_draw_calendar(this.ds_c_month, this.ds_c_year);
}

// Moves to the next year...
Wish_Calendar.prototype.ds_ny = function() {
	// Increase the current year.
	this.ds_c_year++;
	// Redraw the calendar.
	this.ds_draw_calendar(this.ds_c_month, this.ds_c_year);
}

// Moves to the previous year...
Wish_Calendar.prototype.ds_py = function() {
	// Decrease the current year.
	this.ds_c_year = this.ds_c_year - 1; // Can't use dash-dash here, it will make the page invalid.
	// Redraw the calendar.
	this.ds_draw_calendar(this.ds_c_month, this.ds_c_year);
}

// Format the date to output.
Wish_Calendar.prototype.ds_format_date = function(d, m, y) {
	// 2 digits month.
	m2 = '00' + m;
	m2 = m2.substr(m2.length - 2);
	// 2 digits day.
	d2 = '00' + d;
	d2 = d2.substr(d2.length - 2);
	// YYYY-MM-DD
//	return y + '-' + m2 + '-' + d2;
	return d2 + '/' + m2 + '/' + y;
}

// When the user clicks the day.
Wish_Calendar.prototype.ds_onclick = function(d, m, y) {
	// Hide the calendar.
	this.ds_hi();

	// Set the value of it, if we can.
	if (typeof(this.ds_element.value) != 'undefined') {
            this.ds_element.value = this.ds_format_date(d, m, y);
            this.ds_element.focus();
        	$(this.ds_element).trigger('change');
	// Maybe we want to set the HTML in it.
	} else if (typeof(this.ds_element.innerHTML) != 'undefined') {
            this.ds_element.innerHTML = this.ds_format_date(d, m, y);
            this.ds_element.focus();
        	$(this.ds_element).trigger('change');
	// I don't know how should we display it, just alert it to user.
	} else {
		alert (this.ds_format_date(d, m, y));
	}

        if(this.other_date) this.updateGapDate();
}

// Calcule l'écart entre 2 dates
Wish_Calendar.prototype.getGap = function() {
    if(this.other_date) {
        if(this.gap_way) {
            debutDate = (this.ds_element.value).split('/');
            finDate = (this.other_date.value).split('/');
        } else {
            debutDate = (this.other_date.value).split('/');
            finDate = (this.ds_element.value).split('/');
        }
        var ds_sh_debut = new Date(parseInt(debutDate[2],10),parseInt(debutDate[1],10)-1,parseInt(debutDate[0],10));
        var ds_sh_fin = new Date(parseInt(finDate[2],10),parseInt(finDate[1],10)-1,parseInt(finDate[0],10));
        if(this.calendar_date) this.calendar_date.getGap();
        this.gap = ds_sh_fin.getTime() - ds_sh_debut.getTime();
    }
}

// Met à jour l'écart entre 2 dates
Wish_Calendar.prototype.updateGapDate = function() {
    if(this.gap_way) {
        if(this.other_date) {
            var debutDate = (this.ds_element.value).split('/');
            var ds_sh_debut = new Date(parseInt(debutDate[2],10),parseInt(debutDate[1],10)-1,parseInt(debutDate[0],10));
            ds_sh_debut.setTime(ds_sh_debut.getTime() + this.gap);
            if (typeof(this.other_date.value) != 'undefined')
                this.other_date.value = this.ds_format_date(ds_sh_debut.getDate(), ds_sh_debut.getMonth()+1, ds_sh_debut.getFullYear());
            else if (typeof(this.other_date.innerHTML) != 'undefined')
                this.other_date.innerHTML = this.ds_format_date(ds_sh_debut.getDate(), ds_sh_debut.getMonth()+1, ds_sh_debut.getFullYear());
        }
    } else {
        this.getGap();
        if(this.gap < 0) {
            if (typeof(this.ds_element.value) != 'undefined') {
                if (typeof(this.other_date.value) != 'undefined') this.other_date.value = this.ds_element.value;
                else if (typeof(this.other_date.innerHTML) != 'undefined') this.other_date.innerHTML = this.ds_element.value;
            } else if (typeof(this.ds_element.innerHTML) != 'undefined') {
                if (typeof(this.other_date.value) != 'undefined') this.other_date.value = this.ds_element.innerHTML;
                else if (typeof(this.other_date.innerHTML) != 'undefined') this.other_date.innerHTML = this.ds_element.innerHTML;
            }
            this.gap = 0;
        }
    }
}
