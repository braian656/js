
let pagina = 1;

const btnAnterior = document.getElementById('btn__anterior');
const btnSiguiente = document.getElementById('btn__siguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1; 

	cargarPeliculas()
	}
})

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1; 

	cargarPeliculas()
	}
})


const cargarPeliculas = async() =>{
	try{
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=493c091c2c7867d1753bc76957078ad0&language=es-MX&page=${pagina}`)

		console.log(respuesta)
		if(respuesta.status === 200){

			const datos = await respuesta.json();

			let peliculas = '';
			// por cada pelicula voy a acceder a peliculas, que luego se va a guardar en peliculas
			datos.results.forEach(pelicula =>{
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			})
			
			document.getElementById('container').innerHTML = peliculas;

	}else if(respuesta.status === 401){

			console.log('Peticion no valida')
	}else if(respuesta.status === 404){

			console.log('Pelicula no encontrada')
	}else{
		console.log('Algo ha fallado')
	}
		
	} catch(error){
		console.log(error)
	}

	
}

cargarPeliculas()