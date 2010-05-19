/**************************************************************************
**********      English Wikipedia Account Request Interface      **********
***************************************************************************
** Wikipedia Account Request Graphic Design by Charles Melbye,           **
** which is licensed under a Creative Commons                            **
** Attribution-Noncommercial-Share Alike 3.0 United States License.      **
**                                                                       **
** All other code are released under the Public Domain                   **
** by the ACC Development Team.                                          **
**                                                                       **
** See CREDITS for the list of developers.                               **
***************************************************************************/

function showhide(listid) {
	list = document.getElementById(listid);
	link = document.getElementById(listid + "-link");
	
	if(list.style.display == "none") {
		list.style.display = "block";
		link.innerHTML = "[hide]";
	} else {
		list.style.display = "none";
		link.innerHTML = "[show]";
	}
	
}

/*
 * Comment submission check by Manish
 */
var isCommenting=false;  //flag to see if the 'leave pg' action was a commenting action or not

function bypassCommentBlock(){
	isCommenting=true; // set flag true if leave pg was a commenting action
}

function checkComment(){
	if(isCommenting){
		return; //If commenting, bypass the dialog
	}
  	if(document.forms[0].elements[1].value==""){
		return; //If nothing in comment box, bypass dialog
  	}else{
		return "There is an unsubmitted comment, do you still want to leave?";
		//If there's something in the box, give a dialog
	}
}

//Implement only on zoom pages:
if(document.getElementById("content")){
	if(document.getElementById("content").childNodes[0]){
		var heading=document.getElementById("content").childNodes[0].innerHTML;
		if(heading.indexOf("Details for Request #")!=-1){
			document.forms[0].onsubmit=bypassCommentBlock;
			window.onbeforeunload = checkComment;
		}
	}
}