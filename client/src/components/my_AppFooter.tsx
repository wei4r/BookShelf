import '../assets/css/my_AppFooter.css'
import '../assets/css/my_global.css'
import {Link} from "react-router-dom";
import { socialMedia } from '../my_types';


function AppFooter(){
return(
	<footer className="footer">
		<div className="left-content">
		  <p>Copyright</p>
		  <p>Contact</p>
		  <p>Directions</p>
		</div>
		<div className="right-content">
			{socialMedia.map((item) =>    
				<Link key={item.name} to ={item.url} className='social-media'><img src={item.img} alt={item.name}/></Link>)}
		
		</div>
	</footer>
)
}
export default AppFooter;