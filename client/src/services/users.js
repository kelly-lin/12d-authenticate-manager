const accessLevels = {
  admin: { code: 0, text: 'Admin'},
  restricted: { code: 1, text: 'Restricted' },
  denied: { code: 2, text: 'Denied' }
}

function UserAccessLevelOptions() {
  return (
    <>
    <option>{accessLevels.admin.text}</option>
    <option>{accessLevels.restricted.text}</option>
    <option>{accessLevels.denied.text}</option>
    </>
  )
}

const getUserAccessLevel = user => {
  if(user.accessLevel === accessLevels.admin.code)
    return accessLevels.admin.text;
  
  if(user.accessLevel === accessLevels.restricted.code)
    return accessLevels.restricted.text;
  
  if(user.accessLevel === accessLevels.denied.code)
    return accessLevels.denied.text;

  return "Error! Code undefined";
}

const getUserStatus = user => {
  if(user.accessLevel === accessLevels.admin.code)
    return accessLevels.admin.text;
  
  if(user.accessLevel === accessLevels.restricted.code)
    return accessLevels.restricted.text;
  
  if(user.accessLevel === accessLevels.denied.code)
    return accessLevels.denied.text;

  return "Error! Code undefined";
}

export { 
  getUserAccessLevel as default, 
  getUserStatus, 
  accessLevels,
  UserAccessLevelOptions
};