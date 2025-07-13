import React from 'react';
import '../App.css';
import {UncontrolledDropdown,DropdownToggle,DropdownItem,DropdownMenu, Spinner} from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";

function Logout()
{
    const { logout } = useAuth0();
    const {user,isAuthenticated,isLoading} = useAuth0();

    if(isLoading)
    {
      return(
        <div>
          <Spinner>
              Loading...
          </Spinner>
        </div>
      );
    }

  if(isAuthenticated)
  {
  return (
    <div>
        <UncontrolledDropdown>
            <DropdownToggle caret className='logt' >
                <img src={user.picture} alt="" width="50vw" style={{paddingRight:"1vw"}} />
                {user.name}
            </DropdownToggle>
          <DropdownMenu> 
            <DropdownItem className='logg' onClick={() => logout({ returnTo: window.location.href})}>Log Out</DropdownItem>
        </DropdownMenu>
        </UncontrolledDropdown>
    </div>
  );
}
}
export default Logout;