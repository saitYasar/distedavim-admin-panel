

import { UserList,UserListShow,UserEdit, UserCreate } from "./pages/users";
import { Admin, Resource, ShowGuesser } from "react-admin";
import { PostList, PostEdit, PostCreate } from "./posts";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Dashboard } from './Dashboard';
import { ClinicsList } from './pages/clinics/index';
import { DentistsList} from './pages/dentists/index'
import { BlogsList } from './pages/blogs/index'
import { TreatmentsList } from './pages/treatments/index'



// import  customAuthProvider  from '../utils/provider/authProvider';

// import LoginPage from './components/pages/login';


import { dataProvider } from "../utils/provider/dataProvider";

export const App = () => (
  <Admin 
  // authProvider={customAuthProvider} 
  dataProvider={dataProvider} dashboard={Dashboard } 		
  	// loginPage={LoginPage}
  >
  
  <Resource 
    name="posts" 
    list={PostList} 
    edit={PostEdit} 
    icon={PostIcon} 
    show={ShowGuesser} 
    create={PostCreate} />

    <Resource 
    name="users" 
    list={UserList} 
    show={UserListShow}
    edit={UserEdit} 
    icon={UserIcon}
    create={UserCreate}
    recordRepresentation="name"
     />

    <Resource
    name="clinics"
    options={{ label: 'Klinikler' }}
    list={ClinicsList}
    show={ShowGuesser}
    

    
    // edit={SubmerchantEdit}
    // create={SubmerchantCreate}
    // show={SubmerchantShow}
  />
      <Resource
    name="dentists"
    options={{ label: 'Diş Hekimleri' }}
    list={DentistsList}
    show={ShowGuesser} 

  />
  <Resource
    name="treatments"
    options={{ label: 'Tedaviler' }}
    list={TreatmentsList}
    show={ShowGuesser} 

  />
  <Resource
    name="blogs"
    options={{ label: 'Bloglar' }}
    list={BlogsList}
    show={ShowGuesser} 

  />


  </Admin>

);
