import React, { useState } from 'react'
import icon from '../assets/images/icon-arrow.svg';

import '../index.css';


export const AgeCalc = () => {
    
    const [isValidday, setisValidday] = useState(true);
    const [isValidmonth, setisValidmonth] = useState(true);
    const [isValidyear, setisValidyear] = useState(true);
    const [isFuture, setisFuture] = useState(false);
    const [errorday, setErrorday] = useState('');
    const [errormonth, setErrormonth] = useState('');
    const [erroryear, setErroryear] = useState('');
    const [Inps, setInps] = useState({
        day:"",
        month:"",
        year:""
    });
    const [Result, setResult] = useState([])
    // DATE : 
    const date = new Date();
    // const month = date.getUTCMonth() + 1;
    // const day = date.getDate();
    // const year = date.getFullYear();
    
    const inputdate = new Date(`${Inps.year}-${Inps.month}-${Inps.day}`);

    // console.log("Current Date : " + date)
    // console.log("Input Date : " + inputdate);


    // GET VALUES :
    const handdleChange = (event) => {
        
        const {name , value} = event.target;
        // console.log(`Current ${name} value:`, value);
        setInps({...Inps,
            [name]:value
        });
        
    }
    
   

    // VERIFY INPUTS VALUES :
    const handdleSubmit = (event) => {
        event.preventDefault();
       
        
        // VALID DAY INPUT :
        if(Inps.day === ""){
            setErrorday('This field is required')
            setisValidday(false)
        }else if(Inps.day < 0 || Inps.day > 31){
            setErrorday('Must be a valid day')
            setisValidday(false)
        }else if(Inps.month == 4 ){
            if(Inps.day < 0 || Inps.day > 28){
                setErrorday('Must be a valid day')
                setisValidday(false)
            }else{
                setErrorday('')
                setisValidday(true)
            }
            
        }
        else{
            setErrorday('')
            setisValidday(true)
            
        }

        // VALID MONTH INPUT :
        if(Inps.month === ""){
            setErrormonth('This field is required')
            setisValidmonth(false)
        }else if(Inps.month < 0 || Inps.month > 12){
            setErrormonth('Must be a valid month')
            setisValidmonth(false)
        }else{
            setErrormonth('')
            setisValidmonth(true)
        }

        // CHECK IF THE DATE ON FUTURE :

        if(Inps.year > date.getFullYear()){
            setisFuture(true);
            setErroryear('Must be in the past');
            setisValidyear(false)
        }else{
            setErroryear('')
            setisValidyear(true)
        }
        if(Inps.year === ''){
            setErroryear('This field is required')
            setisValidyear(false)
        }

        
        if(handdleSubmit){
            let ageYears = date.getFullYear() - inputdate.getFullYear();
            let ageMonths = date.getMonth() - inputdate.getMonth();
            let ageDays = date.getDate() - inputdate.getDate();
    
            if (ageDays < 0) {
                ageMonths--;
                ageDays += daysInMonth(date.getMonth(), date.getFullYear());
                
              }
          
            if (ageMonths < 0) {
                ageYears--;
                ageMonths += 12;
            }
            
              
              setResult({
                Years: ageYears,
                Months: ageMonths,
                Days: ageDays
              });
            console.log(Result)
          }
          else{
            setResult({
                Years:0,
                Months:0,
                Days:0
            })
          }
          
          


        
    }
    
    
    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
      };


      
        return (
    <div className='age'>
        <center>
            <form>
                <div className="inputs">
                <div className='input'>
                    <label 
                    htmlFor="day"
                    style={{
                        
                        color : isValidday === true ? "" : "#ff5757"
                      }}
                    >DAY</label>
                    <input 
                        type='number' 
                        className='day' 
                        name='day' 
                        placeholder='DD' 
                        onChange={handdleChange} 
                        
                        style={{
                            
                            border : isValidday === true ? "" : "1px solid #ff5757"
                          }}
                          
                        />
                    <span
                    style={{
                        
                        color : isValidday === true ? "" : "#ff5757"
                      }}>{errorday}</span>
                </div>
                <div className='input'>
                    <label 
                    htmlFor="month"
                    style={{
                        
                        color : isValidmonth === true ? "" : "#ff5757"
                      }}
                    >MONTH</label>
                    <input
                     type='number' 
                     className='month' 
                     name='month'  
                     placeholder='MM' 
                     onChange={handdleChange} 
                     
                     style={{
                        
                        border : isValidmonth === true ? "" : "1px solid #ff5757"
                      }}
                     />
                    <span 
                    style={{
                        
                        color : isValidmonth === true ? "" : "#ff5757"
                      }}
                      >{errormonth}</span>
                </div>
                <div className='input'>
                    <label 
                    htmlFor="year" 
                    style={{
                        borderColor : isFuture === true ? 'red' : '',
                        color : isValidyear === true ? "" : "#ff5757"
                      }}>
                        YEAR
                        </label>
                    <input
                     type='number' 
                     className='year' 
                     name='year'  
                     placeholder='YYYY' 
                     onChange={handdleChange} 
                     
                     style={{
                        borderColor : isFuture === true ? 'red' : '',
                        border : isValidyear === true ? "" : "1px solid #ff5757"
                      }}
                     />
                    <span
                    style={{
                        
                        color : isValidyear === true && isFuture === true ? "" : "#ff5757"
                      }}
                    >{erroryear}</span>
                </div>
                </div>
                <div className="btn">
                    <hr/>
                    <button type='submit'onClick={handdleSubmit} ><img src={icon}></img></button>
                </div>
                
                    {Result && 
                    <div className='result'> 
                        <h1><span className='result-span'>{!Result.Years ? "--": Result.Years}</span> years</h1>
                        <h1><span className='result-span'>{!Result.Months ? "--" : Result.Months}</span> months</h1>
                        <h1><span className='result-span'>{!Result.Days ? "--" : Result.Days}</span> days</h1>
                    </div>}
                
                    
                
            </form>

        </center>
    </div>
  )
}
