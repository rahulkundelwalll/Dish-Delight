import Recipe from "../Models/recipeSchema.js";

async function makeReceipt(orderID,recipeID, totalAmount) {
    const data = [];
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    for (const id of recipeID) {
        try {
            const recipe = await Recipe.findById(id);
            if (recipe) {
                data.push(recipe);
            } else {
                console.log(`Recipe not found for ID: ${id}`);
            }
        } catch (error) {
            console.error(`Error fetching recipe for ID: ${id}`, error);
        }
    }

    function generateTableRows(data) {
        return data.map((element) => `
            <tr>
                <td class="border px-4 py-2">${element.recipe_name}</td>
                <td class="border px-4 py-2">${element.price}</td>
            </tr>
        `).join('');
    }

    return(
        `      
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tastebite Payment Receipt</title>
    <style>

.max-w-[50%] {
    max-width: 50%;
}

.mx-auto {
    margin-right: auto;
    margin-left: auto;
}

.bg-white {
    background-color: #fff;
}

.rounded-lg {
    border-radius: 0.5rem;
}

.shadow-lg {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.p-8 {
    padding: 2rem;
}

.text-center {
    text-align: center;
}

.text-2xl {
    font-size: 1.5rem;
}

.font-semibold {
    font-weight: 600;
}

.text-sm {
    font-size: 0.875rem;
}

.break-all {
    word-break: break-all;
}

.text-blue-900 {
    color: #4299E1;
}

.mb-8 {
    margin-bottom: 2rem;
}

.table-auto {
    width: auto;
}

.border-collapse {
    border-collapse: collapse;
}

.w-full {
    width: 100%;
}

.border {
    border: 1px solid #e2e8f0;
}

.px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
}

.py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}



    </style>
</head>
<body>
    <div class="max-w-[50%] mx-auto bg-white rounded-lg shadow-lg p-8">
        <div class="text-center mb-6">
            <h1 class="text-2xl font-semibold">Tastebite Payment Receipt</h1>
        </div>
        <div class="receipt">
            <p class="text-sm break-all text-blue-900 font-semibold mb-8">Order ID: ${orderID}</p>
            <p class="text-sm">Total Amount: ${totalAmount}</p>
            <p class="text-sm">Date: ${formattedDate}</p>
            <div class="text-sm">
                <h1 class="text-lg font-bold">Order Details:</h1>
                <table class="table-auto border-collapse w-full">
                    <thead>
                        <tr>
                            <th class="border px-4 py-2">Recipe Name</th>
                            <th class="border px-4 py-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${generateTableRows(data)}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>  
    `
    )
}

export default makeReceipt;