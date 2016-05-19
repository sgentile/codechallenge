/**
 * Created by stevegentile on 5/18/16.
 */

//AltContainer store state - provides caching, usage could include storing the user JWT auth token...
//see the persist.js in libs...


import makeFinalStore from 'alt-utils/lib/makeFinalStore';
import EmployeeStore from 'stores/EmployeeStore';

export default function(alt, storage, storeName) {
  const finalStore = makeFinalStore(alt);

  try {
    alt.bootstrap(storage.get(storeName));
  }
  catch(e) {
    console.error('Failed to bootstrap data', e);
  }

  finalStore.listen(() => {
    //if(!storage.get('debug')) {
      storage.set(storeName, alt.takeSnapshot(EmployeeStore)); //partial, we don't want to store everything
    //}
  });
}
