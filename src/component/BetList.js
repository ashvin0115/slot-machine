import axios from 'axios';
import { useEffect, useState } from 'react';

const api_url = 'http://localhost:5000/';

const BetList = (props) => {

  const [show, setShow] = useState(false)
  const [sort, setSort] = useState(0)
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const betlist = await axios.get(`${api_url}config`);
      setList(betlist.data);
    }
    fetchData();
  }, [])

  return (
    <>
      <div className={`relative flex justify-between`}>
            <button className={`w-[160px] h-10 py-2 px-4 border-[1px] border-[#E3E1E1] rounded-md`}
              onClick={() => setShow(!show)}
            >
              <div className={`flex items-center justify-between`}>
                <p className={`font-sans font-[400] text-[14px] text-[#5F5F5F]`}>{list[sort]}</p>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 1L7 7L1 1" stroke="#5F5F5F" strokeWidth="2" strokeMiterlimit="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>

            {
              show ? <ul 
                        className={`dropdown-menu absolute top-[48px] w-[250px] h-[128px] dark:bg-inherit `}
                      >
                        {
                          list.map((item, index) => {
                            return <li 
                                className={`h-[32px] hover:bg-[#777] hover:text-[#fff] flex items-center pl-5 ${index === sort ? "bg-[#777] text-[#fff]" : ""}`}
                                key={index}
                                onClick={() => {
                                  setSort(index);
                                  setShow(!show);
                                  props.setBet(list[index]);
                                  props.setPanel([]);
                                }}
                              >
                                {item}
                              </li>
                          })
                        }
                      </ul> : <></>
            }
            </div>
    </>
  )
} 

export default BetList;