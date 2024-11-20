import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import CourseCard from './CourseCard';

// En tu componente CourseSlider.jsx
import './courseSlider.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

// ... el resto de tu componente


const CourseSlider = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Reemplaza 'your-api-endpoint' con la URL de tu endpoint de la API
        axios.get('http://localhost:3001/api/cursos')
            .then(response => {
				console.log("API Data:", response.data); // Esto te mostrará lo que recibes de la API
                setCourses(response.data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []); // Este efecto se ejecutará solo una vez cuando el componente se monta

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 4, // Cambia este número según cuántas tarjetas quieras que se muestren a la vez
		slidesToScroll: 4, // Cambia este número para que coincida con slidesToShow si quieres que todas las tarjetas visibles se deslicen juntas
		responsive: [
		  {
			breakpoint: 1024,
			settings: {
			  slidesToShow: 3, // Puedes ajustar estos valores para diferentes tamaños de pantalla
			  slidesToScroll: 3,
			}
		  },
		  {
			breakpoint: 768,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 2,
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			}
		  }
		]
	  };
	  


	  return (
		<Fragment>
		  <Slider {...settings}>
			{courses.map((course) => (
			  <div className="item px-md-1" key={course.id}>
				<CourseCard course={course} extraclass="mx-2" />
			  </div>
			))}
		  </Slider>
		</Fragment>
	  );
	};

export default CourseSlider;
