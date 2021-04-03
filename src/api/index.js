
// https://thronesdb.com/ 
const cardUrl = 'https://thronesdb.com/api/public/card/';

const getCardData = async function(id) {
    let setId = id.split('_')[0]
    let cardId = id.split('_')[1]
    // let cardId = id;
    if(parseInt(cardId) < 10){
        cardId = '00'+cardId
    }else if(parseInt(cardId) < 100) cardId = '0'+cardId
    console.log(setId,cardId)
    let url  =cardUrl+setId+cardId;
    const response = await fetch(url);
    const jsonResponse= await response.json();
    if(response.ok) return jsonResponse;
}

const API = {getCardData}
export default API;