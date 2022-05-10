class Matrix{
	constructor(matrix,rows,cols) {
		this.matrix = matrix;
		this.rows = rows;
		this.cols = cols;
	}

	static create_void_matrix(rows,cols){
		let m = new Array(rows);
		for (let i = 0 ; i < rows ; i++){
			m[i] = new Array(cols);
		}
		return new Matrix(m,rows,cols);
	}

	static initialise_matrix(m){
		for (let i = 0; i < m.rows; i++){
			for (let j = 0; j < m.cols; j++) {
				m.matrix[i][j] = 0;
			}
		}
		return m;
	}

	static create_matrix_tab(tab,rows,cols){
		let x = 0;
		let m = this.create_void_matrix(rows,cols);
		for (let i = 0; i < rows; i++){
			for (let j = 0; j < cols; j++) {
				m.matrix[i][j] = tab[x];
				x++;
			}
		}
		return m;
	}

	static sum(m1,m2){
		if (m1.cols === m2.cols && m1.rows === m2.rows) {
			let m = this.create_void_matrix(m1.rows, m1.cols);
			for (let i = 0; i < m.rows; i++) {
				for (let j = 0; j < m.cols; j++) {
					m.matrix[i][j] = m1.matrix[i][j] - (-m2.matrix[i][j]);
				}
			}
			return m;
		}
		else alert("il faut que les matrice soit de même taille");
	}

	static multiplicate(m1,m2){
		if (m1.cols === m2.rows) {
			let m = this.create_void_matrix(m1.rows, m2.cols);
			m = this.initialise_matrix(m);
			for (let i = 0; i < m.rows; i++) {
				for (let j = 0; j < m.cols; j++) {
					for (let r = 0; r < m1.cols; r++) {
						m.matrix[i][j] = m.matrix[i][j] - (-m1.matrix[i][r] * m2.matrix[r][j]);
					}
				}
			}
			return m;
		}
		else alert("il faut que le nombre de colonne de la 1er matrice soit égale au nombre de ligne de la seconde");
	}

	static transpose(m1){
		let m = Matrix.create_void_matrix(m1.cols, m1.rows);
		for(let i = 0 ; i < m1.rows ; i++)
		{
			for(let j = 0 ; j < m1.cols ; j++)
		{
			m.matrix[j][i] = m1.matrix[i][j];
		}
		}
	return m;
	}



	static print_mat(m,p){
		p.innerHTML = "";
		for (let i = 0 ; i < m.rows ; i++){
			let l = p.appendChild(document.createElement("div"));
			l.classList.add("lign");
			let ligne = document.getElementsByClassName("lign");
			for (let j = 0 ; j < m.cols ; j++){
				let x = ligne[i].appendChild(document.createElement("div"));
				x.classList.add("pos"+i);
				x.classList.add("pos");
				let pos = document.getElementsByClassName("pos"+i);
				pos[j].innerHTML = (m.matrix[i][j]);
			}
			p.appendChild(document.createElement("br"));
		}
	}

	static init_mat_print(m,r,c,nb_mat){
		m.innerHTML = "";
		for (let i = 0 ; i < r ; i++){
			let l = m.appendChild(document.createElement("div"));
			l.classList.add("lignem"+nb_mat);
			l.classList.add("ligne");
			let ligne = document.getElementsByClassName("lignem"+nb_mat);
			for (let j = 0 ; j < c ; j++){
				let x = ligne[i].appendChild(document.createElement("input"));
				x.classList.add("mat"+nb_mat);
				x.setAttribute("type","number");
			}
		}
	}
}

function create_tab(x){
	let tab = [];
	for (let i = 0 ; i < x.length ; i++){
		tab.push(x[i].value);
	}
	return tab;
}

function getM1() {
	let r1 = document.getElementById('lm1').value;
	let c1 = document.getElementById('cm1').value;
	if(r1 > 0 && c1 > 0){
		const m1 = create_tab(document.getElementsByClassName('mat1'));
		return Matrix.create_matrix_tab(m1,r1,c1);
	}
	const m1 = create_tab(document.getElementsByClassName('mat1'));
	return Matrix.create_matrix_tab(m1,3,3);

}

function getM2() {
	let r2 = document.getElementById('lm2').value;
	let c2 = document.getElementById('cm2').value;
	if(r2 > 0 && c2 > 0){
		const m2 = create_tab(document.getElementsByClassName('mat2'));
		return Matrix.create_matrix_tab(m2,r2,c2);
	}
	const m2 = create_tab(document.getElementsByClassName('mat2'));
	return Matrix.create_matrix_tab(m2,3,3);
}

function somme(){
	let m1 = getM1();
	let m2 = getM2();
	let m = Matrix.sum(m1,m2);
	const p = document.getElementById('para');
	Matrix.print_mat(m,p);
}

function produit(){
	let m1 = getM1();
	let m2 = getM2();
	let m = Matrix.multiplicate(m1,m2);
	const p = document.getElementById('para');
	Matrix.print_mat(m,p);
}

function transposer(){
	let m1 = getM1();
	let m = Matrix.transpose(m1);
	const p = document.getElementById('para');
	Matrix.print_mat(m,p);
}

function affichage(){
	let r1 = document.getElementById('lm1').value;
	let c1 = document.getElementById('cm1').value;
	let r2 = document.getElementById('lm2').value;
	let c2 = document.getElementById('cm2').value;
	let m = document.getElementsByClassName('m');
	if (r1 > 0 && c1 > 0){
		Matrix.init_mat_print(m[0],r1,c1,1);
	}
	else ;
	if (r2 > 0 && c2 > 0){
		Matrix.init_mat_print(m[1],r2,c2,2);
	}
	else ;
}