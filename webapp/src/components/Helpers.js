export function getIntersection(set1, set2) {  
    const ans = new Set();  
    for (let i of set2) {  
        if (set1.has(i)) {  
            ans.add(i);  
        }  
    }  
    return ans;  
} 
 
 
//get the number of days difference between the two dates format YYYY-MM-DD 
export function dayDifference(date1,date2) { 
  let date1Spl = date1.split('-'); 
  let date2Spl = date2.split('-'); 
  let d1 = new Date(`${date1Spl[1]}/${date1Spl[2]}/${date1Spl[0]}`); 
  let d2 = new Date(`${date2Spl[1]}/${date2Spl[2]}/${date2Spl[0]}`); 
  let tdiff = Math.abs(d2.getTime() - d1.getTime()); 
  return Math.round(tdiff / (1000 * 3600 * 24)); 
 
} 
//get today's date in format YYYY-MM-DD 
export function getDate(){ 
  const dateObj = new Date(); 
  const year = dateObj. getFullYear(); 
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
  const day = String(dateObj.getDate()).padStart(2,'0'); 
  const date = `${year}-${month}-${day}`; 
  return date;  
} 
 
//get current year and month 
export function getYearMonth(){ 
  const dateObj = new Date(); 
  const year = dateObj.getFullYear(); 
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
  const dateStr = `${year}-${month}`; 
  return dateStr;  
} 
 
export function toTitleCase(str) { 
    return str.replace(/\w\S*/g, function(txt){ 
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); 
    }); 
} 
 
//convert all items in an object to lowercase to make it easier to search 
export const lowerAll = (obj,exceptions=["description","id","posterId","hunterId","createDate","amount","paymentData"]) => { 
 
  let result = {}; 
  let keys = Object.keys(obj); 
  for(let i = 0; i<keys.length; i++) { 
    let key = keys[i]; 
    try{ 
       if(exceptions.indexOf(key) < 0) 
          result[key] = obj[key].toLowerCase() 
       else 
          result[key] = obj[key]; 
    } catch(e){ 
       result[key]=obj[key]; 
    } 
  }  
  return result; 
} 
 
//return a selector with different organization types, onChange must take 2 arguments, the field name and the value 
export const industryTypes = (value,onChange) => { 
      return <select value={value ?? ""} style={{marginBottom:'0px'}} onChange={e=>{onChange('industryType',e.target.value);}}>  
             <option value="" disabled hidden> <span style={{color:'#ccc'}}> Industry Type </span> </option> 
             <option value="na"> N/A </option> 
             <option value="any"> Any </option> 
             <option value="aerodef"> Aerospace & Defense </option> 
             <option value="consulting"> Consulting </option> 
             <option value="education"> Education </option> 
             <option value="electrical"> Electrical Equipment </option> 
             <option value="energy"> Energy & Utilities </option> 
             <option value="farming"> Farming </option> 
             <option value="financial"> Financial </option> 
             <option value="food"> Food & Restaurants </option> 
             <option value="healthcare"> Healthcare </option> 
             <option value="law"> Law </option> 
             <option value="manufacturing"> Manufacturing </option> 
             <option value="materials"> Basic Materials </option> 
             <option value="re"> Real Estate </option> 
             <option value="retail"> Retail </option> 
             <option value="security"> Security </option> 
             <option value="shipping"> Shipping </option> 
             <option value="tech"> Tech Company </option> 
             <option value="waste"> Waste Management </option> 
           </select> 
} 
 
//return a selector with different organization types, onChange must take 2 arguments, the field name and the value 
export const orgTypes = (value,onChange) => { 
      return <select value={value ?? ""} style={{marginBottom:'0px'}} onChange={e=>{onChange('organizationType',e.target.value);}}>  
             <option value="" disabled hidden> Org Type </option> 
             <option value="enterprise"> Large Enterprise Business </option> 
             <option value="smb"> Small to Medium Business </option> 
             <option value="startup"> Startup </option> 
             <option value="federal"> Federal Govt </option> 
             <option value="sled"> State and Local Govt </option> 
             <option value="ngo"> NGO </option> 
             <option value="utility"> Utility </option> 
           </select> 
} 
 
export const states = (value,onChange) => { 

return <select value={value?.toUpperCase() ?? ""} style={{marginBottom:'0px'}} onChange={e=>{onChange('state',e.target.value);}}>
   <option value="" disabled hidden> Choose State  </option>
   <option value='AK'> AK </option>
   <option value='AL'> AL </option>
   <option value='AR'> AR </option>
   <option value='AZ'> AZ </option>
   <option value='CA'> CA </option>
   <option value='CO'> CO </option>
   <option value='CT'> CT </option>
   <option value='DE'> DE </option>
   <option value='FL'> FL </option>
   <option value='GA'> GA </option>
   <option value='HI'> HI </option>
   <option value='IA'> IA </option>
   <option value='ID'> ID </option>
   <option value='IL'> IL </option>
   <option value='IN'> IN </option>
   <option value='KS'> KS </option>
   <option value='KY'> KY </option>
   <option value='LA'> LA </option>
   <option value='MA'> MA </option>
   <option value='MD'> MD </option>
   <option value='ME'> ME </option>
   <option value='MI'> MI </option>
   <option value='MN'> MN </option>
   <option value='MO'> MO </option>
   <option value='MS'> MS </option>
   <option value='MT'> MT </option>
   <option value='NC'> NC </option>
   <option value='ND'> ND </option>
   <option value='NE'> NE </option>
   <option value='NH'> NH </option>
   <option value='NJ'> NJ </option>
   <option value='NM'> NM </option>
   <option value='NV'> NV </option>
   <option value='NY'> NY </option>
   <option value='OH'> OH </option>
   <option value='OK'> OK </option>
   <option value='OR'> OR </option>
   <option value='PA'> PA </option>
   <option value='RI'> RI </option>
   <option value='SC'> SC </option>
   <option value='SD'> SD </option>
   <option value='TN'> TN </option>
   <option value='TX'> TX </option>
   <option value='UT'> UT </option>
   <option value='VT'> VT </option>
   <option value='VA'> VA </option>
   <option value='WA'> WA </option>
   <option value='WI'> WI </option>
   <option value='WV'> WV </option>
   <option value='WY'> WY </option>
 </select>
}


 export const bountyFields = [{name:'Bounty Name',field:'bountyName',type:"text"},{name:'Offering Description',type:'textarea',field:'description'},{'name':'Full Name',field:'fullname',type:"text"},{name:'Target Description',field:'targetDescr',type:'textarea'},{name:'Organization',type:'text',field:'organization'},{'name':'Organization Type','field':'organizationType',selector:orgTypes},{'name':'Industry Type','field':'industryType',selector:industryTypes},{name:'City',type:'text',field:'city'},{name:'State',selector:states,field:'state'},{name:'LinkedIN Link',type:'text',field:'linkedin'}];
