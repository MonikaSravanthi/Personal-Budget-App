//////////////////////////////////////////////////////////////
///addtransactionbutton////
const transactionForm = document.querySelector(".transaction-form");
const showForm = document.querySelector(".add-button");
const overlayEffect = document.querySelector(".overlay");
const postTransaction = document.getElementById("post-transaction");
const dropDownElement = document.querySelector(".sort-dropdown-menu");



const recentTransactionContainer = document.querySelector(".recent-transactions-list__rows");


const transactionsAsyncFunc = async function() {
    try {
        const getAllTransactions = await fetch("http://localhost:8080/api/transactions/recent");
        const res = await getAllTransactions.json();
        console.log(res);
        res.forEach(obj => {
            const addHtml = `

                   <div class="recent-row" data-t-id = ${obj.transactionId}>
                      <div class="recent-transaction-list__data">${obj.receiver}</div>
                      <div class="recent-transaction-list__data">${obj.category.categoryName}</div>
                      <div class="recent-transaction-list__data">${obj.date}</div>
                      <div class="recent-transaction-list__data">${obj.amount}</div>
                      <div class="recent-transaction-list__data">${obj.taskDescription}</div>
                     
                   </div>
      `;
            recentTransactionContainer.insertAdjacentHTML("afterbegin", addHtml);
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


//////delete  feature ////
let rowNumber = null;
let closestTransactionRow = null;

document.addEventListener("click",function(e){
    const deleteIcon = e.target.closest(".transactions-list__deleteIcon");
    const editIcon =e.target.closest(".transactions-list__editIcon");
    const incomeContainer = e.target.closest(".income-container__editIcon-title");
    // add Income
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


//income



// /////expence and balance containers

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

