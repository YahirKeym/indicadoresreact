/**
 * La función BrouserName nos indicara el nombre del 
 * navegador que estamos usando en el momento. Bien,
 * esto se hizo para detectar Internet Explroer
 */
function BrouserName(){
    let UserAgent= navigator.userAgent, tem, 
    M= UserAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(UserAgent) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= UserAgent.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= UserAgent.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
};
export default BrouserName;