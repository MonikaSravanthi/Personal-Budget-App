//////////////////////////////////////////////////////////////
///addtransactionbutton////
const transactionForm = document.querySelector(".transaction-form");
const showForm = document.querySelector(".add-button");
const overlayEffect = document.querySelector(".overlay");
const postTransaction = document.getElementById("post-transaction");
const sortBtnElement = document.querySelector(".sort-btn");
const dropDownElement = document.querySelector(".sort-dropdown-menu");



sortBtnElement.addEventListener("click",function(e){
  e.stopPropagation();
  if(dropDownElement.classList.contains("hidden")){
    dropDownElement.classList.remove("hidden");
  }else{
    dropDownElement.classList.add("hidden");
  }

})
document.addEventListener("click",function(e){
  const target = e.target;
  console.log(target);
  if(!dropDownElement.contains(target)){
    dropDownElement.classList.add("hidden");
  }
})

// show the form
if(showForm){
  showForm.addEventListener("click", function () {
    document.querySelector("#receiver").value = "";
    document.querySelector("#categories").value="";
    document.querySelector("#date").value = "";
    document.querySelector("#amount").value="";
    document.querySelector("#notes").value = "" ;
    transactionForm.classList.remove("hidden");
    overlayEffect.classList.remove("hidden");
  });

}
//
const closeForm = document.querySelector(".close-button-icon");
if(closeForm){
  closeForm.addEventListener("click",function(e){
    transactionForm.classList.add("hidden");
    overlayEffect.classList.add("hidden");
  })


}
// hide the form


//
const postTrans = async function (data) {
  const f = await fetch("http://localhost:8080/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    console.log("saved successful!");
    // Redirect or fetch protected data
  } else {
    console.error(" failed");
  }
};
const form = document.getElementById("form");
const transactionContainer = document.querySelector(".transaction-list__all-rows");


const transactionsAsyncFunc = async function() {
  try {
    const getAllTransactions = await fetch("http://localhost:8080/api/transactions");
    const res = await getAllTransactions.json();
    console.log(res);
    res.forEach(obj => {
      const addHtml = `

                   <div class="row" data-t-id = ${obj.transactionId}>
                      <div class="transaction-list__data">${obj.receiver}</div>
                      <div class="transaction-list__data">${obj.category.categoryName}</div>
                      <div class="transaction-list__data">${obj.date}</div>
                      <div class="transaction-list__data">${obj.amount}</div>
                      <div class="transaction-list__data">${obj.taskDescription}</div>
                      <div class="transactions-list__row-icons">
                         <div class="transactions-list__editIcon">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                       <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                       <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                       </svg>
                         </div>
                          <div class="transactions-list__deleteIcon">

                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                             <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                          </svg>
                         </div>  
                      </div>
      `;
      transactionContainer.insertAdjacentHTML("afterbegin", addHtml);
    });

    return res;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};


transactionsAsyncFunc().then(res=>console.log("success"));

//////////income display after login///////

fetch("http://localhost:8080/income").then(r=>r.json()).then(result=> {
document.querySelector(".income-container__price").textContent = `$${result}`
});


// //////sorting feature ////date
// selecting date element

const userTransactions =  fetch("http://localhost:8080/api/transactions");
userTransactions.then(res=>res.json()).then(result=> {

const original = result;
const dateAscOrder = [...result].sort((a,b)=>new Date(a.date)-new Date(b.date));
console.log(dateAscOrder);
const dateDscOrder =[...result].sort((a,b)=>new Date(b.date) -new Date(a.date));
console.log(dateDscOrder);
console.log(original);

const amtAscOrder = [...result].sort((a,b)=>(a.amount)-(b.amount));
console.log(dateAscOrder);
const amtDscOrder =[...result].sort((a,b)=>(b.amount) -(a.amount));
console.log(dateDscOrder);
console.log(original);

const dateElement = document.getElementById("date-btn");
const amountElement = document.getElementById("amt-btn");

let userDateClickCount = 0;
let userAmtClickCount =0;
  // sort by date
  dateElement.addEventListener("click",function(e){
    // dropDownElement.remove();
    e.preventDefault();
    const originalTransactonsList = document.querySelectorAll(".row");
    [...originalTransactonsList ].forEach(transaction=>transaction.remove());

    if(userDateClickCount===0){
      console.log(dateAscOrder);
      dateAscOrder.forEach(obj => {
        const addHtml = `

                   <div class="row" data-t-id = ${obj.transactionId}>
                      <div class="transaction-list__data">${obj.receiver}</div>
                      <div class="transaction-list__data">${obj.category.categoryName}</div>
                      <div class="transaction-list__data">${obj.date}</div>
                      <div class="transaction-list__data">${obj.amount}</div>
                      <div class="transaction-list__data">${obj.taskDescription}</div>
                      <div class="transactions-list__row-icons">
                         <div class="transactions-list__editIcon">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                       <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                       <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                       </svg>
                         </div>
                          <div class="transactions-list__deleteIcon">

                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                             <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                          </svg>
                         </div>  
                      </div>
      `;
        transactionContainer.insertAdjacentHTML("beforeend", addHtml);

      });
      userDateClickCount=1;
    } else if(userDateClickCount===1){
      console.log(dateDscOrder);
      dateDscOrder.forEach(obj => {
        const addHtml = `<div class="row" data-t-id = ${obj.transactionId}>
                      <div class="transaction-list__data">${obj.receiver}</div>
                      <div class="transaction-list__data">${obj.category.categoryName}</div>
                      <div class="transaction-list__data">${obj.date}</div>
                      <div class="transaction-list__data">${obj.amount}</div>
                      <div class="transaction-list__data">${obj.taskDescription}</div>
                      <div class="transactions-list__row-icons">
                         <div class="transactions-list__editIcon">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                       <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                       <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                       </svg>
                         </div>
                          <div class="transactions-list__deleteIcon">

                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                             <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                          </svg>
                         </div>  
                      </div>
      `;
        transactionContainer.insertAdjacentHTML("beforeend", addHtml);


      });
      userDateClickCount=0;

    }



  })
  // sort by amount
  amountElement.addEventListener("click",function(e){
    e.preventDefault();
    const originalTransactonsList = document.querySelectorAll(".row");
    [...originalTransactonsList ].forEach(transaction=>transaction.remove());

    if(userAmtClickCount===0){
      console.log(amtAscOrder);
      amtAscOrder.forEach(obj => {
        const addHtml = `<div class="row" data-t-id = ${obj.transactionId}>
                      <div class="transaction-list__data">${obj.receiver}</div>
                      <div class="transaction-list__data">${obj.category.categoryName}</div>
                      <div class="transaction-list__data">${obj.date}</div>
                      <div class="transaction-list__data">${obj.amount}</div>
                      <div class="transaction-list__data">${obj.taskDescription}</div>
                      <div class="transactions-list__row-icons">
                         <div class="transactions-list__editIcon">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                       <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                       <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                       </svg>
                         </div>
                          <div class="transactions-list__deleteIcon">

                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                             <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                          </svg>
                         </div>  
                      </div>
      `;
        transactionContainer.insertAdjacentHTML("beforeend", addHtml);

      });
      userAmtClickCount=1;
    } else if(userAmtClickCount===1){
      console.log(amtDscOrder);
      amtDscOrder.forEach(obj => {
        const addHtml = `<div class="row" data-t-id = ${obj.transactionId}>
                      <div class="transaction-list__data">${obj.receiver}</div>
                      <div class="transaction-list__data">${obj.category.categoryName}</div>
                      <div class="transaction-list__data">${obj.date}</div>
                      <div class="transaction-list__data">${obj.amount}</div>
                      <div class="transaction-list__data">${obj.taskDescription}</div>
                      <div class="transactions-list__row-icons">
                         <div class="transactions-list__editIcon">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                       <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                       <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                       </svg>
                         </div>
                          <div class="transactions-list__deleteIcon">

                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                             <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                          </svg>
                         </div>  
                      </div>
      `;
        transactionContainer.insertAdjacentHTML("beforeend", addHtml);


      });
      userAmtClickCount=0;

    }


  })
});

//////delete  feature ////
let rowNumber = null;
let closestTransactionRow = null;

document.addEventListener("click",function(e){
  const deleteIcon = e.target.closest(".transactions-list__deleteIcon");
  const editIcon =e.target.closest(".transactions-list__editIcon");
  const incomeContainer = e.target.closest(".income-container__editIcon-title");

  if(deleteIcon){
    closestTransactionRow = deleteIcon.closest(".row");
    rowNumber = closestTransactionRow.dataset.tId;
    console.log(rowNumber);
    fetch(`http://localhost:8080/api/transactions/${rowNumber}`,{
      method:"DELETE"

    }).then(res=>{
      console.log(res);
      if(res.ok){
        closestTransactionRow.remove();
      }
    });
    // return;

  }

/////////////edit feature/////////////
  if(editIcon){
    transactionForm.classList.remove("hidden");
    overlayEffect.classList.remove("hidden");
    closestTransactionRow = editIcon.closest(".row");
    rowNumber = closestTransactionRow.dataset.tId;
    console.log("in here");
    fetch(`http://localhost:8080/api/transactions/${rowNumber}`).then(res=>res.json()).then(transactionList => {
      console.log(transactionList)
      document.querySelector("#receiver").value = transactionList.receiver;
      document.querySelector("#categories").value = transactionList.category.categoryId;

      document.querySelector("#date").value = transactionList.date;
      //
      document.querySelector("#amount").value = transactionList.amount;
      document.querySelector("#notes").value = transactionList.taskDescription;



    })


  }
  // add income
  if(incomeContainer) {
    const income = incomeContainer.nextElementSibling;

    const siblingElement = income.querySelector(".income-container__price")
    console.log(siblingElement);
    const createInput = document.createElement("input");
    createInput.type = "number"
    createInput.id = "income"
    createInput.name ="income"
    createInput.className ="incomeInput";
    console.log(createInput);
    siblingElement.replaceWith(createInput);

    createInput.addEventListener("keyup",function(e){
      if(e.key ==="Enter"){

         const newIncome = document.createElement("h2");
         newIncome.className = "income-container__price"
         newIncome.textContent  =`$${createInput.value}`;
         createInput.replaceWith(newIncome);


        fetch(`http://localhost:8080/income`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(
              { income: parseInt(newIncome.textContent.replace("$",""))}
          )

        }).then( r =>console.log(r))


      }

    } )

  }


})


postTransaction.addEventListener("click",  async function(e) {
  e.preventDefault();
    // const editIcon =e.target.closest(".transactions-list__editIcon");

  // const closestTransactionRow = editIcon.closest(".transactions-list__row");
  // const rowNumber = closestTransactionRow.dataset.tId;
  console.log(closestTransactionRow)
  console.log(rowNumber)
  if(closestTransactionRow && rowNumber !== null){
   async function existingTransaction(){
     const response = await fetch(`http://localhost:8080/api/transactions/${rowNumber}`);
    return await response.json();

   }

    existingTransaction().then(result => {

      console.log(result);

      const originalTransaction = result;
      console.log(originalTransaction);
      const updatedTransaction = {
      }
      ;
      const merchant = document.querySelector("#receiver").value;
      const category= Number(document.querySelector("#categories").value);

      const date = document.querySelector("#date").value;


      const amount = Number(document.querySelector("#amount").value);

      const notes = document.querySelector("#notes").value ;

      console.log(notes);

      // console.log(document.querySelector("#categories").value);
      if(merchant!==originalTransaction.receiver ){
        updatedTransaction.receiver =merchant;
      }
      if(Number(category)!==originalTransaction.category.categoryId ){
        updatedTransaction.categoryId=category;
      }
      if(date!==originalTransaction.date ){
        updatedTransaction.date =date;
      }
      if(Number(amount)!==originalTransaction.amount ){
        updatedTransaction.amount =amount;
      }
      if(notes!==originalTransaction.taskDescription ){
        updatedTransaction.taskDescription =notes;
      }
      console.log(updatedTransaction);
      console.log(rowNumber);
      fetch(`http://localhost:8080/api/transactions/${rowNumber}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTransaction)
      }).then(data => console.log(data));

    })

  }else {
    const data = {
      receiver: document.querySelector("#receiver").value,
      category: {
        categoryId: document.querySelector("#categories").value
      },

      date: document.querySelector("#date").value,
      amount: document.querySelector("#amount").value,
      taskDescription: document.querySelector("#notes").value
    }

    async function fetchCategoryLimit() {
      const response = await fetch("http://localhost:8080/categories/limit");
      return await response.json();
    }

    fetchCategoryLimit().then(res => {
      console.log(res);
    })
    try
    {
      const response = await fetch("http://localhost:8080/api/transactions", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      });
      const result = await response.json();
      const transactionId = result.transactionId;
         const getSavedtransaction = await fetch(`http://localhost:8080/api/transactions/${transactionId}`);
         const savedResponse = await getSavedtransaction.json();
         const addHtml = `<div class="row" data-t-id = ${savedResponse.transactionId}>
                      <div class="transaction-list__data">${savedResponse.receiver}</div>
                      <div class="transaction-list__data">${savedResponse.category.categoryName}</div>
                      <div class="transaction-list__data">${savedResponse.date}</div>
                      <div class="transaction-list__data">${savedResponse.amount}</div>
                      <div class="transaction-list__data">${savedResponse.taskDescription}</div>
                      <div class="transactions-list__row-icons">
                         <div class="transactions-list__editIcon">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                       <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                       <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                       </svg>
                         </div>
                          <div class="transactions-list__deleteIcon">

                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                             <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                          </svg>
                         </div>
                      </div>
      `;
         transactionContainer.insertAdjacentHTML("afterbegin", addHtml);

      if (!response.ok) {
        const error = document.querySelector(".Error-Message");
        const message = document.querySelector(".message");
        message.innerHTML = await response.text();
        error.classList.remove("hidden");
      }
      console.log("added successfully");
    } catch {
      console.log("network issues")
    }


                 transactionForm.classList.add("hidden");
                 overlayEffect.classList.add("hidden");
}})

  ///////////////////
//income



// /////expence calculator

const allTransactions =  fetch("http://localhost:8080/api/transactions");
allTransactions.then(res=>res.json()).then(result=> {
  const totalExpense =  result.reduce(function(acc,currentTransaction){
        return acc+currentTransaction.amount;
    // Number.parseFloat(acc+currentTransaction.amount).toFixed(2);
    },0)

    const expenseContainer = document.querySelector(".expense-container__price");
    expenseContainer.textContent = `$${(totalExpense).toFixed(2)}`
    const expenseValue = totalExpense;
    const incomeContainer = document.querySelector(".income-container__price");
    const balanceContainer  = document.querySelector(".balance-container__price");
    const incomeValue = parseInt(incomeContainer.textContent.replace("$",""));
    const totalBalance = balanceContainer.textContent =`$${(incomeValue -expenseValue).toFixed(2)}`
    console.log(expenseValue);
});


//////////////////balance

///////category limit //.............

document.getElementById("submit-btn").addEventListener("click", function(e){
  e.preventDefault();
  const formw = document.getElementById("categoryLimit");
  const submitBtn =document.querySelector("button[value=save]");
  const formData = new FormData(formw,submitBtn)



  const categoryLimit = []

  for(const[key,value] of formData){
    categoryLimit.push({
      categoryName: key,
      categoryLimit: value
    })

  }
  console.log(categoryLimit)

 async function c(){
   await fetch("http://localhost:8080/categories/limit", {
     method:"POST",
     headers: {
       "Content-Type":"application/json"
     },
     body:JSON.stringify(categoryLimit)

   })
 }
c().then(r =>console.log(r))
})

//
async function loadCategoryLimits() {
  try {
    const response = await fetch("http://localhost:8080/categories/limit");
    const data = await response.json();

    console.log(data);

    for (const result of data)
    {
      if (result.categoryName && result.percentage != null) {

        const html = `
        <div class="category-limit__category">
            <div class="category-limit__category-name">
            <p class="name">${result.categoryName}</p>
          </div>

          <div class="category-limit__progress-bar-wrapper">
            <div class="category-limit__progress-bar" data-percentage=${result.percentage}>
              <span>${result.percentage}%</span>
            </div>
            <p class="category-limit__description">
              ${result.totalAmtSpentThisMonth} of ${result.categoryLimit} is spent
            </p>
          </div>

        </div>
        `;
        document
            .querySelector(".category-limit__all-categories").insertAdjacentHTML("afterbegin", html);


      }
    }

    document.querySelectorAll(".category-limit__progress-bar").forEach(progressBar=>{
      const getPercentage = progressBar.dataset.percentage;
      progressBar.style.width = getPercentage+"%";
      if(getPercentage>=100){
        progressBar.style.width= 100+"%";
        progressBar.style.backgroundColor = "rgba(239,50,50,0.38)";
        progressBar.style
            .setProperty('--progress-bar-width', "100%");

      }
      if(getPercentage<100){
        progressBar.style
            .setProperty('--progress-bar-width', getPercentage+"%");
        progressBar.style.backgroundColor = "#776e36";


      }
    })

  } catch (error) {
    console.error("Error loading category limits:", error);
  }
}

loadCategoryLimits();

document.querySelector(".cicon").addEventListener("click",function(e){
  e.preventDefault()
document.querySelector(".cLimit").classList.remove("hidden");
  overlayEffect.classList.remove("hidden");
})

