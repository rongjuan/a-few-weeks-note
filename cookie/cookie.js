var document = {
    cookies:[],
    get cookie(){
        return document.cookies.join(';')
    },
    set cookie(cookie){
        for(var i=0;i<document.cookies.length;i++){
            var item = document.cookies[i];
            if(cookie.split('=')[0]==item.split('=')[0]){
                document.cookies[i]=cookie;
                return;
            }
        }
        document.cookies.push(cookie);
    }
};
document.cookie = 'name=zf';
document.cookie = 'age=8';
document.cookie = 'name=zf2';
console.log(document.cookie);




