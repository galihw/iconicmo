var bprev = document.getElementById('prev');
var bnext = document.getElementById('next');

bprev.addEventListener('click', Klik);
bnext.addEventListener('click', Klik);
function Klik(e){
	if(e.currentTarget==bprev){
		noaktif--;
		noaktif = Math.max(0,noaktif);
		dfix = noaktif*dno;
	}else{
		noaktif++;
		noaktif = Math.min(1,noaktif);
		dfix = noaktif*dno;
	}
	for(var i=0;i<ar.length;i++){
		arfix[i] = ar[i]+dfix;
		linkfix[i] = 'images/kaos'+arfix[i]+'.jpg';
		document.getElementById('img'+i).src = linkfix[i];
	}
}