// ID          int64      `json:"id"`
// UserID      int64      `json:"user_id"`
// TypeID      int64      `json:"type_id"`
// Description string     `json:"description"`
// Amount      int64      `json:"amount"`
// Date        CustomTime `json:"date"`
// Status      bool       `json:"status"`

import { formatDateCalendar, getCurrentDate } from "../API";

export const sendDebt = async (date, status, typeID, amount, description, navigate) => {
    // const date = getCurrentDate();
    const token = localStorage.getItem("token");
    const formattedDate = formatDateCalendar(date);
    
    console.log(formattedDate);
    console.log(date);
    const data = {
      type_id: parseInt(typeID, 10),
      description: description,
      amount: parseInt(amount, 10),
      date: formattedDate,
      status: status === "Debt" ? false : true,
    };
    // console.log(data.income_type_id);
    await fetch(`/debt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (!response.ok) {
        console.log("something went wrong");
      } else {
        navigate(0);
        console.log("Income sent");
      }
    });
  };