function generateChart(bindto, columns, type) {
    return c3.generate({
        bindto: bindto,
        data: { 
            columns: columns, 
            type: type
        },
        gauge: {
                label: {
                    format: function(value, ratio) {
                        return value;
                    },
                show: true // to turn off the min/max labels.
                },
                min: 0, 
                max: 2354, // 100 is default
                units: '',
                width: 39 // for adjusting arc thickness
        },
        size: { height: 200 }
    });  
} 

function generateChart2(bindto, columns, type) {
    return c3.generate({
        bindto: bindto,
        data: { 
            columns: columns, 
            type: type
        },
        size: { height: 400 }
    });  
} 

var gauge = generateChart('#gauge', [ ['Customers', 2354] ], 'gauge');
var gauge = generateChart('#gauge2', [ ['Customers', 25] ], 'gauge');

var data = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var i = 0

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://jsonplaceholder.typicode.com/users', true)

request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
    data.forEach(item => {
        data[i] = item.id;
        i++; 
    })
    } else {
    console.log('error')
    }
    var line = generateChart2('#line', [ ['Customers', data[0], data[1], data[2], data[3], data[4], data[5]] ], 'line');
}

// Send request
request.send()

