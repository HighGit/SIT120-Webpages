const icecreamSalesListJSON = {
    icecreams: [
        { name: "Vanilla", bestState: 'VIC', totalSold: 78923 },
        { name: "Chocolate", bestState: 'SA', totalSold: 23001 },
        { name: "Cookies 'n Cream", bestState: 'NT', totalSold: 43010 },
        { name: "Strawberry", bestState: 'VIC', totalSold: 29221 },
        { name: "Chocolate Chip", bestState: 'WA', totalSold: 62133 },
        { name: "Mint Chocolate Chip", bestState: 'TAS', totalSold: 12075 },
        { name: "Chocolate Chip Cookie Dough", bestState: 'NSW', totalSold: 39992 },
        { name: "Butter Pecan", bestState: 'ACT', totalSold: 45000 },
        { name: "Birthday Cake", bestState: 'QLD', totalSold: 3001 },
        { name: "Moose Tracks", bestState: 'WA', totalSold: 59004 }
    ]
};

/**
 * Returns the full state name based on its abbreviation.
 * @param {string} state - The two or three-letter state abbreviation.
 * @returns {string} The full state name.
 */
function fullStateName(state) {
    switch (state) {
        case 'VIC':
            return 'Victoria';
        case 'SA':
            return 'South Australia';
        case 'NT':
            return 'Northern Territory';
        case 'WA':
            return 'Western Australia';
        case 'TAS':
            return 'Tasmania';
        case 'NSW':
            return 'New South Wales';
        case 'ACT':
            return 'Australian Capital Territory';
        case 'QLD':
            return 'Queensland';
        default:
            return state; // Return the original if not found
    }
}

/**
 * Categorizes the sales of an ice cream based on the total number sold.
 * This function uses a cascading if/else if structure as requested.
 * @param {number} totalSold - The total number of ice creams sold.
 * @returns {string} The sales category string.
 */
function salesCategory(totalSold) {
    if (totalSold >= 55000) {
        return 'Outstanding';
    } else if (totalSold >= 35000) {
        return 'Fantastic';
    } else if (totalSold >= 25000) {
        return 'Great';
    } else if (totalSold >= 15000) {
        return 'Pretty Good';
    } else {
        return 'Below Average';
    }
}

/**
 * Main function to build and display the ice cream sales list.
 * It dynamically creates an HTML table from the JSON data.
 * It also calculates and displays summary statistics.
 */
function buildIcecreamList() {
    // Check if the list has already been built to prevent duplicates.
    if (document.getElementById('sales-report-table')) {
        return;
    }

    const icecreams = icecreamSalesListJSON.icecreams;
    let tableHTML = `
        <p class="text-center mt-4">The following table has been dynamically generated from JSON data:</p>
        <table class="table table-striped table-hover mt-4" id="sales-report-table">
            <thead class="bg-primary text-white">
                <tr>
                    <th scope="col">Ice Cream Name</th>
                    <th scope="col">Best State</th>
                    <th scope="col">Total Sold</th>
                    <th scope="col">Sales Category</th>
                </tr>
            </thead>
            <tbody>
    `;

    let totalSales = 0;
    let bestSeller = { totalSold: -1 };
    let worstSeller = { totalSold: Infinity };

    // Loop through the ice cream data to build the table rows.
    for (const icecream of icecreams) {
        const fullState = fullStateName(icecream.bestState);
        const category = salesCategory(icecream.totalSold);

        tableHTML += `
            <tr>
                <td>${icecream.name}</td>
                <td>${fullState}</td>
                <td>${icecream.totalSold}</td>
                <td>${category}</td>
            </tr>
        `;

        totalSales += icecream.totalSold;

        // Update best and worst sellers.
        if (icecream.totalSold > bestSeller.totalSold) {
            bestSeller = icecream;
        }
        if (icecream.totalSold < worstSeller.totalSold) {
            worstSeller = icecream;
        }
    }

    tableHTML += `
            </tbody>
        </table>
    `;

    // Calculate the average sales.
    const averageSales = totalSales / icecreams.length;
    const averageCategory = salesCategory(averageSales);

    // Create the summary statistics section.
    const summaryHTML = `
        <div class="card mt-4 p-4 shadow-sm bg-light">
            <h5 class="card-title">Some statistics on the ice creams sold across all types:</h5>
            <ul class="list-unstyled">
                <li>&bull; Best selling ice cream: <strong>${bestSeller.name}</strong> with ${bestSeller.totalSold} sold</li>
                <li>&bull; Worst selling ice cream: <strong>${worstSeller.name}</strong> with ${worstSeller.totalSold} sold</li>
                <li>&bull; Average number of ice creams sold: <strong>${averageSales.toFixed(2)}</strong> which equates to a sales category of <strong>${averageCategory}</strong></li>
            </ul>
        </div>
    `;

    // Correctly select the main content div based on the HTML structure.
    const mainContentDiv = document.querySelector('main .container');
    
    // Check if the element was found before trying to insert HTML.
    if (mainContentDiv) {
        mainContentDiv.insertAdjacentHTML('beforeend', tableHTML);
        mainContentDiv.insertAdjacentHTML('beforeend', summaryHTML);
    }
}

// Attach the buildIcecreamList function to the button's click event.
// This is a more modern approach than using the onclick attribute in HTML.
document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.querySelector('input[type="button"][value="Create Ice Cream Sales List"]');
    if (createButton) {
        createButton.addEventListener('click', buildIcecreamList);
    }
});