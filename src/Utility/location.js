const Google_Api_Key ='AIzaSyALCrixIaGCGZ-fm2AiEhfHPgZoGZaOLpQ'
export async function getCoordsFromAddress(address)
{
    const urlAddress = encodeURL(address);
fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${Google_Api_Key}`)

}