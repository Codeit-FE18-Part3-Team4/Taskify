import mockData from '../mock/dashboard.json';

export async function getDashboards() { 
  // axios
  return Promise.resolve(mockData);
}