/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 *  Copyright (c) 2013, OHMS Development Team
 */


var OHMS = (function(OHMS) {
	
    var LongAnswerItem = function (question,item) {
	OHMS.Item.apply(this,arguments);
	this.textarea = this.element.find("textarea");
	this.preview = this.element.find(".response");
	this.id = this.textarea.attr("id");

	var that = this;
	tinymce.init({
	    selector: "textarea#" + this.id,
	    theme: "modern",
	    forced_root_block: false,
	    plugins: [
		"advlist autolink lists link image charmap hr anchor",
		"visualblocks code",
		"media nonbreaking save table contextmenu",
		"paste textcolor colorpicker textpattern"
	    ],
	    paste_as_text: true,
	    file_picker_callback: function(callback, value, meta) {
		if (meta.filetype == 'file' || meta.filetype == 'image') {
		    $("form#" + that.id + " input").click();
		    $(".mce-btn.mce-open").parent().find(".mce-textbox").val("upload in progress...");
		} else 
		    alert("File upload not supported for this type.");
	    },
	    menubar: false,
	    toolbar1: "undo redo | alignleft aligncenter alignright | bullist numlist | link image media",
	    toolbar2: "bold italic underline | charmap superscript subscript | fontsizeselect forecolor | table",
	    statusbar: false,
	    image_advtab: true,
	    setup: function(editor) {
		editor.on('init', function() {
		    that.editor = tinymce.get(that.id);
		    that.lock();
		    this.getDoc().body.style.fontSize = '14px';
		 })
		 editor.on('change keyup input', function() {
		     that.preview.html(that.editor.getContent());
		     MathJax.Hub.Queue(["Typeset", MathJax.Hub, that.preview.get(0)]);
		 })
	    }
	});
    }
    
    LongAnswerItem.prototype = new OHMS.Item();
        
    LongAnswerItem.prototype.get_value = function () {
	return this.editor.getContent();
    }

    LongAnswerItem.prototype.set_value = function (value) {
	if (value !== null) {
	    this.editor.setContent(value);
	    this.preview.html(value);
	    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.preview.get(0)]);
	}
    }

    LongAnswerItem.prototype.unlock = function () {
	this.editor.getBody().setAttribute("contenteditable", true);
    }

    LongAnswerItem.prototype.lock = function () {
	this.editor.getBody().setAttribute("contenteditable", false);
    }


    LongAnswerItem.prototype.set_solution = function (solution) {
	this.element.after("<div class='alert alert-success'>" + solution + "</div>");
	MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.element.next().get(0)]);
    }
    
    OHMS.LongAnswerItem = LongAnswerItem;
    
    return OHMS;
    
}(OHMS));
