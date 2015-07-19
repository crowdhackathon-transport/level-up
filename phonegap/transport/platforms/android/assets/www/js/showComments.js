

function showComments(form) {

	var comments=document.getElementById('comments');
	comments.style.display = 'block';
	comments.innerHTML=form.firstName.value;
	}