import 'styles/global.less';

import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import routeIndex from './routes/index-route';
import alt from 'libs/alt';
import storage from 'libs/storage';
import persist from 'libs/persist';

persist(alt, storage, 'app');

//This is a good place to add auth interceptor's - ie. using the library axios for ajax calls:
/*
axios.interceptors.request.use(function (config) {
    if(AuthStore.getState().isAuth){
        config.headers = {'Authorization': `Bearer ${AuthStore.getState().jwt}`}
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    //handle unauthorized...
    console.log('response interceptor error', error);
    if(error.status === 401){
        return AuthActions.logout(); //this will clear out any client side token and redirect to login...
    }
    if(error.status === 403) {
        return browserHistory.push('/');
    }
    if(error.status === 409 && error.message === "Already authenticated"){
        return browserHistory.push('/');
    }
    return Promise.reject(error);
});
*/

ReactDOM.render((
	<Router history={browserHistory} routes={routeIndex} />
), document.getElementById('app'));

//Render the app: - note, we use the webpack plugin 'HtmlwebpackPlugin' (see config) to add our 'index.html' page:
/* new HtmlwebpackPlugin({
            template: 'node_modules/html-webpack-template/index.html',
            title: 'Code Challenge',
            appMountId: 'app'
        }),
* */
