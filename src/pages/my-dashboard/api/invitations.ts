import mockData from '../mock/invitations.json';

export async function getInvitations() { 
  // axios
  return Promise.resolve(mockData);
}