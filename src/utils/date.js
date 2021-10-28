export function generateId(){
    let now = new Date();
    let y = now.getFullYear();
    let m = now.getMonth()+1;
    let d = now.getDate();
    let h = now.getHours();
    let  mi = now.getMinutes();
    let s = now.getSeconds();

    return `${y}${m}${d}${h}${mi}${s}`;
}

export function currTime(){
    let now = new Date();
    let y = now.getFullYear();
    let m = now.getMonth()+1;
    if(m<10) m = '0'+m;
    let d = now.getDate();
    if(d<10) d = '0'+d;
    let h = now.getHours();
    if(h<10) h = '0'+h;
    let  mi = now.getMinutes();
    if(mi<10) mi = '0'+mi;
    let s = now.getSeconds();
    if(s<10) s = '0'+s;

    return `${y}-${m}-${d} ${h}:${mi}:${s}`;
}