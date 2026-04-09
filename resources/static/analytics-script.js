const transactionForm = document.querySelector(".transaction-form");
const showForm = document.querySelector(".add-button");
const overlayEffect = document.querySelector(".overlay");
const sortBtnElement = document.querySelector(".sort-btn");
const dropDownElement = document.querySelector(".sort-dropdown-menu");
const transactionContainer = document.querySelector(".transaction-list__all-rows");
const closeForm = document.querySelector(".close-button-icon");
const postTransaction = document.getElementById("post-transaction");

async function g(){
    const getIt = await fetch("http://localhost:8080/api/transactions/spendingOvertime");
    const getJson = await getIt.json();
    return getJson;

}


async function renderChart() {
    const data = await g(); // data is now the array

    const labels = data.map(row => row.date);
    const amounts = data.map(row => row.amount);
    console.log(labels)
    console.log(amounts)
    const ctx = document.getElementById("myChart").getContext('2d');
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: 'Spending Over Time',
                data: amounts,
                backgroundColor: 'rgb(255,255,255)',
                pointRadius: 3,
                // borderColor: 'rgb(88,204,172)',
                borderColor: '#498577',
                tension:0.5,
                pointBackgroundColor:'#498577',
                // pointBorderColor:'rgb(88,204,172)',
                pointBorderColor:'#498577',

            }]
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio:1,
            scales:{
                x:{
                    ticks:{

                        callback: function(value, index) {
                            const date= new Date( this.getLabelForValue(value));
                            const dayName = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"]

                            return `${dayName[date.getDay()]} ${date.getDate()}`;
                        },
                        maxTicksLimit: 6,

                    },
                    grid:{
                        display:false,

                    },

                },
                y:{
                    grid:{
                        display:true,

                    }

                },


            },
            plugins:{
                legend:{
                    display:true,
                    align:'start',
                    text: 'Spending Over Time',
                    position:'bottom',
                    labels:{
                        boxWidth: 10,
                        boxHeight:1,
                        font: {
                            size:12,
                        }
                    }

                }

            }
        }
    });
}

renderChart();


async function categorySpendingChart(){
    const response = await fetch("http://localhost:8080/categories/spending");
    return await response.json();
}


async function renderPieChart() {
    // fetching data for doughnut chart
    const spendingData = await categorySpendingChart();
    console.log(spendingData);
    const labels = spendingData.map(row => row.categoryName);
    const amounts = spendingData.map(row => row.totalSpending);
    // const maxCategory = spendingData.reduce((prev, curr) => prev.totalSpending > curr.totalSpending ? prev : curr);
    // console.log(maxCategory)


    // const canvasBackgroundText = {
    //   id: 'canvasBackgroundText',
    //   beforeDraw(chart, args, opts) {
    //     const {ctx, width, height} = chart;
    //     ctx.save();
    //     ctx.textAlign = 'center';
    //     ctx.textBaseline = 'middle';
    //     // display amount
    //     ctx.font = 'bold 18px sans-serif';
    //     ctx.fillStyle = '#000';
    //     ctx.fillText(opts.amount, width / 2, height / 2 - 10);
    //
    //   }
    // }

    const config = document.getElementById("myPieChart").getContext('2d');
    new Chart(config, {
        type: "polarArea",
        data: {
            labels:labels
            ,
            datasets: [{
                label: labels,
                data: amounts,
                pointStyle: 'circle',
                backgroundColor: [
                    '#196354',
                    '#ffbc3e',
                    '#e98e59',
                    // '#df4f4f',
                    // '#2a6781',
                    // '#b59b9b',
                    // '#bee65a',
                    // '#2b1a47',
                ],
                hoverOffset: 3,
                borderRadius: 4,
            }],

        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
             cutout: 50,
            plugins: {
                legend:{
                    position: 'bottom',
                    align: 'start',
                    labels:{
                        boxWidth: 10,
                        boxHeight: 10,
                        usePointStyle: true,
                        pointStyle: 'circle',
                    }
                },
                // middleText:{
                //   maxCategoryAmt : `$${maxCategory.totalSpending}`,
                //   maxCategory: `spent on ${maxCategory.categoryName}`
                // }
            },

        },

        // plugins: [{
        //   id:'middleText',
        //   beforeDraw: (chart,args,options) =>{
        //     const ctx = chart.ctx;
        //     ctx.save();
        //     ctx.fillStyle = 'black';
        //     ctx.font = '12px Arial';
        //     ctx.textAlign = 'center';
        //     ctx.fillText(options.maxCategoryAmt,100,50) ;
        //     ctx.fillText(options.maxCategory,100,70) ;
        //
        //     ctx.restore();
        //   }
        // }]
    });



}

renderPieChart()


//////delete  feature ////
let rowNumber = null;
let closestTransactionRow = null;

document.addEventListener("click",function(e) {
    const deleteIcon = e.target.closest(".transactions-list__deleteIcon");
    const editIcon = e.target.closest(".transactions-list__editIcon");
    const incomeContainer = e.target.closest(".income-container__editIcon-title");
    // unknown
    const target = e.target;
    console.log(target)
    if(!dropDownElement.contains(target)){
        dropDownElement.classList.add("hidden");
    }


    if (deleteIcon) {
        closestTransactionRow = deleteIcon.closest(".row");
        rowNumber = closestTransactionRow.dataset.tId;
        console.log(rowNumber);
        fetch(`http://localhost:8080/api/transactions/${rowNumber}`, {
            method: "DELETE"

        }).then(res => {
            console.log(res);
            if (res.ok) {
                closestTransactionRow.remove();
            }
        });
        // return;

    }

/////////////edit feature/////////////
    if (editIcon) {
        transactionForm.classList.remove("hidden");
        overlayEffect.classList.remove("hidden");
        closestTransactionRow = editIcon.closest(".row");
        rowNumber = closestTransactionRow.dataset.tId;
        console.log("in here");
        fetch(`http://localhost:8080/api/transactions/${rowNumber}`).then(res => res.json()).then(transactionList => {
            console.log(transactionList)
            document.querySelector("#receiver").value = transactionList.receiver;
            document.querySelector("#categories").value = transactionList.category.categoryId;

            document.querySelector("#date").value = transactionList.date;
            //
            document.querySelector("#amount").value = transactionList.amount;
            document.querySelector("#notes").value = transactionList.taskDescription;


        })


    }


})

// transaction container
//display the transaction form
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
// close the transaction form
if(closeForm){
    closeForm.addEventListener("click",function(e){
        transactionForm.classList.add("hidden");
        overlayEffect.classList.add("hidden");
    })


}
// display the sort btn
sortBtnElement.addEventListener("click",function(e){
    e.stopPropagation();
    if(dropDownElement.classList.contains("hidden")){
        dropDownElement.classList.remove("hidden");
    }else{
        dropDownElement.classList.add("hidden");
    }

})

// show all transactions
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
// sort transactions by date and amount
const getUserTransactions =  fetch("http://localhost:8080/api/transactions");
getUserTransactions.then(res=>res.json()).then((result)=> {

    const original = result;
    const dateAscOrder = [...result].sort((a,b)=>new Date(a.date)-new Date(b.date));
    const dateDscOrder =[...result].sort((a,b)=>new Date(b.date) -new Date(a.date));
    const amtAscOrder = [...result].sort((a,b)=>(a.amount)-(b.amount));
    const amtDscOrder =[...result].sort((a,b)=>(b.amount) -(a.amount));

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

postTransaction.addEventListener("click", async function (e) {
    e.preventDefault();
    // const editIcon =e.target.closest(".transactions-list__editIcon");

    // const closestTransactionRow = editIcon.closest(".transactions-list__row");
    // const rowNumber = closestTransactionRow.dataset.tId;
    console.log(closestTransactionRow)
    console.log(rowNumber)
    if (closestTransactionRow && rowNumber !== null) {
        async function existingTransaction() {
            const response = await fetch(`http://localhost:8080/api/transactions/${rowNumber}`);
            return await response.json();

        }

        existingTransaction().then(result => {

            console.log(result);

            const originalTransaction = result;
            console.log(originalTransaction);
            const updatedTransaction = {}
            ;
            const merchant = document.querySelector("#receiver").value;
            const category = Number(document.querySelector("#categories").value);

            const date = document.querySelector("#date").value;


            const amount = Number(document.querySelector("#amount").value);

            const notes = document.querySelector("#notes").value;

            console.log(notes);

            // console.log(document.querySelector("#categories").value);
            if (merchant !== originalTransaction.receiver) {
                updatedTransaction.receiver = merchant;
            }
            if (Number(category) !== originalTransaction.category.categoryId) {
                updatedTransaction.categoryId = category;
            }
            if (date !== originalTransaction.date) {
                updatedTransaction.date = date;
            }
            if (Number(amount) !== originalTransaction.amount) {
                updatedTransaction.amount = amount;
            }
            if (notes !== originalTransaction.taskDescription) {
                updatedTransaction.taskDescription = notes;
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

    } else {
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
        try {
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
    }
})