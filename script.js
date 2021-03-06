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
var cmtLoadedTimer= setInterval(cmtBlockHook,1000);
function cmtBlockHook(){
	if(document.readyState=="complete"){
		clearInterval(cmtLoadedTimer);
	}
	else{
		return;
	}
	if(document.getElementById("content")){
		if(document.getElementById("content").childNodes[0]){
			var heading=document.getElementById("content").childNodes[0].innerHTML;
			if(heading.indexOf("Details for Request #")!=-1){
				document.forms[0].onsubmit=bypassCommentBlock;
				window.onbeforeunload = checkComment;
			}
		}
	}
}


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp('(^|\\\\s)'+searchClass+'(\\\\s|$)');
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}


//Script portion of abort action capability. The function is called by a PHP echo, depending on user prefs.
//confirmReqCloseQuestions is a JS on-the-fly object set through messagemanagement (message 32)
function abortChecker(){
var reqCloseActions=getElementsByClass("request-done")
var abcdefg; //Dummy to check undefined... JS is wierd in this manner

for(var k in reqCloseActions){
var token=reqCloseActions[k].href;

reqCloseActions[k].href="javascript:void(0);"; //So as to avoid icky situations with Javascript event bubbling
reqCloseActions[k].token=token+""; //Store the link in a hidden attribute
reqCloseActions[k].onclick=function(evt){
if(confirmReqCloseQuestions[this.innerHTML]&&(confirmReqCloseQuestions[this.innerHTML]!="")){
	if(confirm(confirmReqCloseQuestions[this.innerHTML])){ 
		if(this.target=="_blank"){
			window.open(this.token); //Might anger popup blockers, but otherwise clicking on the create! link navigates away from the ts page, and it's rather annoying to get back. Right-clicking is better, but if you have just commented or something you get stuck again.
		}else{
			document.location=this.token;
		}

	}

}else{ document.location=this.token; }	

}
}


//Special Handling for Create! link (As it needs to open the page in a new window)
if(getElementsByClass('request-req-create')[0]!==abcdefg){
	var createlink=getElementsByClass('request-req-create')[0];
	ctxt=createlink.innerHTML;
	createlink.onclick=createLinkHref; //The onclick will be executed _before_ the href attribute is opened, giving us a chance to intercept it
	
}
}

var ctxt="";

function createLinkHref(){
	if(confirmReqCloseQuestions[ctxt]&&(confirmReqCloseQuestions[ctxt]!="")){
		if(confirm(confirmReqCloseQuestions[ctxt])){ 
			return true;	//Return true means that the link will continue its function
		}
		return false; //Return false stops the event bubble and the link won't work (Which is what we want)
	}
	return true;
}