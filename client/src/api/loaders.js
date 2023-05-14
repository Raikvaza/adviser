import { redirect } from "react-router";
import { formatDateCalendar } from "./API";
const spendingColors = ['DC2F02', 'E85D04', 'F48C06', 'FAA307', 'D00000'];
const incomeColors = ['9EF01A', '70E000', 'CCFF33', '38B000'];


function convertToPieChartData(financialData) { // CONVERTS loader data on page Statistics to the format that is acceptable with the Donut Chart
  const pieChartData = [
    ...financialData.spendings.map((s, index) => ({
      id: `${s.typeId}`, // Spending
      label: `${s.typeId}`,
      value: s.total,
      color: `#${spendingColors[index % spendingColors.length]}`,
    })),
    ...financialData.incomes.map((i, index) => ({
      id: `${i.typeId}`, // Income
      label: `${i.typeId}`,
      value: i.total,
      color: `#${incomeColors[index % incomeColors.length]}`,
    })),
  ];

  return pieChartData;
} 


export const homeLoader = async () => {
    
    const token = localStorage.getItem('token');

    if (token) {
      try {
              const [avatarResponse] = await Promise.all([
                fetch(`/images`, {
                  headers: {
                    Accept: "application/json",
                    Authorization: `${token}`,
                  },
                  method: "GET",
                  
                }),
              ]);
                
              if (!avatarResponse.ok) {
                if (avatarResponse.status === 404) {
                  const avatar = null;
                  return { avatar };
                } else {
                  const error = new Error(`Could not fetch profile Data. Status: ${avatarResponse.statusText}`);
                  error.status = avatarResponse.status;
                  throw error;
                }
              }
              
              const avatar = await avatarResponse.json();
              return { avatar};
            } catch (error) {
              console.log(error);
              throw error;
            }
    } else {
        return (redirect("/signin"))
    }
}

export const statisticsData =( async ({request}) => {
  const token = localStorage.getItem('token');
  
  if (token) { //If token is valid do the fetch  
  const url = new URL(request.url);
  const currentQuery = url.search;
  
  try {
    const [budgetTypeResponse,statResponse] = await Promise.all([
      fetch(`/budget/type`, {
        headers: {
          Accept: "application/json",
          Authorization: `${token}`,
        },
        method: "GET",
        
      }),
      fetch(`/statistics${currentQuery}`, {
        headers: {
          Accept: "application/json",
          Authorization: `${token}`,
        },
        method: "GET",
      }),
    ]);
    if (budgetTypeResponse.status === 401 || statResponse.status === 401){ // Check if status is unauthorized
      return redirect('/signin');
    }
    if (!budgetTypeResponse.ok) {
      const error = new Error(`Could not fetch budget Types. Status: ${budgetTypeResponse.statusText}`);
      error.status = budgetTypeResponse.status;
      throw error;
    }
    if (!statResponse.ok) {
      const error = new Error(`Could not fetch statistics Data. Status: ${statResponse.statusText}`);
      error.status = statResponse.status;
      throw error;
    }
    const types = await budgetTypeResponse.json(); //Data from budgetTypeResponse
    
    const data = await statResponse.json(); // Data from statResponse
    const financialData = {
      spendings: [],
      totalSpending: 0,
      incomes: [],
      totalIncome: 0,
    };
  // Create a mapping from typeId to IncomeType and SpendingType
if (types.Type_income && types.Type_spending) {
    //Changing income types to proper values from Ids
    const incomeTypeMapping = types.Type_income.reduce((acc, type) => {
      acc[type.ID] = type.IncomeType;
      return acc;
    }, {});
    //Changing spending types to proper values from Ids
    const spendingTypeMapping = types.Type_spending.reduce((acc, type) => {
      acc[type.ID] = type.SpendingType;
      return acc;
    }, {});
  //ADDING SPENDING DATA
  if (data.value_spending.spendings) {
    financialData.spendings = data.value_spending.spendings.map(s => ({
      typeId: spendingTypeMapping[s.type_id], // Use mapping here
      percentage: s.percentage,
      total: s.total,
    }));
  }
  //ADDING SPENDING TOTAL
  if (data.value_spending.total_amount){
    financialData.totalSpending = data.value_spending.total_amount;
  }
  //ADDING INCOME DATA
  if (data.value_income.incomes){

      financialData.incomes = data.value_income.incomes.map(i => ({
        typeId: incomeTypeMapping[i.type_id], // Use mapping here
        percentage: i.percentage,
        total: i.total,
      }));
  }
  //ADDING INCOME TOTAL
  if(data.value_income.total_amount){
    financialData.totalIncome = data.value_income.total_amount;
  }
} else {
  throw new Error(`Couldn't fetch types data`);
}
  const pieChartData = convertToPieChartData(financialData);
  const incomeTotal = financialData.totalIncome;
  const spendingTotal = financialData.totalSpending;
  
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date)
  const period = {
    startDate: formatDateCalendar(startDate),
    endDate: formatDateCalendar(endDate),
    durationInDays: (endDate - startDate) / (1000 * 60 * 60 * 24),
  };
  console.log(period);
  console.log(pieChartData);
  return { pieChartData, incomeTotal, spendingTotal, period };
  } catch (error) {
    throw error;
  }
} else {
    return (redirect("/signin"))
}
  
  
  

  // try{
  //   const response = await fetch(`/statistics`, {
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: `${token}`,
  //       },
  //     method: "GET",
  //   })
  //   if (!response.ok){
      
  //       const error = new Error(response.statusText);
  //       error.status = response.status;
  //       throw error;
  //   } else if (response.ok){
  //     const data = await response.json();
  //     console.log(data);
  //     return {data};
  //   }
  // } catch(error){
  //   console.log(error);
  //   throw error;
  // }
})  //OK

export const budgetData =( async ({request}) => {
  const token = localStorage.getItem('token');
  
  if (token) { // Do fetch if token is present
    const url = new URL(request.url);
    const currentQuery = url.search;
    
    try {
      //   const url = new URL(request.url);
      //   const searchParams = url.searchParams;
      //   const id = searchParams.get('id');
          
        const [budgetTypeResponse, budgetStatsResponse] = await Promise.all([
          fetch(`/budget/type`, {
            headers: {
              Accept: "application/json",
              Authorization: `${token}`,
            },
            method: "GET",
            
          }),
          fetch(`/budget/stats${currentQuery}`, {
            headers: {
              Accept: "application/json",
              Authorization: `${token}`,
            },
            method: "GET",
            
          })
        ]);
          
        if (!budgetTypeResponse.ok) {
          // if (budgetTypeResponse.status===401){
          //   return redirect('/signin')
          // }
          const error = new Error(`Could not fetch the post. Status: ${budgetTypeResponse.statusText}`);
          error.status = budgetTypeResponse.status;
          throw error;
        }
        
        if (!budgetStatsResponse.ok) {
          // if (budgetStatsResponse.status===401){
          //   return redirect('/signin')

          // }
          const error = new Error(`Could not fetch the comments. Status: ${budgetStatsResponse.statusText}`);
          error.status = budgetStatsResponse.status;
          throw error;
        }
        
        const Types = await budgetTypeResponse.json();
        const Stats = await budgetStatsResponse.json();
        return { Types, Stats };
      } catch (error) {
        console.log(error);
        throw error;
      }

  } else {
      return (redirect("/signin"))
  }  
})  

export const debtData =( async ({request}) => {
  const token = localStorage.getItem('token');
  try {
        //   const url = new URL(request.url);
        //   const searchParams = url.searchParams;
        //   const id = searchParams.get('id');
        const url = new URL(request.url);
        const currentQuery = url.search;    
          const [debtResponse, debtTypesResponse] = await Promise.all([
            fetch(`/debt${currentQuery}`, {
              headers: {
                Accept: "application/json",
                Authorization: `${token}`,
              },
              method: "GET",
              
            }),
            fetch(`/debt/type`, {
              headers: {
                Accept: "application/json",
                Authorization: `${token}`,
              },
              method: "GET",
              
            }),
          ]);
            
          if (!debtResponse.ok) {
            // if (budgetTypeResponse.status===401){
            //   return redirect('/signin')
            // }
            const error = new Error(`Could not fetch the post. Status: ${budgetTypeResponse.statusText}`);
            error.status = budgetTypeResponse.status;
            throw error;
          }
          if (!debtTypesResponse.ok) {
            // if (budgetTypeResponse.status===401){
            //   return redirect('/signin')
            // }
            const error = new Error(`Could not fetch the post. Status: ${budgetTypeResponse.statusText}`);
            error.status = budgetTypeResponse.status;
            throw error;
          }
          
          const debtData = await debtResponse.json();
          const debtTypesData = await debtTypesResponse.json();
          // console.log(debtTypesData);
          console.log(debtData);
          return { debtData, debtTypesData };
        } catch (error) {
          console.log(error);
          throw error;
        }
})


export const profileData =( async () => {
  const token = localStorage.getItem('token');
  try {
          const [profileResponse] = await Promise.all([
            fetch(`/profile`, {
              headers: {
                Accept: "application/json",
                Authorization: `${token}`,
              },
              method: "GET",
              
            }),
            
          ]);
            
          if (!profileResponse.ok) {
            // if (budgetTypeResponse.status===401){
            //   return redirect('/signin')
            // }
            const error = new Error(`Could not fetch profile Data. Status: ${profileResponse.statusText}`);
            error.status = profileResponse.status;
            throw error;
          }

          const profileData = await profileResponse.json();
          return { profileData};
        } catch (error) {
          console.log(error);
          throw error;
        }
})

export const plannerData = (async () => {
  const token = localStorage.getItem('token');
  try{
    const [typesResponse, statsResponse] = await Promise.all([
      fetch(`/budget/type`, {
        headers: {
          Accept: "application/json",
          Authorization: `${token}`,
        },
        method: "GET",
        
      }),
      fetch(`/planner`, {
        headers: {
          Accept: "application/json",
          Authorization: `${token}`,
        },
        method: "GET",
      })   
    ]);
    
    if (typesResponse.status === 401 || statsResponse.status === 401){ // Check if status is unauthorized
      return redirect('/signin');
    }
    
    if (!typesResponse.ok) {
      const error = new Error(`Could not fetch types of spendings and incomes. Status: ${typesResponse.statusText}`);
      error.status = typesResponse.status;
      throw error;
    }
    if (!statsResponse.ok) {
      const error = new Error(`Could not fetch types of spendings and incomes. Status: ${statsResponse.statusText}`);
      error.status = statsResponse.status;
      throw error;
    }
    const FullTypes = await typesResponse.json(); // Gets both Income and Spending
    const Stats = await statsResponse.json();
    const Types = FullTypes.Type_spending; // Take only Spending for Planner
    return { Types, Stats };    
  } catch(error){
    console.log(error);
    throw error;
  }
})
