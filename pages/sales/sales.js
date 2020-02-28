function generateChart(bindto, columns, type, max, color) {
    return c3.generate({
        bindto: bindto,
        data: { 
            columns: columns, 
            type: type,
        },
        gauge: {
                label: {
                    format: function(value, ratio) {
                        return value;
                    },
                show: true // to turn off the min/max labels.
                },
                min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
                max: max, // 100 is default
                units: '',
                width: 39 // for adjusting arc thickness
        },
        color: {
            pattern: ['#60B044']
        },
        size: { height: 200 }
    });  
} 

function generateChart2(bindto, columns, type, color) {
    return c3.generate({
        bindto: bindto,
        data: { 
            columns: columns, 
            type: type,
        },
        color: {
            pattern: ['#F97600', '#F6C600', '#60B044']
        },
        size: { height: 400 }
    });  
} 
// sales by month
var area = generateChart2('#area', [ ['data1', 2934, 2023, 1123, 4120, 5215, 2345] ], 'area');
var bar = generateChart('#bar', [ ['data1', 50, 20, 10, 40, 15, 25] ], 'bar', 5);
var gauge = generateChart('#gauge', [ ['Customers', 2354] ], 'gauge', 2354);
var gauge = generateChart('#gauge2', [ ['Customers', 25] ], 'gauge', 2354);

// Sales Average
var gauge = generateChart('#averageTicketSales', [ ['Customers', 45.34] ], 'gauge', 45.34);
var gauge = generateChart('#averageTicketCount', [ ['Customers', 3] ], 'gauge', 3);
var gauge = generateChart('#averagePerCustomer', [ ['Customers', 85] ], 'gauge', 85);
var gauge = generateChart('#averagePerVisit', [ ['Customers', 42] ], 'gauge', 42);

// top sales
var pie = generateChart2('#pie', [ ['data1', 50], ['data2', 20], ['data3', 10] ], 'pie');
var bar = generateChart2('#bar', [ ['data1', 50, 20, 10, 40, 15, 25] ], 'bar');

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
        console.log(movie.title)
    })
    } else {
    console.log('error')
    }
}

// Send request
request.send()