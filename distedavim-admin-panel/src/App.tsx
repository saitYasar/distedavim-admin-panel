

import { UserList } from "./users";
import { Admin, Resource, ShowGuesser } from "react-admin";
import { PostList, PostEdit, PostCreate } from "./posts";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Dashboard } from './Dashboard';
import  customAuthProvider  from '../utils/provider/authProvider';
import { PaymentsReviewsList } from '../src/components/pages/submerchants/list';
import LoginPage from './components/pages/login';


import { dataProvider } from "../utils/provider/dataProvider";

export const App = () => (
  <Admin authProvider={customAuthProvider} dataProvider={dataProvider} dashboard={Dashboard } loginPage={LoginPage}
  >
    <Resource 
    name="users" 
    list={UserList} />
    <Resource 
    name="posts" 
    list={PostList} 
    edit={PostEdit} 
    icon={PostIcon} 
    create={PostCreate} />

    <Resource 
    name="users" 
    list={UserList} 
    show={ShowGuesser} 
    icon={UserIcon}
    recordRepresentation="name" />

    <Resource
    name="clinics"
    options={{ label: 'İşletmeler' }}
    list={PaymentsReviewsList}
    
    // edit={SubmerchantEdit}
    // create={SubmerchantCreate}
    // show={SubmerchantShow}
  />


  </Admin>

);
