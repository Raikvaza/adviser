import { getCurrentDate } from "../API";

export const sendIncome = async(e, typeID, amount, description, navigate) => {
    e.preventDefault();
    const date = getCurrentDate();
    const token = localStorage.getItem('token');
    const data = {
        income_type_id: parseInt(typeID, 10), // Convert typeID to a number (int64)
        amount: parseInt(amount, 10),
        description: description,
        date: date
    }
    await fetch(`/income`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        },
        body: JSON.stringify(data),
      }).then(async (response) => {
        if (!response.ok) {
            console.log("something went wrong");
        } else {
            console.log("Income sent");
            setTimeout(() => {
                navigate(0); // This will navigate back to the previous page
              }, 300);
        }   
      })
      
}