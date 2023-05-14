

// ID          int64      `json:"id"`
// UserID      int64      `json:"user_id"`
// TypeID      int64      `json:"type_id"`
// Description string     `json:"description"`
// Amount      int64      `json:"amount"`
// Date        CustomTime `json:"date"`
// Status      bool       `json:"status"`

export const sendAmount = async (Type_ID, Amount, navigate) => {
    // const date = getCurrentDate();
    const token = localStorage.getItem("token");
    
    const data = {
        type_id: parseInt(Type_ID, 10),
        amount: parseInt(Amount, 10),
    }

    await fetch(`/planner`, {
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
        setTimeout(()=>{
          navigate(0);
        }, 200)

        console.log("Planner Amount sent");
      }
    });
  };