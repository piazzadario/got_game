
// https://thronesdb.com/ 
const cardUrl = 'https://thronesdb.com/api/public/card/01';
const TYPES = {
    'Character': 'character',
    'Location': 'location',
    'Attachment': 'attachment'
}


const getCardData = async function(id) {
    let cardId = id;
    if(id < 10){
        cardId = '00'+id
    }else if(id < 100) cardId = '0'+id
    let url  =cardUrl+cardId;
    const response = await fetch(url);
    const jsonResponse= await response.json();
    if(response.ok) return jsonResponse;
}

const API = {getCardData}
export default API;